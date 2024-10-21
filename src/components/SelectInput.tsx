import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { cn } from '@/lib/utils'

interface SelectInputProps {
    value: string
    onChange: (value: string) => void
    items: Array<{ value: string, label: string }>
    className?: string
    disabled?: boolean
    placeholder: string
    emptyText?: string
}

const SelectInput: React.FC<SelectInputProps> = ({ items, onChange, value, className, disabled, placeholder, emptyText="No data to select" }) => {
    return (
        <Select
            value={value}
            onValueChange={onChange}
            disabled={disabled}

        >
            <SelectTrigger className={cn("", className)}>
                <SelectValue placeholder={items.length ? placeholder : emptyText} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectInput