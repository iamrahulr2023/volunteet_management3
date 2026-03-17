import { useState } from 'react';
import { SKILLS } from '../data/mockData';

export default function MultiSelect({ selected = [], onChange, options = SKILLS, placeholder = 'Select skills...' }) {
  const [open, setOpen] = useState(false);

  const toggle = (skill) => {
    if (selected.includes(skill)) {
      onChange(selected.filter(s => s !== skill));
    } else {
      onChange([...selected, skill]);
    }
  };

  return (
    <div className="relative">
      <div
        className="input-field cursor-pointer min-h-[48px] flex flex-wrap gap-2 items-center"
        onClick={() => setOpen(!open)}
      >
        {selected.length === 0 && <span className="text-gray-400">{placeholder}</span>}
        {selected.map(skill => (
          <span key={skill} className="badge-blue text-xs flex items-center gap-1">
            {skill}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggle(skill); }}
              className="ml-1 hover:text-primary-900"
            >×</button>
          </span>
        ))}
      </div>
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-lg max-h-52 overflow-y-auto animate-fade-in">
          {options.map(option => (
            <label key={option} className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
                className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-300"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
