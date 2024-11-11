import { expect } from 'chai';
import ApiHelper from '../../../utils/api-helper';
import { CarCategoriesResponse } from '../../../utils/types';

const expectedTotalCount = parseInt(
  process.env.EXPECTED_TOTAL_CAR_BRANDS || '0'
);

describe('Trade Me API Test', () => {
  it('should verify the number of named car brands available', async () => {
    // Fetch the used car categories
    const data: CarCategoriesResponse = await ApiHelper.getUsedCarCategories();

    // Extract the named car brands from the data
    const carBrands = data.Subcategories.map((subcategory) => subcategory.Name);

    // Log the available car brands for verification
    console.log('Available car brands:', carBrands);
    console.log(`Total car brands found: ${carBrands.length}`);

    // Verify that car brands are returned
    expect(carBrands.length).to.be.greaterThan(0, 'No car brands found');

    // Validate the total count returned from the API, if necessary
    if (expectedTotalCount > 0) {
      expect(carBrands.length).to.equal(
        expectedTotalCount,
        `Expected ${expectedTotalCount} car brands, but found ${carBrands.length}`
      );
    }
  });
});
