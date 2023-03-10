import React, {FC} from 'react';

interface IButton {
  view: 'primary' | 'secondary';
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit'
}

const Button: FC<IButton> = props => {
  const {onClick, view, text, disabled, type} = props;

  return (
    <button
      type={type ?? 'button'}
      disabled={disabled}
      onClick={onClick}
      className={`h-[40px] text-white min-w-[100px] w-fit px-2 shadow-md rounded-3xl
      ${disabled ? 'disabled:bg-gray-200 disabled:cursor-not-allowed' : ''}
      ${view === "primary"
        ? 'bg-blue-700 hover:bg-blue-600 active:bg-blue-400'
        : 'bg-gray-400 hover:bg-gray-500 active:bg-gray-700'}`}
    >
      {text}
    </button>
  );
};

export default Button;
