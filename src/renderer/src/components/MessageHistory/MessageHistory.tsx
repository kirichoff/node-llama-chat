import * as React from 'react';

export default function MessageHistory ( { children }  ): React.ReactElement {
  return (
      <ul>
        { children }
      </ul>
  );
}
