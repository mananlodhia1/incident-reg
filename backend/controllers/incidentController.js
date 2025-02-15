import {
  addIncidentService,
  deleteIncidentService,
  getAllIncidentService,
  getSingleIncidentService,
} from "../services/incidentService.js";

// @desc Add a new
export const addIncident = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await addIncidentService(data);
    res
      .status(201)
      .json({ message: "Incident added successfully", res: result });
  } catch (error) {
    next(error);
  }
};

// @desc Get all
export const getAllIncidents = async (req, res, next) => {
  try {
    const result = await getAllIncidentService();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting incidents:", error.message);
    next(error);
  }
};

// @desc Get by id
export const getSingleIncident = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getSingleIncidentService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// @desc Delete
export const deleteIncident = async (req, res, next) => {
  const { id } = req.params;
  const { media } = req.body;    

  try {
    const result = await deleteIncidentService(id, media);
    res
      .status(200)
      .json({ message: "Incident deleted successfully", res: result, id: id });
  } catch (error) {
    next(error);
  }
};
