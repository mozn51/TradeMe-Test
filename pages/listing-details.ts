import { Logger } from '../utils/logger';

export class ListingDetails {
  /**
   * Collects details from the listing details page, including address, bedroom count, and agent's name.
   * Logs each detail collected.
   *
   * @returns An object containing property address, bedroom count, and agent's name.
   * @throws Will throw an error if data collection fails.
   */
  public async collectListingDetails(): Promise<{
    propertyAddressText: string;
    propertyBedroomNumber: number;
    propertyAgentNameText: string;
  }> {
    try {
      if (await this.isDetailsPageLoaded()) {
        const propertyAddressElement = $(
          '//tm-property-listing-body //h1[contains(@class, "tm-property-listing-body__location")]'
        );
        const propertyBedroomElement = $(
          '//div[contains(@class, "tag--content") and .//tg-icon[@name="bedroom"]]'
        );
        const propertyAgentNameElement = $(
          '//tm-agents-summary //h3[contains(@class, "pt-agent-summary__agent-name")]'
        );

        const propertyAddressText = await propertyAddressElement.getText();
        const propertyBedroomNumber = parseInt(
          await propertyBedroomElement.getText()
        );
        const propertyAgentNameText = await propertyAgentNameElement.getText();

        Logger.info(`Address: ${propertyAddressText}`);
        Logger.info(`Beds: ${propertyBedroomNumber}`);
        Logger.info(`Agent's Name: ${propertyAgentNameText}`);
        return {
          propertyAddressText,
          propertyBedroomNumber,
          propertyAgentNameText,
        };
      } else {
        Logger.error('Details page did not load. Skipping data collection.');
        throw new Error('Failed to load the details page.');
      }
    } catch (error: any) {
      Logger.error(`Error collecting listing details: ${error.message}`);
      throw error;
    }
  }

  /**
   * Checks if the details page has successfully loaded.
   * @returns True if the page is loaded, false otherwise.
   */
  public async isDetailsPageLoaded(): Promise<boolean> {
    try {
      const pageHeader = $(
        '//h2[contains(@class, "tm-property-listing-body__title")]'
      );
      await browser.waitUntil(async () => await pageHeader.isDisplayed(), {
        timeout: 5000,
        timeoutMsg: 'Details page did not load in time.',
      });
      Logger.info('Details page is loaded successfully.');
      return true;
    } catch (error: any) {
      Logger.error(`Error loading the details page: ${error.message}`);
      return false;
    }
  }
}
