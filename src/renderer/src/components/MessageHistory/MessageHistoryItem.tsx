import * as React from 'react'
import { Authors } from '../../models/Authors'

const authorsClassMap = { [Authors.Human]: 'human-li', [Authors.Llm]: 'llm-li' }
export interface IMessageHistoryItem {
  message: string
  author: Authors
}

type MessageHistoryItemProps = {
  author: Authors
} & React.PropsWithChildren<{}>

export default function MessageHistoryItem({
  children,
  author
}: MessageHistoryItemProps): React.ReactElement {
  return (
    <li className={authorsClassMap[author]}>
      <div>{children}</div>
    </li>
  )
}
