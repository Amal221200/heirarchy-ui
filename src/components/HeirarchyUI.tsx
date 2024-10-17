import React from "react"
import { EmployeeNode } from "./EmployeeNode"
import { useCompanyStore } from "@/hooks/useCompanyStore"

const CompanyHierarchy: React.FC = () => {
  const { companyStructure } = useCompanyStore()

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Company Hierarchy</h1>
      <EmployeeNode
        employee={companyStructure}
        level={0}
      />
    </div>
  )
}

export default CompanyHierarchy