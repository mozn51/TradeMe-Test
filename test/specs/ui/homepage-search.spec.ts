import {
  ALL_LOCATIONS_DISTRICTS,
  ALL_LOCATIONS_REGIONS_OPTIONS,
  CATEGORY_OPTIONS,
} from '../../../constants/dropdown-options';
import { BaseSearchResultsPage } from '../../../pages/base-search-results';
import { CategoryDropdown } from '../../../pages/category-dropdown';
import { HomePage } from '../../../pages/home';
import { ListingDetails } from '../../../pages/listing-details';
import { ListingManager } from '../../../pages/listing-manager';
import { LocationDropdown } from '../../../pages/location-dropdown';
import { PropertyResultsPage } from '../../../pages/property-results';
import { Logger } from '../../../utils/logger';

describe('Trade Me Property Search Tests', () => {
  const baseSearchResultsPage = new BaseSearchResultsPage();
  const categoryDropdown = new CategoryDropdown();
  const homePage = new HomePage();
  const listingDetails = new ListingDetails();
  const listingManager = new ListingManager();
  const locationDropdown = new LocationDropdown();
  const propertyResultsPage = new PropertyResultsPage();

  before(async () => {
    Logger.info('Starting Trade Me Property Search Tests');
  });

  after(async () => {
    Logger.info('Trade Me Property Search Tests completed');
  });

  describe('Homepage Navigation', () => {
    it('should navigate to the Trade Me homepage', async () => {
      Logger.info('Navigating to Trade Me homepage...');
      await homePage.openHomePage();
      expect(await homePage.isPageLoaded(homePage.homepageHeader, 'Home')).toBe(
        true
      );
      Logger.info('Trade Me homepage loaded successfully');
    });
  });

  describe('Search Functionality', () => {
    before(async () => {
      Logger.info('Preparing homepage for search functionality tests...');
      await homePage.openHomePage();
    });

    it("should search for 'house' and display results", async () => {
      Logger.info("Executing search for 'house'");
      await homePage.searchItem('house');
      const isResultsLoaded =
        await baseSearchResultsPage.isSearchResultsLoaded('house');
      expect(isResultsLoaded).toBe(true);
      Logger.info("Search results for 'house' loaded successfully");
    });

    it("should filter results by 'Trade Me Property' category", async () => {
      Logger.info('Filtering results by category: Trade Me Property');
      await categoryDropdown.selectCategoryOption(CATEGORY_OPTIONS.PROPERTY);
      const isCategoryCorrect =
        await propertyResultsPage.isCategoryResultsPageLoaded(
          CATEGORY_OPTIONS.PROPERTY
        );
      expect(isCategoryCorrect).toBe(true);
      Logger.info('Property category results page loaded successfully');
    });

    it("should set location to 'Wellington' region and 'All of Wellington' district", async () => {
      const region = ALL_LOCATIONS_REGIONS_OPTIONS.WELLINGTON;
      const district = ALL_LOCATIONS_DISTRICTS.Wellington.ALL_OF_WELLINGTON;
      Logger.info(
        `Setting location to region: ${region}, district: ${district}`
      );
      await locationDropdown.selectLocationOption(region, district);
      await propertyResultsPage.clickViewResultsButton(region, district);
      Logger.info(`Location set to ${region} region and ${district} district`);
    });

    it('should verify the number of listings displayed', async () => {
      Logger.info('Retrieving and verifying listings count...');
      const listingsCount = await listingManager.getListingsCount();
      expect(listingsCount).toBeGreaterThan(0);
      Logger.info(
        `Listings count verified: ${listingsCount} listings displayed`
      );
    });

    it('should verify details of the first listing', async () => {
      Logger.info('Accessing and verifying details of the first listing...');
      await listingManager.clickOnFirstListing();
      const listingDetailsValues = await listingDetails.collectListingDetails();
      expect(listingDetailsValues.propertyAddressText).not.toBeNull();
      expect(listingDetailsValues.propertyBedroomNumber).toBeGreaterThanOrEqual(
        1
      );
      expect(listingDetailsValues.propertyAgentNameText).not.toBeNull();
      Logger.info(
        `Verified details of the first listing: ${JSON.stringify(listingDetailsValues)}`
      );
    });
  });
});
