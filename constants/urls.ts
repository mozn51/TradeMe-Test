export const urls = {
  BASE_URL: process.env.BASE_URL || "https://www.tmsandbox.co.nz",
  API: {
    BASE_URL: process.env.API_BASE_URL || "https://api.trademe.co.nz/v1",
    CATEGORIES:
      process.env.API_CATEGORIES_URL ||
      "https://api.trademe.co.nz/v1/Categories",
    // add other endpoints as needed
  },
};
