import { Router } from "express";
import { getAnimes, createAnime } from "../controllers/animes.controller.js";

const router = Router();

// all start with animes

router.get("/", getAnimes);

router.post("/", createAnime);

export default router;
