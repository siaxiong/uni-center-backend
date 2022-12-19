import { Prisma, User } from "@prisma/client";


const Users = {
	get: "get:users",
	create: "create:users",
	update: "update:users",
	delete: "delete:users"
};

const Courses = {
	get: "get:courses",
	create: "create:courses",
	update: "update:courses",
	delete: "delete:courses"
};

const Professors = {
	get: "get:professors",
	create: "create:professors",
	update: "update:professors",
	delete: "delete:professors"
};

const Students = {
	get: "get:students",
	create: "create:students",
	update: "update:students",

};

const AllUseres = [
	{
		path: "/users",
		method: "PUT",
		body: {
			role: ["Admin","Professor","Student"],
			name: "",
		}
	},
];

type NewUserType = [
	{
		path: "/users",
		method: "PUT",
		body: {
			role?: "Admin" | "Professor" | "Student",
			name?: ""
		}
	}
]


const createSingleArray = function(arr: (string| typeof Students)[]){
	let newArr = arr.map(item=>{
		if(typeof item === typeof "") return item;
		const temp = Object.values(Object.values(item));
		return temp;
	});
	newArr = newArr.flat();
	return newArr;
};

const AdminRole = [Users, Courses, Professors, Students];
export const AdminRolePermissions = createSingleArray(AdminRole);






