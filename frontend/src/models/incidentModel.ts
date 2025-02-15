export interface IncidentModel {
    createdAt: string;
    severity: string;
    name: string;
    resolutionDate: string;
    id: string;
    description: string;
    location: string;
    contact: string;
    reporterName: string
    media: Array<object>; 
  }
