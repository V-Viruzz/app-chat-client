import { useEffect, useRef, useState } from 'react'
import CloseIcon from './icons/CloseIcon'

export default function Setting ({ isHiddenSetting, setIsHiddenSetting }) {
  const settingRef = useRef()
  const [profilePictureUrl, setProfilePictureUrl] = useState()
  const [username, setUsername] = useState('')

  const handleClickClose = () => {
    setIsHiddenSetting(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    window.localStorage.setItem('username', username)
  }

  const uploadImage = (file) => {
    const url = 'https://api.cloudinary.com/v1_1/dq67fmyzz/image/upload'
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'profiles')

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        console.log('🚀 ~ .then ~ response:', response)
      })
  }

  const handleChangePicture = (event) => {
    const file = event.target.files[0]
    console.log('🚀 ~ handleChangePicture ~ file:', file)

    uploadImage(file)
    // if (file) {
    //   const reader = new window.FileReader()
    //   reader.onloadend = () => {
    //     const base64String = reader.result.split(',')[1] // Obteniendo la parte base64 de la imagen
    //     window.localStorage.setItem('profilePicture', base64String)
    //     setProfilePictureUrl(reader.result)
    //   }
    //   reader.readAsDataURL(file)
    // }
  }

  const handleChangeUsename = (event) => {
    const newName = event.target.value
    setUsername(newName)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingRef.current !== null &&
        !settingRef.current.contains(event.target)
      ) {
        setIsHiddenSetting((true))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const profileUrl = window.localStorage.getItem('profilePicture')
    const name = window.localStorage.getItem('username')
    if (profileUrl) {
      const base64String = profileUrl
      const imageUrl = `data:image/png;base64,${base64String}`
      setProfilePictureUrl(imageUrl)
    }
    if (name) {
      setUsername(name)
    }
  }, [])

  return (
    <section className={`${isHiddenSetting ? 'hidden' : 'grid'}  place-content-center absolute w-screen h-screen bg-[#00000094] top-0 left-0 z-20`}>
      <div ref={settingRef} className='w-96 h-72 bg-primary rounded-xl flex flex-col divide-y divide-[#202d4b] text-white font-medium'>
        <div className='basis-14 flex items-center px-6 justify-between'>
          <h3>Setting</h3>
          <button
            className=''
            onClick={handleClickClose}
          >
            <CloseIcon className='w-4 h-4' />
          </button>
        </div>
        <div className='flex-1 flex flex-col  items-center pt-8'>
          <form
            className='flex flex-col gap-5 items-center'
            onSubmit={handleSubmit}
          >
            <label
              htmlFor='upload-profile-picture'
              onClick={null}
            >
              <input
                className='hidden'
                type='file'
                name='profile'
                id='upload-profile-picture'
                onChange={handleChangePicture}
              />
              <img
                className='w-24 h-24 bg-black rounded-full'
                src={profilePictureUrl}
                alt='Profile'
              />
            </label>
            <input
              onChange={handleChangeUsename}
              className='bg-transparent text-center text-[#ffffffb1] focus-visible:outline-0 focus-visible:border-b w-20'
              type='text'
              value={username}
            />
          </form>
        </div>
      </div>
    </section>
  )
}
