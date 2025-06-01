import { useState } from 'react';

const items = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

export function SetExample() {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());

  const onChange = (value: string) => {
    setSelectedValues((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  return (
    <div
      className='rootBox'
      style={{
        maxWidth: 400,
      }}
    >
      <div className='box'>
        <h2>Basic</h2>
        <div>
          {items.map((value, index) => (
            <div key={index}>
              <label className='row'>
                <input
                  type='checkbox'
                  checked={selectedValues.has(value)}
                  onChange={() => onChange(value)}
                />
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
