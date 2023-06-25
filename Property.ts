import { IOperation, Operation } from "./Operation";

export interface IProperty {
	public_id: string;
	title: string;
	title_image_full: string;
	title_image_thumb: string;
	location: string;
	operations: IOperation[];
	bedrooms: number;
	bathrooms: number;
	parking_spaces: number;
	property_type: string;
	lot_size: number;
	construction_size: number;
	agent: string;
	show_prices: boolean;
	share_commission: boolean;
}

export class Property implements IProperty {
	public_id: string;
	title: string;
	title_image_full: string;
	title_image_thumb: string;
	location: string;
	operations: IOperation[];
	bedrooms: number;
	bathrooms: number;
	parking_spaces: number;
	property_type: string;
	lot_size: number;
	construction_size: number;
	agent: string;
	show_prices: boolean;
	share_commission: boolean;

	constructor({
		public_id,
		title,
		title_image_full,
		title_image_thumb,
		location,
		operations,
		bedrooms,
		bathrooms,
		parking_spaces,
		property_type,
		lot_size,
		construction_size,
		agent,
		show_prices,
		share_commission,
	}: IProperty) {
		this.public_id = public_id;
		this.title = title;
		this.title_image_full = title_image_full;
		this.title_image_thumb = title_image_thumb;
		this.location = location;
		this.operations = Operation.fromPrimitives(operations);
		this.bedrooms = bedrooms;
		this.bathrooms = bathrooms;
		this.parking_spaces = parking_spaces;
		this.property_type = property_type;
		this.lot_size = lot_size;
		this.construction_size = construction_size;
		this.agent = agent;
		this.show_prices = show_prices;
		this.share_commission = share_commission;
	}

	static fromPrimitives(items: IProperty[]): IProperty[] {
		return items.map((item) => new Property(item));
	}
}
