import React from 'react';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({ onClose, children }: ModalProps) {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white rounded-lg shadow-lg p-8 relative max-w-4xl w-full'>
                <button
                    onClick={onClose}
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl'
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}
