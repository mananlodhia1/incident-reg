import { Router } from "express";
import authCognito from "../middleware/authCognito.js";
import {
  addIncident,
  deleteIncident,
  getAllIncidents,
  getSingleIncident,
} from "../controllers/incidentController.js";

const router = Router();

router.get("/incidents", authCognito, getAllIncidents);
router.get("/incident/:id", authCognito, getSingleIncident);
router.post(
  "/newIncident",
  authCognito,
  addIncident
);
router.delete("/delete/:id", authCognito, deleteIncident);

export default router;
