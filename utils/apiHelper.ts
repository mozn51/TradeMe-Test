import axios from "axios";
import { urls } from "../constants/urls";
import { CarCategoriesResponse } from "../utils/types";

class ApiHelper {
  // General function to make a GET request
  public async get(endpoint: string) {
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  // Specific function to get used car categories
  public async getUsedCarCategories(): Promise<CarCategoriesResponse> {
    try {
      const response = await axios.get<CarCategoriesResponse>(
        `${urls.API.CATEGORIES}/UsedCars.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching used car cateogories:", error);
      throw error;
    }
  }
}

export default new ApiHelper();
