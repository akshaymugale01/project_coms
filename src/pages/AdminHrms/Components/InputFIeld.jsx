export const InputField = ({
  label,
  required,
  value,
  onChange,
  placeholder,
  name
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      name={name}
      className="border border-gray-300 rounded-md p-1 w-96"
      placeholder={placeholder}
    />
  </div>
);
