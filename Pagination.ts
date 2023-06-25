type Parameters = { page: number, limit: number };
type CallbackFunction = (parameters: Parameters) => Promise<any>;

export class Pagination {
	private _page: number = 1;
	private _limit: number = 20;
	private _total: number = 0; 
	private _handler: CallbackFunction | null = null;
	protected _items: any[] = []; 
	
	protected handler(fn: CallbackFunction) {
		this._handler = fn;	
	}

	protected execHandler() {
		if (!this._handler) {
			throw new Error('Not set handler function');
		}
			
		return this._handler({
			page: this._page,
			limit: this._limit
		})
	}

	protected async init() {
		const { data } = await this.execHandler();

		const { pagination, content } = data;
		const { total } = pagination;

		this._total = total;
		this._items = content;
	}
	
	protected async all() {
		if (!this._total) {
			throw new Error('The first request has not been initialized');
		}

		const length = Math.ceil(this._total / this._limit);
		const iterator = Array.from({ length }, (v, k) => k+1).slice(1);
		
		for (const page of iterator) {
			this._page = page;

			const { data } = await this.execHandler();;
			const { content } = data;

			this._items = this._items.concat(content);
		}
	}
}
