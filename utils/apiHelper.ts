import axios from "axios";
import { urls } from "../constants/urls";
import { CarCategoriesResponse } from "../utils/types";
import Logger from "./logger";

class ApiHelper {
  /**
   * Makes a GET request to a specified endpoint.
   * @param endpoint - The URL to send the GET request to.
   * @returns The response data from the endpoint.
   * @throws Will throw an error if the request fails.
   */
  public async get(endpoint: string) {
    Logger.info("Initiating GET request", { endpoint });
    try {
      const response = await axios.get(endpoint);
      Logger.info("GET request successful", { endpoint });
      return response.data;
    } catch (error) {
      Logger.error("GET request failed", {
        endpoint,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Get used car categories from the API.
   * @returns A Promise the data structure for car categories.
   * @throws Will throw an error if the API request fails.
   */
  public async getUsedCarCategories(): Promise<CarCategoriesResponse> {
    const endpoint = `${urls.API.CATEGORIES}/UsedCars.json`;
    Logger.info("Starting API request for used car categories", { endpoint });
    try {
      const response = await axios.get<CarCategoriesResponse>(endpoint);
      Logger.info("API request for used car categories successful", {
        endpoint,
      });
      return response.data;
    } catch (error) {
      Logger.error("API request for used car categories failed", {
        endpoint,
        error: error.message,
      });
      throw error;
    }
  }
}
export default new ApiHelper();
