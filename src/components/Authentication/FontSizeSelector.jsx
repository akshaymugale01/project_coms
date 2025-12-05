import React from "react";
import { useDispatch } from "react-redux";
import { setFontSize } from "../../features/font/fontSizeSlice";
import { useSelector } from "react-redux";

const FontSizeSelector = () => {
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.fontSize);

  const handleFontSizeChange = (event) => {
    dispatch(setFontSize(event.target.value));
  };

  return (
    <div className="p-4 flex flex-col max-w-44">
      <label htmlFor="font-size" className="font-medium ">
        Select Font Size:
      </label>
      <select
        id="font-size"
        onChange={handleFontSizeChange}
        value={fontSize}
        className="border border-gray-400 rounded"
      >
        <option value="text-xs">50%</option>
        <option value="text-sm">75%</option>
        <option value="text-base">100%</option>
        <option value="text-lg">125%</option>
        <option value="text-xl">150%</option>
      </select>
    </div>
  );
};

export default FontSizeSelector;