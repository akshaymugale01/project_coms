const InputWithCurrency = ({ value, onChange, placeholder }) => (
  <div className="flex items-center border rounded-md">
    <span className="px-2 bg-gray-100 border-r">₹</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-1 rounded-r-md"
    />
  </div>
);

export default InputWithCurrency;
