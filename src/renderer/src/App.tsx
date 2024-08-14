import { useCallback, useState } from 'react'
import llamaChatIpc from './Ipc/IpcApi'
import InputPrompt from './components/InputPrompt/InputPrompt'
import MessageHistoryItem, {
  IMessageHistoryItem
} from './components/MessageHistory/MessageHistoryItem'
import MessageHistory from './components/MessageHistory/MessageHistory'
import { v4 } from 'uuid'
import { Authors } from './models/Authors'

function App(): React.ReactElement {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([] as IMessageHistoryItem[])
  const [loading, setLoading] = useState(false)

  const prompt = useCallback(async (currentMessage: string) => {
    const response = await llamaChatIpc.prompt(currentMessage)
    //for ui debug
    // await new Promise<string>(r => setTimeout(() => r(currentMessage + " | Response"), 2000))
    setMessages((prevMessages) => [...prevMessages, { message: response, author: Authors.Llm }])
    setLoading(false)
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLButtonElement>) => {
      if (message !== '' && message !== ' ') {
        event.preventDefault()
        setLoading(true)
        const currentMessage = message
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: currentMessage, author: Authors.Human }
        ])
        setMessage('')
        prompt(currentMessage)
      }
    },
    [message]
  )

  return (
    <div className="app-container">
      <MessageHistory>
        {messages.map((item) => (
          <MessageHistoryItem author={item.author} key={v4()}>
            {item.message}
          </MessageHistoryItem>
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
