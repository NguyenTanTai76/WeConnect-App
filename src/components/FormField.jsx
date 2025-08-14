import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const FormField = ({ control, label, name, type, Component, error }) => {
  return (
    <div>
      <p className="mb-1 text-sm font-bold text-dark-100">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <Component
              name={name}
              value={value}
              onChange={onChange}
              type={type}
              control={control}
              error={error?.message}
            />
          );
        }}
      />
      {error?.message && (
        <FormHelperText error={true}>{error?.message}</FormHelperText>
      )}
    </div>
  );
};

export default FormField;
