import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const InputPass = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

   
    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

    
    const inputType = type === "password" && !showPassword ? "password" : "text";

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          type={inputType} 
          value={value}
          onChange={onChange} 
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mb-1",
            className
          )}
        />
        
        <div className="flex items-center justify-end">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={togglePasswordVisibility}
            className="mr-1 mt-0 text-sm"
          />
          <label htmlFor="show-password" className="text-sm text-muted-foreground">
            Mostrar senha
          </label>
        </div>
      </div>
    );
  }
);

InputPass.displayName = "InputPass";

export { InputPass };
