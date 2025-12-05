import { useState, useRef, useEffect } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const SalaryAccordion = ({
  title,
  items,
  totalMonthly,
  totalYearly,
  onMonthlyChange,
  showInput = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isExpanded]);

  const inputShow = showInput;

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-4 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-blue-600 w-1/2">{title}</span>
        <div className="flex items-center w-1/2">
          <span className="text-lg font-medium text-green-500 w-1/3 text-center">
            ₹{totalMonthly.toLocaleString()}
          </span>
          <span className="text-lg font-medium text-green-500 w-1/3 text-right">
            ₹{totalYearly.toLocaleString()}
          </span>
          <span className="w-1/3 flex justify-end">
            {isExpanded ? (
              <MdExpandLess className="w-6 h-6 text-gray-500" />
            ) : (
              <MdExpandMore className="w-6 h-6 text-gray-500" />
            )}
          </span>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-fit" : "max-h-0"
        }`}
        ref={contentRef}
      >
        <div className="">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-gray-700 w-1/2">{item.label}</span>
              <div className="flex items-center w-1/2">
                <div className="w-1/3 flex justify-center">
                  <div className="flex items-center ">
                    <span className="text-gray-500 mr-1 ">₹</span>
                    {inputShow ? (
                      <input
                        type="number"
                        value={item.monthly}
                        //   onChange={() => {}}
                        className="w-20 p-1 border rounded text-right"
                        onChange={(e) => onMonthlyChange(index, e.target.value)}
                      />
                    ) : (
                      <p>{item.monthly}</p>
                    )}
                  </div>
                </div>
                <span className="w-1/3 text-right">₹{item.yearly.toLocaleString()}</span>
                <span className="w-1/3"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryAccordion;
