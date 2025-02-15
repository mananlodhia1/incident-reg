import { ValidationError } from "../utils/errors.js";

export const validateInput = (incidentData) => {
  const { name, description, contact, location, severity } = incidentData;

  if (!name) {
    throw new ValidationError("Name is required");
  }

  if (!description) {
    throw new ValidationError("Description is required");
  }
  if (!severity) {
    throw new ValidationError("Severity is required");
  }

  if (!contact) {
    throw new ValidationError("Contact info is required");
  }
  if (!location) {
    throw new ValidationError("Location is required");
  }
};
