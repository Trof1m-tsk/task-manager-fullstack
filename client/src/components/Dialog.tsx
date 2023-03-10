import React, {FC, ReactNode} from 'react';

interface IDialog {
  onClose: () => void
}

const Dialog: FC<IDialog> = ({ onClose }) => {
  return (
    <div
      className='absolute top-0 left-0 w-screen h-screen bg-[#00000050]'
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className='absolute z-10 top-[50%] left-[50%] bg-white translate-y-[-50%] opacity-100
        translate-x-[-50%] min-w-[150px] min-h-[150px] bg-cyan-400 shadow-2xl rounded-2xl p-4'>
      </div>
    </div>
  );
};

export default Dialog;
