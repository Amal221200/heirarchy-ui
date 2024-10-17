import React, { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Employee, Team } from "@/types"
import { Edit } from "lucide-react"
import { useCompanyStore } from "@/hooks/useCompanyStore"

interface EditEmployeeDialogProps {
  employee: Employee
  onUpdate: (updatedEmployee: Employee) => void
  teams: Team[]
}

export const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({ employee, teams }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editedEmployee, setEditedEmployee] = useState<Employee>(employee)
  const {editTeamMember, updateEmployee} = useCompanyStore()

  const handleUpdate = () => {
    if(editedEmployee.teamId === employee.teamId) {
        updateEmployee(editedEmployee)
    } else {
        editTeamMember(editedEmployee)
    }
    setIsOpen(false)
  }

  const departmentTeams = teams.filter((team) => team.department === employee.department)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit employee</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
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
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={editedEmployee.phoneNumber}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, phoneNumber: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={editedEmployee.emailId}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, emailId: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          {employee.role === "Team Member" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Team
              </Label>
              <Select
                value={editedEmployee.teamId}
                onValueChange={(value) =>
                  setEditedEmployee({ ...editedEmployee, teamId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {departmentTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogContent>
    </Dialog>
  )
}