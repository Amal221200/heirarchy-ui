import { create } from 'zustand'
import { Employee } from '@/types'
import { addTeamMemberRecursive, addTeamRecursive, deleteEmployeeRecursive, editTeamMemberRecursive, getCompanyData, updateEmployeeRecursive } from '@/functions'

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

