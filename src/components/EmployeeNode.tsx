import React, { useMemo, useState } from "react"
import { ChevronDown, ChevronRight, User } from "lucide-react"
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
import DeleteButton from "./buttons/DeleteButton"
import { getTeam } from "@/functions"
import { toast } from "sonner"

interface EmployeeNodeProps {
    employee: Employee
    level: number
}

export const EmployeeNode: React.FC<EmployeeNodeProps> = ({ employee, level, }) => {
    const { deleteEmployee, companyStructure } = useCompanyStore()
    const [isOpen, setIsOpen] = useState(false)


    const handleDelete = () => {
        const team = getTeam(companyStructure, employee.department, employee.teamId!);

        if (!team) {
            return
        }
        if (!team.children) {
            return
        }

        const availableEmployees = team?.children?.length;
        console.log(availableEmployees);

        if (availableEmployees <= 2) {
            toast.warning("The team needs minimum 2 team members");
            return
        }
        deleteEmployee(employee.id)
    }

    const canAddMember = useMemo(() => employee.role === "Team", [employee.role])
    const isHeadOfDepartment = useMemo(() => employee.role.includes('Head'), [employee.role])

    const isDeletable = useMemo(() => employee.role === "Team Member", [employee.role])

    return (
        <Card className="mb-2">
            <CardContent className="p-4">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-gray-500" />
                            <h3 className="text-lg font-semibold">{employee.name}</h3>
                            <span className="text-sm text-gray-500">({employee.role})</span>
                            <span className="text-[12px] font-semibold text-gray-500">{employee.id}</span>
                            {

                                (employee.role === "Team" && (employee?.children?.length ?? 0) < 2) &&
                                <span className="text-[12px] font-semibold text-yellow-500">
                                    Add another member to create this team
                                </span>
                            }
                        </div>
                        <div className="flex items-center space-x-2">
                            {employee.role !== "CEO" && (
                                <EditEmployeeDialog
                                    employee={employee}
                                />
                            )}
                            {
                                isDeletable && (
                                    <DeleteButton onClick={handleDelete} />
                                )
                            }
                            {canAddMember && (
                                <AddTeamMemberDialog
                                    team={employee}
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