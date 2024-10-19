import React, { ComponentProps } from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AddButtonProps extends ComponentProps<'button'> {
    screanReaderText?: string
}

const AddButton: React.FC<AddButtonProps> = ({ screanReaderText, className, ...props }) => {
    return (
        <Button variant="outline" size="icon" className={cn('border-yellow-600 bg-yellow-100/40', className)} {...props}>
            <Plus className="h-4 w-4 text-yellow-600" />
            <span className="sr-only">{screanReaderText}</span>
        </Button>
    )
}

export default AddButton