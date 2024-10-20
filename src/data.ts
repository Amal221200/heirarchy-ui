import { Employee } from "@/types";


export const companyData: Employee = {
    name: "John Doe",
    id: "CEO001",
    phoneNumber: "+1 (123) 456-7890",
    emailId: "john.doe@company.com",
    role: "CEO",
    department: "Executive",
    children: [
        {
            name: "Jane Smith",
            id: "HR001",
            phoneNumber: "+1 (234) 567-8901",
            emailId: "jane.smith@company.com",
            role: "Head of Staff/HR",
            department: "HR",
            children: [
                {
                    name: "HR Team 1",
                    id: "T1",
                    department: "HR",
                    role: "Team",
                    emailId: "",
                    phoneNumber: "",
                    children: [
                        {
                            name: "Alice Johnson",
                            id: "T1L001",
                            phoneNumber: "+1 (345) 678-9012",
                            emailId: "alice.johnson@company.com",
                            role: "Team Leader",
                            department: "HR",
                            teamId: "T1",

                        },
                        {
                            name: "Bob Williams",
                            id: "T1M001",
                            phoneNumber: "+1 (456) 789-0123",
                            emailId: "bob.williams@company.com",
                            role: "Team Member",
                            department: "HR",
                            teamId: "T1",
                        },
                    ]
                },
                {
                    name: "HR Team 2",
                    id: "T2",
                    department: "HR",
                    role: "Team",
                    emailId: "",
                    phoneNumber: "",
                    children: [
                        {
                            name: "Charlie Brown",
                            id: "T2L001",
                            phoneNumber: "+1 (567) 890-1234",
                            emailId: "charlie.brown@company.com",
                            role: "Team Leader",
                            department: "HR",
                            teamId: "T2",
                        },
                        {
                            name: "David Davis",
                            id: "T2M001",
                            phoneNumber: "+1 (678) 901-2345",
                            emailId: "david.davis@company.com",
                            role: "Team Member",
                            department: "HR",
                            teamId: "T2",
                        },
                    ]
                },
            ],
        },
        {
            name: "Eva Martinez",
            id: "ENG001",
            phoneNumber: "+1 (789) 012-3456",
            emailId: "eva.martinez@company.com",
            role: "Head of Engineering",
            department: "Engineering",
            children: [
                {
                    name: "Engineer Team",
                    id: "ET0",
                    department: "Engineering",
                    role: "Team",
                    emailId: "frank.lee@company.com",
                    phoneNumber: "+1 (890) 123-4567",
                    children: [
                        {
                            name: "Frank Lee",
                            id: "ET1L001",
                            phoneNumber: "+1 (890) 123-4567",
                            emailId: "frank.lee@company.com",
                            role: "Team Leader",
                            department: "Engineering",
                            teamId: "ET0",
                        },
                        {
                            name: "Grace Kim",
                            id: "ET1M001",
                            phoneNumber: "+1 (901) 234-5678",
                            emailId: "grace.kim@company.com",
                            role: "Team Member",
                            department: "Engineering",
                            teamId: "ET0",
                        },
                    ]
                },

            ]
        },
        {
            name: "Henry Wilson",
            id: "DES001",
            phoneNumber: "+1 (012) 345-6789",
            emailId: "henry.wilson@company.com",
            role: "Head of Design",
            department: "Design",
            children: [

                {
                    name: "Design Team",
                    department: "Design",
                    id: "DT0",
                    role: "Team",
                    emailId: "ivy.chen@company.com",
                    phoneNumber: "+1 (123) 456-7890",
                    children: [
                        {
                            name: "Ivy Chen",
                            id: "DT1L001",
                            phoneNumber: "+1 (123) 456-7890",
                            emailId: "ivy.chen@company.com",
                            role: "Team Leader",
                            department: "Design",
                            teamId: "DT1",
                        },
                        {
                            name: "Jack Taylor",
                            id: "DT1M001",
                            phoneNumber: "+1 (234) 567-8901",
                            emailId: "jack.taylor@company.com",
                            role: "Team Member",
                            department: "Design",
                            teamId: "DT1",
                        },
                    ]
                }
            ],
        },
    ],
}

export const getTeams = (employees: Employee, department: string): Array<Employee> => {
    if (employees.role === 'Team' && employees.department === department) {
        const team = {
            name: employees.name,
            id: employees.id,
            department: employees.department,
            role: employees.role,
            emailId: employees.emailId,
            phoneNumber: employees.phoneNumber,
        }
        return [team]
    }

    if (employees.children) {
        return employees.children.flatMap(child => getTeams(child, department))
    }

    return []
}



export const getCompanyData = () => {
    const data = localStorage.getItem('companyData');
    if (data) {
        return JSON.parse(data)
    } else {
        localStorage.setItem('companyData', JSON.stringify(companyData))
        return companyData
    }
}