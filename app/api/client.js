import { create } from "apisauce";

const client = create({
	baseURL: "http://192.168.8.100:3000/api",
	headers: {
		"x-auth-token":
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGUxMGJlYTQyNmI4ODJmZDRlOTc1MzEiLCJfdHlwZSI6InRlYWNoZXIiLCJwaG9uZSI6IisyMzc2NTY4OTUzNDgiLCJpYXQiOjE2MjU0Nzc2NTR9.xQG8o7rOkImMFktIDNOXcZP_hsYurfZ9kkcLI0g9fZY",
	},
});

export default client;
