import React, { useMemo, useState } from "react"
import { EmployeeNode } from "./EmployeeNode"
import { useCompanyStore } from "@/hooks/useCompanyStore"
import SearchBar from "./SearchBar"
import { Employee } from "@/types"

const CompanyHierarchy: React.FC = () => {
  const [search, setSearch] = useState("")
  const { companyStructure } = useCompanyStore()

  const filteredStructure = useMemo(() => {
    if (!search) return [companyStructure]
    function searchEmployee(employees: Employee): Employee[] {
      const condition = employees.name.toLowerCase().includes(search.toLowerCase()) || employees.emailId.toLowerCase().includes(search.toLowerCase()) || employees.phoneNumber.toLowerCase().includes(search.toLowerCase())
      if (condition) {
        const children = employees.children ? employees.children.flatMap(child => searchEmployee(child)) : []
        return [employees, ...children];
      }

      if (employees.children) {
        return employees.children.flatMap(child => searchEmployee(child))
      }

      return [];
    }
    return searchEmployee(companyStructure)
  }, [search, companyStructure])




  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Company Hierarchy</h1>
      <SearchBar value={search} onChange={setSearch} />
      {
        filteredStructure.length > 0 ?
          filteredStructure.map(employee => <EmployeeNode
            employee={employee}
            level={0}
            key={employee.id}
          />
        )
          : <h2 className="font-bold text-xl">No data found</h2>
      }
    </div>
  )
}

export default CompanyHierarchy