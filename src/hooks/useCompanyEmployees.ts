import { create } from "zustand";

// interface Employee {
//     name: string
//     id: string
//     phoneNumber: string
//     emailId: string
//     role: string
//     children?: Employee[]
// }

// interface ComanyEmployeeType {
//     employee: Employee;
//     addEmployee: (employee: Employee) => void;
//     editEmployee: (employee: Employee) => void;
//     deleteEmployee: (employee: Employee) => void;
//     changeEmployee: (employee: Employee) => void;
//     // addTeam: (team: Team) => void;
// }


// const useCompanyEmployees = create<ComanyEmployeeType>((set) => ({}));

export const useSelectedLevel = create<{
    level: number,
    id?: string,
    setLevel: (level: number, id?: string) => void
}>((set) => ({
    level: -1,
    setLevel(level, id) {
        set({ level, id })
    },
}))
