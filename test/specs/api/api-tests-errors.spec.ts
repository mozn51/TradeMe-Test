import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { ApiHelper } from '../../../utils/api-helper';
import { Logger } from '../../../utils/logger';

describe('Trade Me API Error Handling Tests', () => {
  const apiHelper = new ApiHelper();
  let axiosGetStub: sinon.SinonStub;

  afterEach(() => {
    // Restore the original axios.get method after each test
    axiosGetStub.restore();
  });

  it('should handle network failure', async () => {
    axiosGetStub = sinon.stub(axios, 'get').rejects(new Error('Network error'));

    try {
      await apiHelper.getUsedCarCategories();
      expect.fail('Expected API call to throw an error, but it did not');
    } catch (error) {
      expect(error.message).to.equal('Network error');
      Logger.info('Network failure handled correctly:', error.message);
    }
  });

  it('should handle timeout errors', async () => {
    axiosGetStub = sinon
      .stub(axios, 'get')
      .rejects(new Error('timeout of 1000ms exceeded'));

    try {
      await apiHelper.getUsedCarCategories();
      expect.fail('Expected timeout error, but API call succeeded');
    } catch (error) {
      expect(error.message).to.include('timeout');
      Logger.error('Timeout error handled correctly:', error.message);
    }
  });

  it('should handle unexpected data format', async () => {
    axiosGetStub = sinon.stub(axios, 'get').resolves({ data: {} });

    try {
      const data = await apiHelper.getUsedCarCategories();
      const carBrands =
        data.Subcategories?.map((subcategory: any) => subcategory.Name) || [];
      expect(carBrands).to.be.an('array').that.is.empty;
      Logger.info('Unexpected data format handled correctly');
    } catch (error) {
      expect.fail('The API call failed to handle an unexpected data format');
    }
  });
});
