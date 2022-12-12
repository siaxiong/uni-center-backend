import { Prisma, User } from "@prisma/client";


const Users = {
	read: "read:users",
	create: "create:users",
	update: "update:users",
	delete: "delete:users"
};

const Courses = {
	read: "read:courses",
	create: "create:courses",
	update: "update:courses",
	delete: "delete:courses"
};

const Professors = {
	read: "read:professors",
	create: "create:professors",
	update: "update:professors",
	delete: "delete:professors"
};

const Students = {
	read: "read:students",
	create: "create:students",
	update: "update:students",
	delete: "delete:students"
};

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






