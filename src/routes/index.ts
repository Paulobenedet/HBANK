import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "online",
    api: "HBANK",
    version: "1.0.0",
  });
});

export default router;