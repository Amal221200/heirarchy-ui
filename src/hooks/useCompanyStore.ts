import { create } from 'zustand'
import { Employee, Team } from '@/types'
import { companyData } from '@/data'

interface CompanyStore {
  companyStructure: Employee
  teams: Team[]
  updateEmployee: (updatedEmployee: Employee) => void
  addTeamMember: (teamId: string, newEmployee: Employee) => void
  deleteEmployee: (employeeId: string) => void
  editTeamMember: (updatedEmployee: Employee) => void
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  companyStructure: companyData,
  teams: [
    { id: "T1", name: "HR Team 1", department: "HR" },
    { id: "T2", name: "HR Team 2", department: "HR" },
    { id: "ET1", name: "Engineering Team", department: "Engineering" },
    { id: "DT1", name: "Design Team", department: "Design" },
  ],
  updateEmployee: (updatedEmployee) =>
    set((state) => ({
      companyStructure: updateEmployeeRecursive(state.companyStructure, updatedEmployee),
    })),
  addTeamMember: (teamId, newEmployee) =>
    set((state) => ({
      companyStructure: addTeamMemberRecursive(state.companyStructure, teamId, newEmployee),
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

function addEmployeeRecursive(employee: Employee, parentId: string, newEmployee: Employee): Employee {

  if (employee.id === parentId) {
    return {
      ...employee,
      children: [...(employee.children || []), newEmployee],
    }
  }
  if (employee.children) {
    return {
      ...employee,
      children: employee.children.map((child) => addEmployeeRecursive(child, parentId, newEmployee)),
    }
  }
  return employee
}
function addTeamMemberRecursive(employee: Employee, teamId: string, newEmployee: Employee): Employee {

  if (employee.id === teamId) {
    return {
      ...employee,
      children: [...(employee.children || []), newEmployee],
    }
  }
  if (employee.children) {
    return {
      ...employee,
      children: employee.children.map((child) => addTeamMemberRecursive(child, teamId, newEmployee)),
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