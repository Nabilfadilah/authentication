import {forwardRef} from "react";

const Input = forwardRef((props, ref) => {
  const {type, placeholder, name, value, onChange} = props;

  return (
    <input
      type={type}
      className="text-sm border rounded w-full py-2 px-2 text-slate-700 placeholder:opacity-50 focus:outline-none"
      placeholder={placeholder}
      name={name}
      id={name}
      ref={ref}
      value={value}
      onChange={onChange}
      required
      autoComplete="off"
    />
  );
});

export default Input;
