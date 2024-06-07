import { useState, useContext, createContext } from 'react'

export const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
  const [room, setRoom] = useState('room1')
  const [messages, setMessages] = useState([
    {
      username: 'You',
      message: 'Necesito ayuda con algo'
    },
    {
      username: 'Miyuki',
      message: 'When customizing scrollbars, ensure that the thumb and track have enough contrast with the surrounding background. Also ensure that the scrollbar hit area is large enough for people who use touch input'
    },
    {
      username: 'Miyuki',
      message: 'Tengo hambre'
    },
    {
      username: 'You',
      message: 'Gordo deja de comer'
    }
  ])

  const changeRoom = (room) => {
    setRoom(room)
    setMessages([])
  }

  const receiveMessage = (msg) => {
    setMessages(prev => [...prev, msg])
  }

  return (
    <MessageContext.Provider value={{ messages, receiveMessage, room, changeRoom }}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageContext = () => useContext(MessageContext)
