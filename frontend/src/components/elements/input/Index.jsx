import {forwardRef} from "react";
import Input from "./Input";
import Label from "./Label";

const InputForm = forwardRef((props, ref) => {
  // ini mengambil dari semua props di input dan label
  const {label, name, type, placeholder, value, onChange} = props;

  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={onChange}
        required
      ></Input>
    </div>
  );
});

export default InputForm;
