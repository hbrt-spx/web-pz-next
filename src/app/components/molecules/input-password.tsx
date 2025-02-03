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

const InputPass = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, label, ...props }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };
    const inputType = showPassword ? "text" : "password";

    return (
      <div className="flex flex-col space-y-2">
        {label && <Label htmlFor={name}>{label}</Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type={inputType}
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-3",
                  className,
                  errors[name] && "border-red-500"
                )}
                ref={ref}
                {...props}
              /> 
              <div className="flex justify-end">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                  className="mr-1 text-sm"
                />
                <label htmlFor="show-password" className="text-sm text-muted-foreground">
                  Mostrar senha
                </label>
              </div>
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

InputPass.displayName = "InputPass";

export { InputPass };
