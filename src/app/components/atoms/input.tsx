import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/src/app/components/atoms/label"; 

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string; 
  label?: string; 
  type: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, label, ...props }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext(); 
    return (
      <div className="flex flex-col space-y-2 mt-3">
        {label && <Label htmlFor={name}>{label}</Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type={type}
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mb-1",
                  className,
                  errors[name] && "border-red-500" 
                )}
                ref={ref}
                {...props}
              />
              {errors[name] && (
                <span className="text-red-500 text-sm">
                  {errors[name]?.message as string} 
                </span>
              )}
            </>
          )}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };