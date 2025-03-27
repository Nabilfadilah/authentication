// menggunakan (Props) / properties
// didefinsikan sebagai sebuah varameter funtion
const ButtonAll = (props) => {
  // konsep desctrukturing
  const {
    children,
    className = "bg-black",
    onClick = () => {},
    type = "button",
  } = props;

  return (
    <button
      // konsep desctrukturing
      className={`h-7 px-3 py-1 text-sm font-semibold rounded-md ${className} text-white`}
      type={type}
      // event handler
      onClick={onClick}
    >
      {/* konsep desctrukturing */}
      {children}
    </button>
  );
};

export default ButtonAll;
