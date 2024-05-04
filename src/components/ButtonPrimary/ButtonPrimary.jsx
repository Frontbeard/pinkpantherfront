import React from 'react';

const ButtonPrimary = ({ onClick, title, disabled }) => {
  return (
    <button
      className={`py-2 px-4 bg-blue-500 text-white rounded-md ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
      }`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ButtonPrimary;
