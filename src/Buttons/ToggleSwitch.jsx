import React, { useState } from 'react';
import { Switch } from 'antd';
// import 'antd/dist/reset.css';
const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (checked) => {
    setIsChecked(checked);
  };

  return (
    <div className="flex items-center">
      <Switch
        checked={isChecked}
        onChange={handleChange}
        className={`${
          isChecked ? 'bg-green-400' : 'bg-gray-300'
        } relative inline-block w-10 h-6 rounded-full`}
        checkedChildren={<span className="hidden">On</span>}
        unCheckedChildren={<span className="hidden">Off</span>}
      />
      {/* <div className="ml-2 text-gray-700 font-medium">Toggle</div> */}
    </div>
  );
};

export default ToggleSwitch;