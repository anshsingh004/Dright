import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


// Function to Check Availability of Car for a given Date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const ret = new Date(returnDate);

    const bookings = await Booking.find({
        car,
        status: { $in: ["pending", "confirmed"] },
        pickupDate: { $lte: ret },
        returnDate: { $gte: pickup },
    });
    return bookings.length === 0;
};

// API to Check Availability of Cars for the given Date and location
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;

        if (!pickupDate || !returnDate) {
            return res.json({ success: false, message: "Pickup and return dates are required" });
        }

        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);

        if (isNaN(picked.getTime()) || isNaN(returned.getTime())) {
            return res.json({ success: false, message: "Invalid date format" });
        }

        const pickedDay = new Date(picked.getFullYear(), picked.getMonth(), picked.getDate());
        const returnedDay = new Date(returned.getFullYear(), returned.getMonth(), returned.getDate());

        if (returnedDay < pickedDay) {
            return res.json({ success: false, message: "Return date cannot be earlier than pickup date" });
        }

        // fetch all available cars (filter by location if specified)
        const query = { isAvaliable: true };
        if (location && location.trim() !== '') {
            query.location = location.trim();
        }
        const cars = await Car.find(query);

        // check car availability for the given date range using promise
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
            return { ...car._doc, isAvailable };
        });

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true);

        res.json({ success: true, availableCars });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to Create Booking
export const createBooking = async (req, res) => {
    try {
        console.log("createBooking request received");
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;
        console.log("Booking payload:", { car, pickupDate, returnDate, userId: _id });

        if (!car || !pickupDate || !returnDate) {
            return res.json({ success: false, message: "All booking details are required" });
        }

        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);

        if (isNaN(picked.getTime()) || isNaN(returned.getTime())) {
            return res.json({ success: false, message: "Invalid date format" });
        }

        const pickedDay = new Date(picked.getFullYear(), picked.getMonth(), picked.getDate());
        const returnedDay = new Date(returned.getFullYear(), returned.getMonth(), returned.getDate());
        const today = new Date();
        const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (pickedDay < todayDay) {
            return res.json({ success: false, message: "Pickup date cannot be in the past" });
        }

        if (returnedDay < pickedDay) {
            return res.json({ success: false, message: "Return date cannot be earlier than pickup date" });
        }

        const carData = await Car.findById(car);
        if (!carData) {
            return res.json({ success: false, message: "Car not found" });
        }

        if (!carData.isAvaliable) {
            return res.json({ success: false, message: "Car is currently not available for rental" });
        }

        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        console.log("Availability check result:", isAvailable);

        if (!isAvailable) {
            return res.json({ success: false, message: "Car is not available for the selected dates" });
        }

        // Calculate price based on pickupDate and returnDate (minimum 1 day)
        const diffTime = returnedDay - pickedDay;
        const noOfDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        const price = carData.pricePerDay * noOfDays;

        await Booking.create({
            car,
            owner: carData.owner,
            user: _id,
            pickupDate: picked,
            returnDate: returned,
            price,
            status: "pending"
        });
        console.log("Booking created in DB");

        res.json({ success: true, message: "Booking Created" });

    } catch (error) {
        console.log("Error in createBooking:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to List User Bookings 
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 })
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to get Owner Bookings

export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" })
        }
        const bookings = await Booking.find({ owner: req.user._id }).populate('car user').select("-user.password").sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body

        const booking = await Booking.findById(bookingId)

        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        booking.status = status;
        await booking.save();

        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}