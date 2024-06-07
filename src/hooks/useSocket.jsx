import { useEffect } from 'react'
import { useMessageContext } from '../context/message'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export default function useSocket () {
  const { receiveMessage, room } = useMessageContext()

  const sendMessage = (message) => {
    const username = window.localStorage.getItem('username')
    const newMessage = {
      username,
      message,
      room
    }

    socket.emit('roomId', newMessage)
  }

  useEffect(() => {
    const handleSocket = (resMesssage) => {
      console.log('🚀 ~ handleSocket ~ resMesssage:', resMesssage)
      const newMessage = {
        username: resMesssage.username,
        message: resMesssage.message
      }
      receiveMessage(newMessage)
    }

    socket.on(room, handleSocket)
    return () => {
      socket.off(room, handleSocket)
    }
  }, [room])

  return { sendMessage }
}
