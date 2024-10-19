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
import { Employee } from "@/types"
import { Plus } from "lucide-react"
import { useCompanyStore } from "@/hooks/useCompanyStore"

interface AddTeamMemberDialogProps {
  teamLeader: Employee
}

export const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({ teamLeader }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {addTeamMember} = useCompanyStore()
  const [newEmployee, setNewEmployee] = useState<Employee>({
    name: "",
    id: "",
    phoneNumber: "",
    emailId: "",
    role: "Team Member",
    department: teamLeader.department,
    teamId: teamLeader.teamId,
  })

  const handleAdd = () => {
    addTeamMember(teamLeader.teamId!, newEmployee)
    setIsOpen(false)
    setNewEmployee({
      name: "",
      id: "",
      phoneNumber: "",
      emailId: "",
      role: "Team Member",
      department: teamLeader.department,
      teamId: teamLeader.teamId,
    })
  }  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add Team Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-name" className="text-right">
              Name
            </Label>
            <Input
              id="new-name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
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
              value={newEmployee.id}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, id: e.target.value })
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
              value={newEmployee.phoneNumber}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, phoneNumber: e.target.value })
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
              value={newEmployee.emailId}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, emailId: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleAdd}>Add</Button>
      </DialogContent>
    </Dialog>
  )
}