import { initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "../firebaseApi/fbAdminSdkConfig.js";

const firebaseApp = initializeApp({
    credential: cert(serviceAccount),
});

const messaging = getMessaging(firebaseApp);

export { messaging };
