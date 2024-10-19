import React, { useDeferredValue, useMemo, useState } from "react"
import { EmployeeNode } from "./EmployeeNode"
import { useCompanyStore } from "@/hooks/useCompanyStore"
import SearchBar from "./SearchBar"
import { searchEmployee } from "@/functions"

const CompanyHierarchy: React.FC = () => {
  const [search, setSearch] = useState("")
  const { companyStructure } = useCompanyStore()

  const defferedSearch = useDeferredValue(search)

  const filteredStructure = useMemo(() => {
    if (!defferedSearch) return [companyStructure]

    return searchEmployee(companyStructure, defferedSearch)
  }, [defferedSearch, companyStructure])

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