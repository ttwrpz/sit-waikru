import {firebaseConfig} from "@/config.ts";
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {app, database};