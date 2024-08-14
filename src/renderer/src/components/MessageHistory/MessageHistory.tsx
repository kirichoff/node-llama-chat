import * as React from 'react';
import './MessageHistory.css'

export default function MessageHistory ( { children }  ): React.ReactElement {
  return (
      <ul>
        { children }
      </ul>
  );
}
