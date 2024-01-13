import { messaging } from "./firebase.js";

export const sendNotification = async ({ token, title, body }) => {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: "eA-HoWjaC9s:APA91bEJo7jxN6PUtSM78dlBLVwMDhFg4I7TmAIO77vanqDWtxwGbpwvgvC0j8TPjX4tjqJgxHZl1T0L3lxcKfrzn1hJssbbPiXVc0Jua6qjRzkMN-jK6JlgCOC7MAoHOwJzml5gG8Ui",
    };

    try {
        const response = await messaging.send(message);
        console.log("Successfully sent message:", response);
    } catch (error) {
        console.log("Error sending message:", error);
    }
};
