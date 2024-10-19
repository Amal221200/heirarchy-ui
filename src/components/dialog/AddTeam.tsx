import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Employee } from "@/types"
import { Plus } from "lucide-react"
import { useCompanyStore } from "@/hooks/useCompanyStore"
import SelectInput from "../SelectInput"

interface AddTeamDialogProps {
    headOfDepartment: Employee
}

export const AddTeamDialog: React.FC<AddTeamDialogProps> = ({ headOfDepartment }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { addTeam, editTeamMember } = useCompanyStore()

    const [newTeam, setNewTeam] = useState<Employee>({
        name: "",
        id: `${headOfDepartment.department[0]}T${headOfDepartment.children?.length ?? 0}`,
        phoneNumber: "",
        emailId: "",
        role: "Team",
        department: headOfDepartment.department,
    })
    const [teamLeader, setTeamLeader] = useState<Employee>();

    const handleAdd = () => {
        if (!teamLeader) return
        addTeam(headOfDepartment.id!, { ...newTeam })
        editTeamMember(teamLeader)
        setIsOpen(false)
        setNewTeam(() => ({
            name: "",
            id: `${headOfDepartment.department[0]}T${headOfDepartment.children?.length?.toPrecision(2) ?? '00'}`,
            phoneNumber: "",
            emailId: "",
            role: "Team",
            department: headOfDepartment.department,
        }))
        setTeamLeader(undefined)
    }

    const employees = useMemo(() => {
        function findEmployees(employees: Employee): Array<Employee> {
            if (employees.children) {
                return employees.children.flatMap(findEmployees).filter((employees) => !!employees)
            }

            if (employees.role !== "Team Leader") {
                return [employees]
            }

            return []
        }

        return findEmployees(headOfDepartment)
    }, [headOfDepartment])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Team</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Team</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="new-name"
                            value={newTeam.name}
                            onChange={(e) =>
                                setNewTeam({ ...newTeam, name: e.target.value })
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-id" className="text-right">
                            ID
                        </Label>
                        <Input
                            id="new-id"
                            value={newTeam.id}
                            onChange={(e) =>
                                setNewTeam({ ...newTeam, id: e.target.value })
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-phone" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="new-phone"
                            value={newTeam.phoneNumber}
                            onChange={(e) =>
                                setNewTeam({ ...newTeam, phoneNumber: e.target.value })
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="new-email"
                            value={newTeam.emailId}
                            onChange={(e) =>
                                setNewTeam({ ...newTeam, emailId: e.target.value })
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-email" className="text-right">
                            Team Leader
                        </Label>
                        <SelectInput
                            value={teamLeader?.id ?? ""}
                            onChange={(value) => {
                                const employee = employees.find(employee => employee.id === value)
                                if (!employee) {
                                    return
                                }
                                setTeamLeader({ ...employee, teamId: newTeam.id, role: "Team Leader" })
                            }}
                            items={employees.map(employee => ({ value: employee.id, label: employee.name }))}
                            className="col-span-3"
                            placeholder="Select Team Leader"
                            disabled={!newTeam.id || !employees.length}
                        />
                    </div>
                </div>
                <Button onClick={handleAdd}>Add</Button>
            </DialogContent>
        </Dialog>
    )
}