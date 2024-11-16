import { Request, Response } from "express";
import { db } from "../config/firebaseAdmin";

/**
 * Gets a user by username from Firestore.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const userDoc = db.collection("users").doc(username);
    const userSnapshot = await userDoc.get();

    if (userSnapshot.exists) {
      // Return the user ID and username if the document exists
      return res
        .status(200)
        .json({ id: userSnapshot.id, username: userSnapshot.data()?.username });
    }
    // Return 404 if the user document does not exist
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error getting user by username:", error);
    return res.status(500).json({ error: "Error getting user by username" });
  }
};

/**
 * Creates a new user with the given username in Firestore.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    // Reference to the user document in Firestore
    const userDoc = db.collection("users").doc(username);
    // Set the user document in Firestore with the username
    await userDoc.set({ username });
    // Return the user ID and username
    return res.status(201).json({ id: userDoc.id, username });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
};
