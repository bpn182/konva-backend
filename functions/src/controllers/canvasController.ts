import { Request, Response } from "express";
import { db } from "../config/firebaseAdmin";

/**
 * Lists all drawings for a given user.
 */
export const listDrawings = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const drawingsCollection = db
      .collection("users")
      .doc(userId)
      .collection("drawings");

    const drawingsSnapshot = await drawingsCollection.get();
    const drawingsList = drawingsSnapshot.docs.map((doc) => doc.id);

    res.status(200).send(drawingsList);
  } catch (error) {
    console.error("Error listing drawings:", error);
    res.status(500).send({ error: "Error listing drawings" });
  }
};

/**
 * Saves shapes for a given drawing.
 */
export const saveShapes = async (req: Request, res: Response) => {
  const { userId, drawingName, shapes } = req.body;

  try {
    const shapesDoc = db
      .collection("users")
      .doc(userId)
      .collection("drawings")
      .doc(drawingName);

    await shapesDoc.set({ shapes });
    res.status(200).send({ message: "Shapes saved successfully!" });
  } catch (error) {
    console.error("Error saving shapes:", error);
    res.status(500).send({ error: "Error saving shapes" });
  }
};

/**
 * Loads shapes for a given drawing.
 */
export const loadShapes = async (req: Request, res: Response) => {
  const { userId, drawingName } = req.body;

  try {
    const shapesDoc = db
      .collection("users")
      .doc(userId)
      .collection("drawings")
      .doc(drawingName);

    const shapesSnapshot = await shapesDoc.get();

    if (shapesSnapshot.exists) {
      const shapesData = shapesSnapshot.data();
      if (shapesData && shapesData.shapes) {
        return res.status(200).json(shapesData.shapes);
      }
      return res.status(200).json([]);
    }

    return res.status(200).json([]);
  } catch (error) {
    console.error("Error loading shapes:", error);
    return res.status(500).json({ error: "Error loading shapes" });
  }
};
