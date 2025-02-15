import { useState } from "react";

interface SearchInputProps {
  label?: string;
  onValueChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  label,
  onValueChange,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setInputValue(value);
    onValueChange(value);
  };

  return (
    <div className="max-w-md">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="py-1 block w-full ps-10 text-sm text-gray-900 border border-gray-300 
          rounded-lg bg-gray-50 focus:ring-gray-400 focus:border-gray-400 "
          placeholder="Search items..."
          value={inputValue}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
};
