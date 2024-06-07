import { useRef, useState } from 'react'
import SendIcon from './icons/SendIcon'
import useSocket from '../hooks/useSocket'

export default function InputMessage () {
  const messageRef = useRef()
  const { sendMessage } = useSocket()
  const [textAreaHeight, setTextAreaHeight] = useState(55)

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = messageRef.current.value
    const isEmpty = message.split('').every(l => l === '\n')

    if (message === '' || isEmpty) return

    sendMessage(message)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }

    if (event.key === 'Enter' && event.shiftKey) {
      setTextAreaHeight(textAreaHeight + 23)
    }

    if (event.key === 'Backspace') {
      setTimeout(() => {
        const isBarN = messageRef.current.value.includes('\n')
        if (!isBarN) {
          setTextAreaHeight(55)
        }
      }, 100)

      const textBeforeCursor = messageRef.current.value.substring(0, messageRef.current.selectionStart)

      if (textBeforeCursor.endsWith('\n') && textAreaHeight > 55) {
        setTextAreaHeight(textAreaHeight - 23)
      }
    }
  }

  return (
    <form
      className='flex mx-6 gap-3'
      onSubmit={handleSubmit}
    >
      <textarea
        className='px-5 pt-[15px] w-full text-base max-h-[15rem] rounded-lg focus-visible:outline-gray-700 disabled:opacity-50 dark:bg-secondary dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 focus-visible:outline-offset-0 focus-visible:outline-1 focus-visible:outline-none resize-none '
        style={{ height: textAreaHeight }}
        onKeyDown={handleKeyDown}
        ref={messageRef}
        placeholder='This is a textarea placeholder'
      />

      <button type='submit' className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg  bg-white text-blue-600 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#1e40af8b] dark:text-white dark:hover:bg-neutral-800 '>
        <SendIcon className='w-[18px] h-[18px]' />
      </button>
    </form>
  )
}
