import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "w-full appearance-none bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white focus:ring-0 focus:ring-offset-0 pr-8",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

const SelectItem = ({ children, ...props }: React.OptionHTMLAttributes<HTMLOptionElement>) => {
  return <option {...props}>{children}</option>
}
SelectItem.displayName = "SelectItem"

export { Select, SelectItem }
