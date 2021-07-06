import { create } from "apisauce";

const client = create({
	baseURL: "http://192.168.8.101:3000/api",
});

export default client;
