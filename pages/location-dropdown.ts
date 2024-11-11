import Logger from '../utils/logger';
import UIActions from '../utils/ui-actions';

export class LocationDropdown {
  get allLocationsDropdownButton(): ChainablePromiseElement {
    return $(
      '//button[contains(@class, "tm-drop-down-tag__dropdown-button") and contains(.,"All Locations")]'
    );
  }
  get locationRegionDropdownButton(): ChainablePromiseElement {
    return $(
      '//label[contains(text(), "Region")]/following-sibling::div/select'
    );
  }

  get locationDistrictDropdownButton(): ChainablePromiseElement {
    return $(
      '//label[contains(text(), "District")]/following-sibling::div/select'
    );
  }
  /**
   * Selects the specified region and optional district from location dropdowns.
   * Logs each action step, including expanding the dropdown and confirming the selections.
   *
   * @param locationRegion - The region to select.
   * @param locationDistrict - Optional; the district to select within the region.
   */
  public async selectLocationOption(
    locationRegion: string,
    locationDistrict?: string
  ): Promise<void> {
    try {
      Logger.info(
        `Attempting to select location "${locationRegion}" from the dropdown.`
      );

      await UIActions.clickIfClickable(
        this.allLocationsDropdownButton,
        'All Location Dropdown Button'
      );

      await browser.waitUntil(
        async () =>
          (await this.allLocationsDropdownButton.getAttribute(
            'aria-expanded'
          )) === 'true',
        { timeout: 5000, timeoutMsg: 'Location dropdown did not open' }
      );
      Logger.info('Location dropdown successfully expanded.');

      await UIActions.clickIfClickable(
        this.locationRegionDropdownButton,
        'Location Region Dropdown Button'
      );

      await this.locationRegionDropdownButton.selectByVisibleText(
        locationRegion
      );
      Logger.info(`Region "${locationRegion}" selected successfully.`);

      if (locationDistrict) {
        Logger.info(
          `Selecting district "${locationDistrict}" from the District dropdown.`
        );
        await browser.waitUntil(
          async () => await this.locationDistrictDropdownButton.isEnabled(),
          {
            timeout: 5000,
            timeoutMsg: `District dropdown not enabled for region "${locationRegion}".`,
          }
        );
        await UIActions.clickIfClickable(
          this.locationDistrictDropdownButton,
          'District Dropdown Button'
        );
        await this.locationDistrictDropdownButton.selectByVisibleText(
          locationDistrict
        );
        Logger.info(`District "${locationDistrict}" selected successfully.`);
      } else {
        Logger.info(`No district specified for location selection.`);
      }
    } catch (error: any) {
      Logger.error(`Error in selectLocationOption: ${error.message}`);
      throw error;
    }
  }
}
export default new LocationDropdown();
