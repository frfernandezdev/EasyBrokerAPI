import { EasyBrokerAPI } from "./EasyBrokerAPI";

const easybroker = new EasyBrokerAPI();

easybroker.getProperties()
	.then((items) => 
		items?.forEach(({ title }) => console.log(title))
	);
