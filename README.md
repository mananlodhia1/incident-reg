# Incident/Service Request Admin App
[Live app](https://main.d33vt77y6gog2p.amplifyapp.com)
## Overview

This is an **Incident/Service Request Admin App** that allows users to create, view, and delete incidents. The application is built with the following stack:

- **Frontend**: Vite.js (Hosted on AWS Amplify)
- **Backend**: Node.js (Hosted on an EC2 instance with CloudFront)
- **Database**: DynamoDB
- **Authentication**: AWS Cognito
- **Deployment**: AWS CDK for backend infrastructure

## Features

- **Create Incidents**: Users can submit new incidents.
- **View Incidents**: Users can see a list of submitted incidents.
- **Delete Incidents**: Users can remove incidents as needed.
- **Authentication**: Secure login with AWS Cognito.

## Installation and Setup

### Prerequisites

- Node.js installed
- AWS credentials (for backend deployment)
- Amplify CLI (for frontend hosting)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/mananlodhia1/incident-reg.git
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## Authentication

AWS Cognito is used for authentication. You can use the following credentials for testing:

- **Username**: dataFoundryAdmin
- **Password**: jevqum-vIkfet-4dywbi

### Why AWS Cognito?

Building authentication from scratch is complex and risky. Using AWS Cognito is a better approach as it is industry-proven and follows best practices when it comes to security. It handles user authentication, authorization, and security concerns efficiently, reducing the risk of vulnerabilities.

## API Endpoints

### Incident Management

- **GET** `/incidents` - Retrieve all incidents
- **GET** `/incident/:id` - Retrieve single incident
- **POST** `/newIncident` - Create a new incident
  - The **reporter name** and **contact information** will be automatically set from the authenticated user's account info.
  - This information **cannot be modified**, as it identifies the person logged in.
- **DELETE** `/delete/:id` - Delete an incident

## Deployment

### Frontend Deployment (AWS Amplify)

1. Push changes to the repository.
2. AWS Amplify automatically deploys the frontend.

## Tech Stack

- **Frontend**: Vite.js, React
- **Backend**: Node.js, Express.js
- **Database**: AWS DynamoDB
- **Authentication**: AWS Cognito
- **Hosting**: AWS Amplify (Frontend), EC2 + CloudFront (Backend)
- **Infrastructure Deployment**: AWS CDK
