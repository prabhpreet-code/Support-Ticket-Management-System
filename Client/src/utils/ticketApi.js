import axios from "axios";

export const ticketApi = async (data) => {
  const url = "http://localhost:8000/api/support-tickets";

  try {
    const response = await axios.post(url, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
