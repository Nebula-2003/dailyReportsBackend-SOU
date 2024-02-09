import { messaging } from "./firebase.js";

export const sendNotification = async ({ token, title, body }) => {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: "dAxcGTLgfB7283JL3cs_yZ:APA91bH8iiqf9WpDXe5gHfQAgEfOyOgoQvi6fmWxXbcKCVInaTtVMC2qYYtM_rWsClsB-dTsVsydeU5ZUIefhsjfJrt1nfZ7z9ECFSVlIUUcAkcPLk5VdWaGNrgpR4ti0wlXJrwJkDHy",
    };

    try {
        const response = await messaging.send(message);
        console.log("Successfully sent message:", response);
    } catch (error) {
        console.log("Error sending message:", error);
    }
};
