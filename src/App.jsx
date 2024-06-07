import './App.css'
import ViewChat from './components/ViewChat'
import InputMessage from './components/InputMessage'
import MenuIcon from './components/icons/MenuIcon'
import { useState, useRef, useEffect } from 'react'
import Profile from './components/Profile'
import DesktopBar from './components/DesktopBar'

export default function App () {
  const [isHiddenMenu, setIsHiddenMenu] = useState(true)
  const navBarRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navBarRef.current !== null &&
        !navBarRef.current.contains(event.target)
      ) {
        setIsHiddenMenu(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCLickMenu = () => {
    setIsHiddenMenu(prev => !prev)
  }

  return (
    <div className='h-screen w-screen bg-primary flex relative'>

      <DesktopBar />

      <nav ref={navBarRef} className={`${isHiddenMenu ? '-left-full' : 'left-0'} md:hidden z-10 transition-all absolute bg-primary text-white w-[20rem] h-screen`} />

      <main className={`${isHiddenMenu ? '' : 'brightness-50 md:brightness-100'} transition duration-1000 flex-1 h-screen flex items-center `}>
        <Profile />

        <section className='md:h-[95vh] md:w-full flex flex-col md:rounded-2xl  '>

          {/* <div className=' flex flex-col md:h-[95vh] md:w-[50rem]  '> */}
          <div className='bg-black w-full h-[4rem] text-white md:hidden flex items-center '>
            <div className='h-full w-[4rem]'>
              <button
                onClick={handleCLickMenu}
                className='w-full h-full grid place-content-center'
              >
                <MenuIcon className='w-7 h-7' />
              </button>
            </div>
            <div className='flex-1 font-bold text-xl'>
              Room
            </div>
            <div className='basis-14'>
              :
            </div>
          </div>
          <ViewChat />

          <div className='py-6 w-full flex justify-center'>
            <div className='xl:w-[50rem] lg:w-[45rem] w-full'>
              <InputMessage />
            </div>
          </div>

          {/* </div> */}
        </section>

      </main>
    </div>
  )
}
