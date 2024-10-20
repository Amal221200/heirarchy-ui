import { create } from 'zustand'
import { Employee } from '@/types'
import { getCompanyData } from '@/functions'

interface CompanyStore {
  companyStructure: Employee
  updateEmployee: (updatedEmployee: Employee) => void
  addTeamMember: (teamId: string, newEmployee: Employee) => void
  deleteEmployee: (employeeId: string) => void
  editTeamMember: (updatedEmployee: Employee) => void
  addTeam: (headOfDepartmentID: string, newTeam: Employee) => void
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  companyStructure: getCompanyData(),

  updateEmployee: (updatedEmployee) =>
    set((state) => ({
      companyStructure: updateEmployeeRecursive(state.companyStructure, updatedEmployee),
    })),
  addTeamMember: (teamId, newEmployee) =>
    set((state) => ({
      companyStructure: addTeamMemberRecursive(state.companyStructure, teamId, newEmployee),
    })),
  addTeam: (headOfDepartmentID, newTeam) =>
    set((state) => ({
      companyStructure: addTeamRecursive(state.companyStructure, headOfDepartmentID, newTeam),
    })),
  deleteEmployee: (employeeId) =>
    set((state) => ({
      companyStructure: deleteEmployeeRecursive(state.companyStructure, employeeId) ?? state.companyStructure,
    })),
  editTeamMember(updatedEmployee) {
    set(state => ({
      companyStructure: editTeamMemberRecursive(state.companyStructure, updatedEmployee)
    }))
  },
}))

function updateEmployeeRecursive(employee: Employee, updatedEmployee: Employee): Employee {
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

function addTeamRecursive(employee: Employee, headOfDepartmentID: string, newTeam: Employee): Employee {

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
function addTeamMemberRecursive(employee: Employee, teamId: string, newMember: Employee): Employee {
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

function deleteEmployeeRecursive(employee: Employee, employeeId: string): Employee | null {
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

function editTeamMemberRecursive(employee: Employee, updatedEmployee: Employee): Employee {
  const filteredEmployee = deleteEmployeeRecursive(employee, updatedEmployee.id) ?? employee;

  const newEmployee = addTeamMemberRecursive(filteredEmployee, updatedEmployee.teamId!, updatedEmployee);
  return newEmployee;
}