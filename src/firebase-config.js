import { initializeApp } from "firebase/app";
import { environment } from "environments/environment.development.ts";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = environment.firebaseConfig;

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
