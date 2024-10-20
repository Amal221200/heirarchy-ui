import { companyData } from "./data";
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
export const getTeams = (employees: Employee, department: string): Array<Employee> => {
    if (employees.role === 'Team' && employees.department === department) {
        const team = {
            name: employees.name,
            id: employees.id,
            department: employees.department,
            role: employees.role,
            emailId: employees.emailId,
            phoneNumber: employees.phoneNumber,
        }
        return [team]
    }

    if (employees.children) {
        return employees.children.flatMap(child => getTeams(child, department))
    }

    return []
}



export const getCompanyData = () => {
    const data = localStorage.getItem('companyData');
    if (data) {
        return JSON.parse(data)
    } else {
        localStorage.setItem('companyData', JSON.stringify(companyData))
        return companyData
    }
}