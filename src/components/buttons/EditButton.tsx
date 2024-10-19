import React, { ComponentProps } from 'react'
import { Button } from '../ui/button'
import { Edit } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EditButtonProps extends ComponentProps<'button'> {
    screanReaderText?: string
}

const EditButton: React.FC<EditButtonProps> = ({ screanReaderText, className, ...props }) => {
    return (
        <Button variant="outline" size="icon" className={cn('border-emerald-600 bg-emerald-100/40', className)} {...props}>
            <Edit className="h-4 w-4 text-emerald-600" />
            <span className="sr-only">{screanReaderText}</span>
        </Button>
    )
}

export default EditButton