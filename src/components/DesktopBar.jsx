import React from 'react'
import { useMessageContext } from '../context/message'
import BarIcon from './icons/BarIcon'
import ButtonDarkMode from './ButtonDarkMode'

export default function DesktopBar () {
  const { changeRoom } = useMessageContext()

  return (
    <nav className=' bg-secondary text-white min-w-[18rem] h-screen hidden md:flex flex-col'>
      <div className='basis-14 px-5 flex items-center justify-between'>
        <button>
          <BarIcon className='w-8 h-8' />
        </button>
        <ButtonDarkMode />
      </div>

      <div className='flex-1 px-5 flex flex-col gap-4 mt-5'>
        <button
          className='border-[1.5px] border-[#243154] w-full h-12 rounded-[9px] text-lg font-medium flex items-center pl-5 bg-secondary transition-colors hover:bg-black hover:border-transparent'
          onClick={() => {
            changeRoom('room1')
          }}
        >
          Room 1
        </button>
        <button
          className='border-[1.5px] border-[#243154] w-full h-12 rounded-[9px] text-lg font-medium flex items-center pl-5 bg-secondary transition-colors hover:bg-black hover:border-transparent'
          onClick={() => {
            changeRoom('room2')
          }}
        >
          Room 2
        </button>

      </div>

    </nav>
  )
}
