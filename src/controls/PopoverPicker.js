import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

import useClickOutside from "./../effects/useClickOutside";

export const PopoverPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker w-100">
      <div className='picker-input'>
          <div
            className="swatch"
            style={{ backgroundColor: color }}
            onClick={() => toggle(true)}
          />
          <HexColorInput className='w-70' color={color} onChange={onChange} onClick={toggle} alpha prefix='#' />
      </div>

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
