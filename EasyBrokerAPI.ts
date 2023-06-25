import api from 'api';
import { Pagination } from './Pagination';
import { IProperty, Property } from './Property';

export class EasyBrokerAPI extends Pagination {
	private url =	'@easybroker-staging/v1.0#887olbbcuq6n';
	private authToken = 'l7u502p8v46ba3ppgvj5y2aad50lb9'; 
	private instance: any; 

	constructor() {
		super();

		this.instance = api(this.url);
		this.authorize();
	}

	authorize() {
		return this.instance.auth(this.authToken);
	}	

	async getProperties(): Promise<IProperty[]|undefined> {
		this.handler(
			(parameters) => this.instance.getProperties(parameters)
																		.catch(console.error)
		);
		await this.init();
		await this.all();

		return Property.fromPrimitives(this._items);
	}
}
