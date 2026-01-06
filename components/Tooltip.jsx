// components/Tooltip.jsx
import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function Tooltip({ text }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-flex ml-2 align-middle z-20"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => {
        e.preventDefault(); 
        setIsVisible(!isVisible);
      }}
    >
      <HelpCircle 
        size={16} 
        className="text-gray-400 hover:text-accent-yellow cursor-help transition-colors duration-200" 
      />

      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 sm:w-56 px-3 py-2 bg-gray-800 text-white text-xs rounded-md shadow-lg pointer-events-none text-center leading-tight">
          {text}
          {/* Triangulito decorativo */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </span>
  );
}