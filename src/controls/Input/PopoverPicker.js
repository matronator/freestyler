import { useCallback, useRef, useState, useMemo } from "react";
import { HexColorInput, RgbaStringColorPicker } from "react-colorful";
import useClickOutside from "./../../effects/useClickOutside";
import { colord } from 'colord';

export const PopoverPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  const hexString = useMemo(() => {
    return color.startsWith("#") ? color : colord(color).toHex();
  }, [color]);

  return (
    <div className="picker w-100">
      <div className='picker-input'>
          <div
            className="swatch"
            style={{ backgroundColor: color }}
            onClick={() => toggle(true)}
          />
          <HexColorInput className='w-70 input-text' color={hexString} onChange={onChange} onClick={toggle} alpha prefixed />
      </div>

      {isOpen && (
        <div className="popover" ref={popover}>
          <RgbaStringColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
