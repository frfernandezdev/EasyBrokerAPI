import api from 'api';
import { EasyBrokerAPI } from "./EasyBrokerAPI";

const _auth = jest.fn();
const _getProperties = jest.fn();

jest.mock('api', () => ({
	__esModule: true,
	default: jest.fn(() => ({
		auth: _auth,
		getProperties: _getProperties
	}))
}));

const mockedApi = <jest.Mock<typeof api>>api;

describe('EasyBrokerAPI', () => {
	const  url = '@easybroker-staging/v1.0#887olbbcuq6n';
	const authToken = 'l7u502p8v46ba3ppgvj5y2aad50lb9';

	describe('test integration with api library', () => {
		let easybroker = new EasyBrokerAPI();
		const mockResponse = {
			data: {
				content: [],
				pagination: {
					total: 1
				}
			}
		}

		it('test integration with api library', () => {
			expect(mockedApi).toHaveBeenCalledWith(url);
			expect(_auth).toHaveBeenCalledWith(authToken);
		});

		it('test called to method getProperties', () => {
			_getProperties.mockResolvedValue(mockResponse);

			easybroker.getProperties()

			const parameters = { page: 1, limit: 20 }
			expect(_getProperties).toHaveBeenCalledWith(parameters);
		});
	});
	
	describe('test pagination service', () => {
		let easybroker = new EasyBrokerAPI();
		const mockTotal = 40;
		const mockLimit = 20;
		const length = Math.ceil(mockTotal / mockLimit);
		const mockPagesArray = Array.from({ length }, (v, k) => k+1);
		const mockResponse = {
			data: {
				content: [],
				pagination: {
					total: mockTotal
				}
			}
		}

		beforeEach(() => {
			_getProperties.mockClear()
		});

		it('test called to method all', async () => {
			_getProperties.mockResolvedValue(mockResponse);
			
			await easybroker.getProperties();
			
			expect(_getProperties).toHaveBeenCalledTimes(2);
			expect(_getProperties).toHaveBeenNthCalledWith(1, { page: 1, limit: mockLimit })
			expect(_getProperties).toHaveBeenNthCalledWith(2, { page: 2, limit: mockLimit })
		})
	});
})
