import {
  addIncident,
  deleteIncident,
  getAllIIncidents,
  getSingleIncident,
} from "../models/incidentModel.js";
import { validateInput } from "../helpers/validationHelper.js";
import { AppError, NotFoundError, ServiceError } from "../utils/errors.js";

export const addIncidentService = async (incidentData) => {
  try {
    let {
      name,
      description,
      createdAt,
      severity,
      resolutionDate,
      reporterName,
      contact,
      location,
    } = incidentData;

    validateInput(incidentData);

    const newIncident = {
      id: `${Date.now()}`,
      name,
      description,
      createdAt: createdAt || new Date().toISOString(),
      severity,
      resolutionDate: resolutionDate || new Date().toISOString(),
      reporterName,
      contact,
      location,
    };

    return await addIncident(newIncident);
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error("service error:", error);
      throw new ServiceError("Unable to add incident");
    }
    throw error;
  }
};

export const getAllIncidentService = async () => {
  try {
    const result = await getAllIIncidents();
    return result;
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error("service error:", error);
      throw new ServiceError("Unable to get incidents");
    }
    throw error;
  }
};

export const getSingleIncidentService = async (id) => {
  try {
    const result = await getSingleIncident(id);
    if (!result.Item) {
      throw new NotFoundError("Incident not found");
    }
    return result;
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error("service error:", error);
      throw new ServiceError("Unable to get incident by id.");
    }
    throw error;
  }
};

export const deleteIncidentService = async (id, media) => {
  try {

    const result = await getSingleIncident(id);
    if (!result.Item) {
      throw new NotFoundError("Incident not found");
    }

    return await deleteIncident(id);
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error("service error:", error);
      throw new ServiceError("Unable to delete incident.");
    }
    throw error;
  }
};
