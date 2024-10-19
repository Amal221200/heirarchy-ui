import React, { useMemo, useState } from "react"
import { ChevronDown, ChevronRight, User, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Employee } from "@/types"
import { useCompanyStore } from "@/hooks/useCompanyStore"
import { EditEmployeeDialog } from "./dialog/EditEmployee"
import { AddTeamMemberDialog } from "./dialog/AddTeamMember"
import { AddTeamDialog } from "./dialog/AddTeam"

interface EmployeeNodeProps {
    employee: Employee
    level: number
}

export const EmployeeNode: React.FC<EmployeeNodeProps> = ({ employee, level }) => {
    const { deleteEmployee, teams } = useCompanyStore()
    const [isOpen, setIsOpen] = useState(false)
    const handleDelete = () => {
        deleteEmployee(employee.id)
    }

    const canAddMember = useMemo(()=> employee.role === "Team Leader", [employee.role])
    const isHeadOfDepartment = useMemo(()=> employee.role.includes('Head'), [employee.role])

    return (
        <Card className="mb-2">
            <CardContent className="p-4">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-gray-500" />
                            <h3 className="text-lg font-semibold">{employee.name}</h3>
                            <span className="text-sm text-gray-500">({employee.role})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {employee.role !== "CEO" && (
                                <>
                                    <EditEmployeeDialog
                                        employee={employee}
                                        teams={teams}
                                    />
                                    <Button variant="outline" size="icon" onClick={handleDelete}>
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete employee</span>
                                    </Button>
                                </>
                            )}
                            {canAddMember && (
                                <AddTeamMemberDialog
                                    teamLeader={employee}
                                />
                            )}
                            {isHeadOfDepartment && (
                                <AddTeamDialog
                                    headOfDepartment={employee}
                                />
                            )}
                            {employee.children && employee.children.length > 0 && (
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        {isOpen ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </Button>
                                </CollapsibleTrigger>
                            )}
                        </div>
                    </div>
                    {/* <p>{employee.id}</p> */}

                    {employee.children && employee.children.length > 0 && (
                        <CollapsibleContent>
                            <div className="mt-4 border-l-2 border-gray-200 pl-4">
                                {employee.children.map((child) => (
                                    <EmployeeNode
                                        key={child.id}
                                        employee={child}
                                        level={level + 1}
                                    />
                                ))}
                            </div>
                        </CollapsibleContent>
                    )}
                </Collapsible>
            </CardContent>
        </Card>
    )
}