import ImageKit from "imagekit";

let imagekit;
if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT) {
    imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
} else {
    console.warn("ImageKit keys missing, using mock implementation. Please check your .env file.");
    imagekit = {
        upload: (data, callback) => {
            console.warn("ImageKit upload is mocked.");
            if (callback) callback(null, { url: "http://mock-url" });
        },
        deleteFile: (fileId, callback) => {
            console.warn("ImageKit delete is mocked.");
            if (callback) callback(null, "success");
        }
    };
}

export default imagekit;