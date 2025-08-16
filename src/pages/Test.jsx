import React, { useRef } from "react";

function Text() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // focus vào ô input
  };

  return (
    <div>
      <h1>useRef với DOM</h1>
      <input ref={inputRef} type="text" placeholder="Nhập gì đó..." />
      <button onClick={focusInput}>Focus vào ô input</button>
    </div>
  );
}

export default Text;
