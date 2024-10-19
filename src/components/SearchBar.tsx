import React from "react"
import { Input } from "./ui/input"


interface SearchBarProps {
    value: string
    onChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {

    return (
        <div className="my-3 max-w-xl">
            <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search Employee" />
        </div>
    )
}

export default SearchBar