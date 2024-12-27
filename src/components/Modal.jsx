import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

function Modal({ onClose, isOpen, children }) {
  return createPortal (
    <>
      {isOpen && (
        <>
          <div className="z-50 relative min-h-[200px] max-w-[80%] bg-white p-4 m-auto ">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
            </div>
            {children}
          </div>
          <div onClick={onClose} className="backdrop-blur h-screen w-screen top-0 absolute z-40" />
        </>
      )}
    </>
  ,document.getElementById("modal-root"));
}

export default Modal;
