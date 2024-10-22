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
import { useCompanyStore } from "@/hooks/useCompanyStore"
import AddButton from "../buttons/AddButton"

interface AddTeamMemberDialogProps {
  team: Employee
}

export const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({ team }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { addTeamMember } = useCompanyStore()
  const [newEmployee, setNewEmployee] = useState<Employee>({
    name: "",
    id: `${team.department[0]}T${crypto.randomUUID().slice(-5)}`,
    phoneNumber: "",
    emailId: "",
    role: "Team Member",
    department: team.department,
    teamId: team.id,
  })

  const handleAdd = () => {
    addTeamMember(team.id!, newEmployee)
    setIsOpen(false)
    setNewEmployee({
      name: "",
      id: `${team.department[0]}T${crypto.randomUUID().slice(-5)}`,
      phoneNumber: "",
      emailId: "",
      role: "Team Member",
      department: team.department,
      teamId: team.id,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AddButton screanReaderText="Add Team Member" />
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
              readOnly
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
              type="tel"
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
              type="email"
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