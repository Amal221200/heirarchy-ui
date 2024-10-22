import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { Plus } from 'lucide-react'
import { ComponentPropsWithRef, forwardRef } from 'react'
import { buttonVariants } from '../ui/button'

interface AddButtonProps extends ComponentPropsWithRef<"button"> {
    asChild?: boolean
    screanReaderText?: string
}

const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(({ className, asChild, screanReaderText, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp ref={ref} className={cn(buttonVariants({ variant: "outline", size: "icon", className: cn('border-yellow-600 bg-yellow-100/40', className) }))} {...props}>
            <Plus className="h-4 w-4 text-yellow-600" />
            <span className="sr-only">{screanReaderText}</span>
        </Comp>
    )
})

export default AddButton