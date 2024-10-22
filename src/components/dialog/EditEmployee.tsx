import React, { useCallback, useMemo, useState } from "react"
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
import { useCompanyStore } from "@/hooks/useCompanyStore"
import SelectInput from "../SelectInput"
import { getTeam, getTeams, validateEmployee } from "@/functions"
import { toast } from "sonner"
import EditButton from "../buttons/EditButton"

interface EditEmployeeDialogProps {
  employee: Employee
}

// It edits the information of team member as well as the team since the type is same.
export const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({ employee }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editedEmployee, setEditedEmployee] = useState<Employee>(employee)
  const { editTeamMember, updateEmployee, companyStructure } = useCompanyStore()

  const handleUpdate = useCallback(() => {
    if (!editedEmployee.name || !editedEmployee.emailId || !editedEmployee.phoneNumber) {
      toast.warning("All fields are required");
      return
    }

    if (!validateEmployee(editedEmployee)) {
      return
    }
   
    if (editedEmployee.teamId === employee.teamId) {
      updateEmployee(editedEmployee)
    } else {
      const team = getTeam(companyStructure, employee.department, employee.teamId!);
      if (!team) {
        return
      }
      if (!team.children) {
        return
      }

      const availableEmployees = team?.children?.length;
      if (availableEmployees <= 2) {
        toast.warning("You cannot move the employee to another team. The team needs minimum 2 team members");
        return
      }
      editTeamMember(editedEmployee)
    }
    setIsOpen(false)
  }, [editedEmployee, employee, updateEmployee, editTeamMember, companyStructure])

  const departmentTeams = useMemo(() => getTeams(companyStructure, employee.department), [employee, companyStructure])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <EditButton screanReaderText={`Edit ${employee.role === "Team" ? "Team" : "Employee"}`} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {employee.role === "Team" ? "Team" : "Employee"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={editedEmployee.name}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, name: e.target.value })
              }
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={editedEmployee.phoneNumber}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, phoneNumber: e.target.value })
              }
              placeholder="XXXXXXXXXX"
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={editedEmployee.emailId}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, emailId: e.target.value })
              }
              required
              placeholder="abc@example.com"
              className="col-span-3"
            />
          </div>
          {employee.role === "Team Member" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Team
              </Label>

              <SelectInput value={editedEmployee.teamId ?? ''}
                onChange={(value) => setEditedEmployee({ ...editedEmployee, teamId: value })}
                items={departmentTeams.map((team) => ({ value: team.id, label: team.name }))}
                className="col-span-3" placeholder="Select Team" />
            </div>
          )}
        </div>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogContent>
    </Dialog>
  )
}