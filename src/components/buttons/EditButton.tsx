import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { Edit } from 'lucide-react'
import { ComponentPropsWithRef, forwardRef } from 'react'
import { buttonVariants } from '../ui/button'

interface EditButtonProps extends ComponentPropsWithRef<"button"> {
    asChild?: boolean
    screanReaderText?: string
}

const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(({ className, asChild, screanReaderText, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp ref={ref} className={cn(buttonVariants({ variant: "outline", size: "icon", className: cn('border-emerald-600 bg-emerald-100/40', className) }))} {...props}>
            <Edit className="h-4 w-4 text-emerald-600" />
            <span className="sr-only">{screanReaderText}</span>
        </Comp>
    )
})

export default EditButton