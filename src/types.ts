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

export interface Team {
    id: string
    name: string
    department: string
}