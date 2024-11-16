import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";
import {
  listDrawings,
  loadShapes,
  saveShapes,
} from "./controllers/canvasController";
import { createUser, getUserByUsername } from "./controllers/userController";

const app = express();

// Parse JSON bodies
app.use(express.json());

// Save shapes endpoint
app.post("/saveShapes", saveShapes);

// Load shapes endpoint
app.post("/loadShapes", loadShapes);

// List drawings endpoint
app.post("/listDrawings", listDrawings);

// Get user by username endpoint
app.get("/getUser/:username", getUserByUsername);

// Create user endpoint
app.post("/createUser", createUser);

// Export the Express app as a Firebase Cloud Function
export const api = onRequest({ cors: true }, app);
