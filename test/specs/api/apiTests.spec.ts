import ApiHelper from "../../../utils/apiHelper";
import { expect } from "chai";

describe("Trade Me API Test", () => {
  it("should verify the number of named car brands available", async () => {
    const expectedTotalCount = 86;
    // Fetch the used car categories
    const data = await ApiHelper.getUsedCarCategories();

    // Extract the named car brands from the data
    const carBrands =
      data.Subcategories?.map((subcategory: any) => subcategory.Name) || [];

    // Log the available car brands for verification
    console.log("Available car brands:", carBrands);
    console.log(`Total car brands found: ${carBrands.length} `);

    // Verify that car brands are returned
    expect(carBrands.length).to.be.greaterThan(0, "No car brands found");

    // Validate the total count returned from the API
    expect(carBrands.length).to.equal(
      expectedTotalCount,
      `Expected ${expectedTotalCount} car brands, but found ${carBrands.length}`
    );
  });
});
