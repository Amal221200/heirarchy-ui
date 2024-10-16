import React, { useState, useCallback } from "react"
import { ChevronDown, ChevronRight, User, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
import { companyData } from "@/data"
import { Checkbox } from "./ui/checkbox"
import { useSelectedLevel } from "@/hooks/useCompanyEmployees"

export interface Employee {
  name: string
  id: string
  phoneNumber: string
  emailId: string
  role: string
  department: string
  teamId?: string
  children?: Employee[]
}

interface Team {
  id: string
  name: string
  department: string
}

const EmployeeNode: React.FC<{
  employee: Employee
  level: number
  onUpdate: (updatedEmployee: Employee) => void
  onDelete: () => void
  onAdd: (newEmployee: Employee) => void
  teams: Team[],
}> = ({ employee, level, onUpdate, onDelete, onAdd, teams, }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editedEmployee, setEditedEmployee] = useState<Employee>(employee)
  const [newEmployee, setNewEmployee] = useState<Employee>({
    name: "",
    id: "",
    phoneNumber: "",
    emailId: "",
    role: "Team Member",
    department: employee.department,
    teamId: employee.teamId,
  })


  const { level: selectedLevel, setLevel: setSelectedLevel, } = useSelectedLevel()

  const handleUpdate = useCallback(() => {
    onUpdate(editedEmployee)
    setIsEditDialogOpen(false)
  }, [editedEmployee, onUpdate])

  const handleAdd = useCallback(() => {
    onAdd(newEmployee)
    setIsAddDialogOpen(false)
    setNewEmployee({
      name: "",
      id: "",
      phoneNumber: "",
      emailId: "",
      role: "Team Member",
      department: employee.department,
      teamId: employee.teamId,
    })
  }, [newEmployee, onAdd, employee.department, employee.teamId])

  const canAddMember = employee.role === "Team Leader"
  const departmentTeams = teams.filter((team) => team.department === employee.department)
  

  return (
    <Card className="mb-2">
      <CardContent className="p-4">
        <Collapsible open={isOpen || (selectedLevel! <= level && selectedLevel! !== -1)} onOpenChange={(e) => {
          setIsOpen(e)
          setSelectedLevel(-1)
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox checked={selectedLevel <= level && selectedLevel! !== -1} onCheckedChange={(e) => {
                setSelectedLevel(e as boolean ? level : -1);
              }} />
              <User className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <span className="text-sm text-gray-500">({employee.role})</span>
            </div>
            <div className="flex items-center space-x-2">
              {employee.role !== "CEO" && (
                <>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
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
                  <Button variant="outline" size="icon" onClick={onDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              {canAddMember && (
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
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
              )}
              {employee.children && employee.children.length > 0 && (
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isOpen || (selectedLevel >= level && selectedLevel! !== -1) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              )}
            </div>
          </div>

          {employee.children && employee.children.length > 0 && (
            <CollapsibleContent>
              <div className="mt-4 border-l-2 border-gray-200 pl-4">
                {employee.children.map((child, index) => (
                  <EmployeeNode
                    key={child.id}
                    employee={child}
                    level={level + 1}
                    onUpdate={(updatedChild) => {
                      const updatedChildren = [...employee.children!]
                      updatedChildren[index] = updatedChild
                      onUpdate({ ...employee, children: updatedChildren })
                    }}
                    onDelete={() => {
                      const updatedChildren = employee.children!.filter((_, i) => i !== index)
                      onUpdate({ ...employee, children: updatedChildren })
                    }}
                    onAdd={(newChild) => {
                      const updatedChildren = [...employee.children!, newChild]
                      onUpdate({ ...employee, children: updatedChildren })
                    }}
                    teams={teams}
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

const CompanyHierarchyExperimental: React.FC = () => {
  const [teams,] = useState<Team[]>([
    { id: "T1", name: "HR Team 1", department: "HR" },
    { id: "T2", name: "HR Team 2", department: "HR" },
    { id: "ET1", name: "Engineering Team", department: "Engineering" },
    { id: "DT1", name: "Design Team", department: "Design" },
  ])

  const [companyStructure, setCompanyStructure] = useState<Employee>(companyData)

  const updateEmployee = useCallback((updatedEmployee: Employee) => {
    setCompanyStructure((prevStructure) => {
      const updateRecursive = (employee: Employee): Employee => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee
        }

        if (employee.children) {
          return {
            ...employee,
            children: employee.children.map(updateRecursive),
          }
        }
        return employee
      }
      return updateRecursive(prevStructure)
    })
  }, [])



  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Company Hierarchy Experimental</h1>
      <EmployeeNode
        employee={companyStructure}
        level={0}
        onUpdate={updateEmployee}
        onDelete={() => { }}
        onAdd={(newEmployee) =>
          updateEmployee({
            ...companyStructure,
            children: [...(companyStructure.children || []), newEmployee],
          })
        }
        teams={teams}
      />
    </div>
  )
}

export default CompanyHierarchyExperimental