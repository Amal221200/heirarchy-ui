import React, { ComponentProps } from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeleteButtonProps extends ComponentProps<'button'> {
    screanReaderText?: string
}


const DeleteButton: React.FC<DeleteButtonProps> = ({ screanReaderText, className, ...props }) => {
    return (
        <Button variant="outline" size="icon" className={cn('border-red-600 bg-red-100/40', className)} {...props}>
            <Trash2 className="h-4 w-4 text-red-600" />
            <span className="sr-only">{screanReaderText}</span>
        </Button>
    )
}

export default DeleteButton