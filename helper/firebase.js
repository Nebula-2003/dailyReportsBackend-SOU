import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

import serviceAccount from "../firebaseApi/fbAdminSdk.js";
import e from "express";

const firebaseApp = initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const messaging = getMessaging(firebaseApp);

export { messaging };
