import React ,{ useEffect, useRef } from 'react';
import './InputPrompt.css';
import arrowTop from  '../../assets/arrow-top.svg'

export interface IInputPrompt {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
}

export default function InputPrompt({ value, onChange, onSubmit, disable }: IInputPrompt): React.ReactElement {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      if(textareaRef.current.value.length < 200){
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        textareaRef.current.style.overflow = "hidden"
      }
      else{
        textareaRef.current.style.overflow = "overlay"
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]); // Adjust height whenever the value changes

  return (
    <div className="input-prompt">
      <textarea
        ref={textareaRef}
        className="input-textarea"
        disabled={disable}
        value={value}
        onChange={(e) => {
          onChange && onChange(e);
          adjustTextareaHeight();
        }}
        placeholder="Message ChatGPT"
        rows={1}
      />
      <button className="input-submit" disabled={disable} onClick={onSubmit}>
        <img className="arrow" src={ arrowTop } />
        <span className="loading-spinner"></span>
      </button>
    </div>
  );
}
