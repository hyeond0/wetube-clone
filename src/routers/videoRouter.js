import express from "express";
import { edit, watch } from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/watch", handleWatchVideo);
videoRouter.get("/edit", handleEdit);

export default videoRouter;
