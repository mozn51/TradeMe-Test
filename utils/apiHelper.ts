import axios from "axios";
import { urls } from "../constants/urls";

class ApiHelper {
  // Function to get car categories
  public async getUsedCarCategories() {
    try {
      const response = await axios.get(
        `${urls.API_BASE_URL}/Categories/UsedCars.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching used car categories:", error);
      throw error;
    }
  }
}

export default new ApiHelper();
