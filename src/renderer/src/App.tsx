import { useCallback, useState } from 'react'
import llamaChatIpc from './Ipc/IpcApi'
import InputPrompt from './components/InputPrompt/InputPrompt'
import MessageHistoryItem from './components/MessageHistory/MessageHistoryItem'
import MessageHistory from './components/MessageHistory/MessageHistory'

export enum Authors {
  Llm,
  Human
}

export interface IMessageHistoryItem {
  message: string
  author: Authors
}

function App(): JSX.Element {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([] as IMessageHistoryItem[])
  const [loading, setLoading] = useState(false)

  const prompt = useCallback(async (currentMessage: string) => {
    const response = await llamaChatIpc.prompt(currentMessage)
    setMessages((prevMessages) => [...prevMessages, { message: response, author: Authors.Llm }])
    setLoading(false)
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setLoading(true)
      const currentMessage = message
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: currentMessage, author: Authors.Human }
      ])
      setMessage('')
      prompt(currentMessage)
    },
    [message]
  )

  return (
    <div className='app-container'>
      <MessageHistory>
        {messages.map((item) => (
          <MessageHistoryItem>{item.message}</MessageHistoryItem>
        ))}
      </MessageHistory>
      <InputPrompt
        disable={loading}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default App
