import * as React from 'react';
import './InputPrompt.css'


export interface IInputPrompt {
  value: string;
  onChange?: (e:React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
}

export default function InputPrompt ({value, onChange, onSubmit, disable}:IInputPrompt): React.ReactElement {
  return (
    <>
      <textarea disabled={disable} value={value} onChange={onChange} />
      <button disabled={disable} onClick={onSubmit}>send</button>
    </>
  );
}
