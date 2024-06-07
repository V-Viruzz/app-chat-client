import React, { useState } from 'react'
import SettingIcon from './icons/SettingIcon'
import Setting from './Setting'

export default function Profile () {
  const [isHiddenMenu, setIsHiddenMenu] = useState(true)
  const [isHiddenSetting, setIsHiddenSetting] = useState(true)

  const handleClickProfile = () => {
    setIsHiddenMenu(!isHiddenMenu)
  }
  const handleClickSetting = () => {
    setIsHiddenSetting(!isHiddenSetting)
  }

  return (
    <>
      <Setting setIsHiddenSetting={setIsHiddenSetting} isHiddenSetting={isHiddenSetting} />

      <div
        className='bg-white absolute right-5 top-5 rounded-full w-10 h-10 cursor-pointer'
        onClick={handleClickProfile}
      >
        <div className={`${isHiddenMenu ? 'hidden' : ' block'} w-48 p-3 rounded-lg absolute bg-secondary text-white right-0 top-12 shadow-xl`}>
          <button
            className='w-full flex items-center gap-2 px-3 py-3 hover:bg-primary rounded-lg'
            onClick={handleClickSetting}
          >
            <SettingIcon className='w-5 h-5' />
            setting
          </button>
        </div>

      </div>
    </>
  )
}
