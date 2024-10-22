import { Employee } from "@/types";


export const companyData: Employee = {
    name: "John Doe",
    id: "CEO001",
    phoneNumber: "1234567890",
    emailId: "johndoe@company.com",
    role: "CEO",
    department: "Executive",
    children: [
        {
            name: "Jane Smith",
            id: "HR001",
            phoneNumber: "2345678901",
            emailId: "janesmith@company.com",
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
                            phoneNumber: "3456789012",
                            emailId: "alicejohnson@company.com",
                            role: "Team Leader",
                            department: "HR",
                            teamId: "T1",

                        },
                        {
                            name: "Bob Williams",
                            id: "T1M001",
                            phoneNumber: "4567890123",
                            emailId: "bobwilliams@company.com",
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
                            phoneNumber: "5678901234",
                            emailId: "charliebrown@company.com",
                            role: "Team Leader",
                            department: "HR",
                            teamId: "T2",
                        },
                        {
                            name: "David Davis",
                            id: "T2M001",
                            phoneNumber: "6789012345",
                            emailId: "daviddavis@company.com",
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
            phoneNumber: "7890123456",
            emailId: "evamartinez@company.com",
            role: "Head of Engineering",
            department: "Engineering",
            children: [
                {
                    name: "Engineer Team",
                    id: "ET0",
                    department: "Engineering",
                    role: "Team",
                    emailId: "franklee@company.com",
                    phoneNumber: "8901234567",
                    children: [
                        {
                            name: "Frank Lee",
                            id: "ET1L001",
                            phoneNumber: "8901234567",
                            emailId: "franklee@company.com",
                            role: "Team Leader",
                            department: "Engineering",
                            teamId: "ET0",
                        },
                        {
                            name: "Grace Kim",
                            id: "ET1M001",
                            phoneNumber: "9012345678",
                            emailId: "gracekim@company.com",
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
            phoneNumber: "0123456789",
            emailId: "henrywilson@company.com",
            role: "Head of Design",
            department: "Design",
            children: [

                {
                    name: "Design Team",
                    department: "Design",
                    id: "DT0",
                    role: "Team",
                    emailId: "ivychen@company.com",
                    phoneNumber: "1234567890",
                    children: [
                        {
                            name: "Ivy Chen",
                            id: "DT1L001",
                            phoneNumber: "1234567890",
                            emailId: "ivychen@company.com",
                            role: "Team Leader",
                            department: "Design",
                            teamId: "DT0",
                        },
                        {
                            name: "Jack Taylor",
                            id: "DT1M001",
                            phoneNumber: "2345678901",
                            emailId: "jacktaylor@company.com",
                            role: "Team Member",
                            department: "Design",
                            teamId: "DT0",
                        },
                    ]
                }
            ],
        },
    ],
}