import { Employee } from "./types";

export function searchEmployee(employees: Employee, search: string): Employee[] {
    const lowerCaseSearh = search.toLowerCase()
    const condition = employees.name.toLowerCase().includes(lowerCaseSearh) || employees.emailId.toLowerCase().includes(lowerCaseSearh) || employees.phoneNumber.toLowerCase().includes(lowerCaseSearh);

    if (condition) {
        const children = employees.children ? employees.children.flatMap(child => searchEmployee(child, search)) : []
        return [employees, ...children];
    }

    if (employees.children) {
        return employees.children.flatMap(child => searchEmployee(child, search))
    }

    return [];
}