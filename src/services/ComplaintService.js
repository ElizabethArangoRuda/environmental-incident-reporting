import axios from 'axios';

const url = 'http://localhost:8080';

class ComplaintService {
  // Gets all complaints
  static async getAllComplaints() {
    try {
      const response = await axios.get(`${url}/api/complaints/anonymous`);
      return response.data;
    } catch (error) {
      console.error('Error fetching issues:', error);
      throw error; // Lanza el error para manejarlo más arriba si es necesario
    }
  }

  // Create a new complaint with multimedia files
  static async createComplaint(data) {
    console.log("Service Layer", data);

    try {
      const formData = new FormData();

      // Add text fields
      formData.append('address', data.address);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('contact_name', data.contact_name);
      formData.append('contact_phone', data.contact_phone);
      formData.append('contact_email', data.contact_email);
      formData.append('latitude', data.latitude);
      formData.append('longitude', data.longitude);

      // Add media files
      data.media_files.forEach((file) => {
        console.log("File", file);
        formData.append('media_files', file);
      });

      // Envía la solicitud POST
      const response = await axios.post(`${url}/api/complaints/anonymous2`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating complaint:', error);
      throw error;
    }
  }
}

export default ComplaintService;
