/* eslint-disable react/prop-types */
function FormInput({
  type,
  name,
  required,
  placeHolder,
  onChange,
  className,
  defaultValue,
  disabled,
}) {
  return (
    <input
      disabled={disabled}
      defaultValue={defaultValue}
      type={type}
      name={name}
      placeholder={placeHolder}
      onChange={onChange}
      required={required}
      className={`rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 ${className}`}
    />
  );
}

export default FormInput;
