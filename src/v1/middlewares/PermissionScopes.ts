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

const Students:Record<string,string> = {
	get: "get:students",
	create: "create:students",
	update: "update:students",

};

const Assignments = {
	get: "get:assignments",
	create: "create:assignments",
	update: "update:assignments",
	delete: "delete:assignments"
};

const Grades = {
	get: "get:grades",
	update: "update:grades",
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


const createSingleArray = function(arr: Record<string,string>[]){
	const newArr = arr.map(item=>{
		// if(typeof item === typeof "") return item;
		const temp = Object.values(item);
		return temp;
	});
	const flatArr = newArr.flat();
	return flatArr;
};

const AdminRole = [Users, Courses, Professors, Students];
const ProfessorRole = [Assignments];
export const AdminRolePermissions = createSingleArray(AdminRole);
export const ProfessorRolePermissions = createSingleArray(ProfessorRole);






