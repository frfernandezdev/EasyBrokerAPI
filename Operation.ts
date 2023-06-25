export interface IOperation {
	type: string;
	amount: number;
	currency: string;
	formatted_amount: string;
	commission: {
		type: string;
	};
	unit: string;
} 

export class Operation implements IOperation { 
	type: string;
	amount: number;
	currency: string;
	formatted_amount: string;
	commission: {
		type: string;
	};
	unit: string;

	constructor({
		type,
		amount,
		currency,
		formatted_amount,
		commission,
		unit,
	}: IOperation) {
		this.type = type;
		this.amount = amount;
		this.currency = currency;
		this.formatted_amount = formatted_amount;
		this.commission = commission;
		this.unit = unit;
	}

	static fromPrimitives(items: IOperation[]): IOperation[] {
		return items.map((item) => new Operation(item));
	}
}
