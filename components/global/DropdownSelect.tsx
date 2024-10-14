import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface DropdownSelectProps {
  options: string[];
  value: string;
  setValue: (newValue: string) => void;
}

const DropdownSelect = ({ options, value, setValue }: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen((prev) => !prev);
  return (
    <div
      className="parentElement relative w-40"
      onBlur={(event) => {
        const element = event.relatedTarget?.parentNode?.parentNode;
        const currentElement = event.currentTarget;
        if (element === currentElement) return;
        handleIsOpen();
      }}
    >
      <button
        onClick={handleIsOpen}
        className="bg-white flex items-center w-full justify-between h-10 border-[0.5px] border-gray-300 font-semibold text-sm py-2 px-4 rounded-full"
      >
        <h3 className="pr-1">{value}</h3>
        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4 text-gray-700" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 text-gray-700" />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-11 w-full rounded-lg text-xs border">
          {options.map((option, index) => (
            <button
              onClick={() => {
                handleIsOpen();
                setValue(option);
              }}
              className="p-2 w-full bg-white hover:bg-orange-200 rounded-lg"
              key={index}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
