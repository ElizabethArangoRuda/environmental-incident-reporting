# Environmental Incident Reporting App

## Overview

The **Environmental Incident Reporting App** is a platform for reporting and visualizing environmental incidents in Colombia. Users can document and share information about pollution, deforestation, watershed issues, and more, enhancing environmental protection and awareness.

### Problem Space

1. **Environmental Degradation**: Lack of effective monitoring and awareness of critical environmental challenges, such as pollution and deforestation.
2. **Limited Public Engagement**: Insufficient platforms for community participation in environmental reporting and advocacy.
3. **Data Fragmentation**: Difficulty accessing centralized, real-time environmental incident data for decision-making.

### User Profile

- **Primary Users**:
  - Environmental activists aiming to raise awareness and influence policy.
  - Community members who witness and report incidents firsthand.
  - Researchers and students analyzing environmental trends.
  - Policymakers requiring real-time data for informed decisions.

- **Use Case**: Users can report incidents, view them on an interactive map, and utilize the aggregated data for advocacy, research, or policymaking.

### Features

• **Incident Reporting**: Users can report issues with details such as category, location, description, and multimedia evidence (photos/videos).
• **Interactive Map**: Displays real-time environmental incidents across Colombia.
• **Categorization**: Organizes incidents into categories for easy navigation.
• **Multimedia Upload**: Users can upload photos or videos for validation.
• **Comments and Updates**: Reporters can update or comment on incidents.

## Implementation

### Tech Stack

•	**Frontend**: React (web) or React Native (mobile)
•	**Backend**: Node.js with Express.js
•	**Database**: relational database MySQL
•	**Mapping Tools**: Leaflet or Google Maps API
•	**Cloud Storage**: AWS S3 or Firebase

### APIs

API
•	**Map Integration**: Google Maps API or OpenStreetMap
•	**Geolocation**: HTML5 Geolocation API
•	**File Storage**: Firebase or AWS for multimedia

Endpoints
•	`GET /incidents`: Fetch all incidents for the map
•	`POST /incidents`: Submit a new incident

   http://localhost:8080/api/complaints/anonymous

   {
      "address": "123 Maple Street, Springfield",
      "contact_name": "EAR",
      "contact_phone": "123-456-7890",
      "contact_email": "johndoe@example.com",
      "description": "Flooding in the area due to heavy rain.",
      "category": "Flood",
      "media": [
         "images/flood1.jpg",
         "images/flood2.jpg"
      ],
      "latitude": "39.7817000",
      "longitude": "-89.6501000",
      "created_at": "2025-01-08T20:24:35.000Z",
      "updated_at": "2025-01-08T20:24:35.000Z"
   }

   Response

   {
    "message": "Complaint submitted successfully.",
    "reportId": 6
   }



•	`GET /incidents/:id`: Retrieve incident details

   http://localhost:8080/api/complaints/anonymous
   
   {
      "address": "123 Maple Street, Springfield",
      "contact_name": "John Doe",
      "contact_phone": "123-456-7890",
      "contact_email": "johndoe@example.com",
      "description": "Flooding in the area due to heavy rain.",
      "category": "Flood",
      "media": ["images/flood1.jpg", "images/flood2.jpg"],
      "latitude": "39.7817000",
      "longitude": "-89.6501000"
   }

•	`PUT /incidents/:id`: Update an incident
•	`DELETE /incidents/:id`: Delete an incident


### Sitemap

1. **Home Page**: Displays an introduction with Colombian imagery and a button to access the map.
2. **Map Page**: Interactive map displaying reported incidents and an option to add reports.
3. **Report Form Page**: Form to input incident details, including category, location, and multimedia uploads.
4. **Incident Details Page**: Shows details of a specific report selected from the map.

### Mockups

 
### Data

- **Incident Data**:
  • `id`: Unique identifier
  • `category`: Pollution, deforestation, etc.
  • `name`: Incident name
  • `location`: Latitude and longitude
  • `photo/video`: Media links
  • `date`: Submission timestamp

### Setup Instructions

### Prerequisites:
• Node.js
• mysql
• Firebase/AWS credentials (for multimedia storage)

### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/username/environmental-incident-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd environmental-incident-app
   ```
3. Install dependencies:
   ```bash
   npm install
   npm install react-router-dom
   npm install axios
   npm install -g sass
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
## Roadmap

### Week 1:
• Finalize scope and mockups.
• Initialize frontend and backend frameworks.
• Integrate map functionality for data visualization.

### Week 2:
• Develop incident reporting form.
• Add multimedia upload feature with cloud storage.
• Implement pop-ups for detailed incident views.
• Test and debug.

## Future Implementations

• **Notifications**: Alerts for new incidents in user areas.
• **Analytics Dashboard**: Display trends and statistics.
• **Gamification**: Rewards for active reporting.
• **Multilingual Support**: Broaden accessibility.

