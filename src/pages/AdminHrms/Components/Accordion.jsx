import { useState, useRef, useEffect } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const Accordion = ({ title, icon: Icon, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isExpanded]);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full pt-4 py-2 text-left text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <div className="flex items-center">
          {Icon && <Icon className="w-6 h-6 mr-3 text-blue-500" />}
          <span className="text-lg font-medium">{title}</span>
        </div>
        {isExpanded ? (
          <MdExpandLess className="w-6 h-6 transition-transform duration-500 " />
        ) : (
          <MdExpandMore className="w-6 h-6 transition-transform duration-500" />
        )}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isExpanded
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
        }}
      >
        <div className="py-2">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
