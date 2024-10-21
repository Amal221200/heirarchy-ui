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

export function updateEmployeeRecursive(employee: Employee, updatedEmployee: Employee): Employee {
    if (employee.id === updatedEmployee.id) {
        return updatedEmployee
    }
    if (employee.children) {
        return {
            ...employee,
            children: employee.children.map((child) => updateEmployeeRecursive(child, updatedEmployee)),
        }
    }
    return employee
}

export function addTeamRecursive(employee: Employee, headOfDepartmentID: string, newTeam: Employee): Employee {
    if (employee.id === headOfDepartmentID) {
        return {
            ...employee,
            children: [...(employee.children || []), newTeam],
        }
    }
    if (employee.children) {
        return {
            ...employee,
            children: employee.children.map((child) => addTeamRecursive(child, headOfDepartmentID, newTeam)),
        }
    }
    return employee
}

export function addTeamMemberRecursive(employee: Employee, teamId: string, newMember: Employee): Employee {
    if (employee.id === teamId) {        
        return {
            ...employee,
            children: [...(employee.children || []), newMember],
        }
    }
    if (employee.children) {
        return {
            ...employee,
            children: employee.children.map((child) => addTeamMemberRecursive(child, teamId, newMember)),
        }
    }
    return employee
}

export function deleteEmployeeRecursive(employee: Employee, employeeId: string): Employee | null {
    if (employee.id === employeeId) {
        return null
    }
    if (employee.children) {
        const updatedChildren = employee.children
            .map((child) => deleteEmployeeRecursive(child, employeeId))
            .filter((child): child is Employee => child !== null)
        return {
            ...employee,
            children: updatedChildren.length > 0 ? updatedChildren : undefined,
        }
    }
    return employee
}

export function editTeamMemberRecursive(employee: Employee, updatedEmployee: Employee): Employee {
    const filteredEmployee = deleteEmployeeRecursive(employee, updatedEmployee.id) ?? employee;

    const newEmployee = addTeamMemberRecursive(filteredEmployee, updatedEmployee.teamId!, updatedEmployee);
    return newEmployee;
}

export function findAvailableEmployees(employees: Employee): Array<Employee> {
    if (employees.children) {
        return employees.children.flatMap(findAvailableEmployees).filter((employees) => !!employees)
    }

    if (employees.role !== "Team Leader") {
        return [employees]
    }

    return []
}