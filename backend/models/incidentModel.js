import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../config/dynamoDb.js";
import { DatabaseError } from "../utils/errors.js";

const TableName = "incident_items";

export const addIncident = async (incident) => {
  const params = {
    TableName,
    Item: incident,
  };

  try {
    await ddbDocClient.send(new PutCommand(params));
    return incident;
  } catch (error) {
    console.error("Failed to add incident:", error);
    throw new DatabaseError("Failed to add incident");
  }
};

export const getAllIIncidents = async () => {
  try {
    const params = {
      TableName,
    };
    const result = await ddbDocClient.send(new ScanCommand(params));
    return result;
  } catch (error) {
    console.error("Failed to get all incidents:", error);
    throw new DatabaseError("Failed to get all incidents");
  }
};

export const getSingleIncident = async (id) => {
  try {
    const params = {
      TableName,
      Key: { id },
    };

    const result = await ddbDocClient.send(new GetCommand(params));

    if (!result.Item) {
      throw new Error("Incident not found");
    }

    return result;
  } catch (error) {
    console.error("Failed to get incident by id:", error);
    throw new DatabaseError("Error getting incident by id");
    
  }
};

export const deleteIncident= async (id) => {
  try {
    const params = {
      TableName,
      Key: { id },
    };

    const result = await ddbDocClient.send(new DeleteCommand(params));
    return result;
  } catch (error) {
    console.error("Failed to delete incident:", error);
    throw new DatabaseError("Error deleting incident");
  }
};
