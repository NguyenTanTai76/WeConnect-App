import { TextField } from "@mui/material";

const TextInput = ({ name, value, onChange, type = "text", error }) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: { className: "h-10 px-3 py-2" },
        htmlInput: { className: "!p-0" },
      }}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={error}
    />
  );
};
export default TextInput;
