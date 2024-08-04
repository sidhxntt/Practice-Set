import express from "express";
const router = express.Router();
router.get("/", async (req, res, next) => {
    try {
        res.status(200).json({ message: "Hello to Docker tutorial" });
    }
    catch (error) {
        next(error);
    }
});
export default router;
