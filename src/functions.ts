import { companyData } from "./data";
import { Employee } from "./types";

export function searchEmployee(companyStructure: Employee, search: string): Employee[] {
    const lowerCaseSearh = search.toLowerCase()
    const condition = companyStructure.name.toLowerCase().includes(lowerCaseSearh) || companyStructure.emailId.toLowerCase().includes(lowerCaseSearh) || companyStructure.phoneNumber.toLowerCase().includes(lowerCaseSearh);

    if (condition) {
        const children = companyStructure.children ? companyStructure.children.flatMap(child => searchEmployee(child, search)) : []
        return [companyStructure, ...children];
    }

    if (companyStructure.children) {
        return companyStructure.children.flatMap(child => searchEmployee(child, search))
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
            children: employees.children
        }
        return [team]
    }

    if (employees.children) {
        return employees.children.flatMap(child => getTeams(child, department))
    }

    return []
}

export function getTeam(employees: Employee, department: string, teamId: string): Employee | undefined {
    return getTeams(employees, department).find(team => team.id === teamId)
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

export function getAvailableEmployees(employees: Employee): Array<Employee> {
    if (employees.role === "Team" && (employees.children && employees?.children?.length <= 2)) {
        return []
    }

    if (employees.children) {
        return employees.children.flatMap(getAvailableEmployees).filter((employees) => !!employees)
    }

    if (employees.role !== "Team Leader") {
        return [employees]
    }
    return []
}

export function getDepartment(companyStructure: Employee, department: string): Employee | undefined {
    if (!companyStructure.children) return
    if (companyStructure.department === department && companyStructure.role.includes("Head")) {
        return companyStructure
    }

    return companyStructure.children.find(child => getDepartment(child, department));
}