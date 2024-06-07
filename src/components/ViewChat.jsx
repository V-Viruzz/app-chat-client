import profileNone from '../assets/profileNone.png'
import { useMessageContext } from '../context/message'

export default function ViewChat () {
  const { messages } = useMessageContext()

  return (
    <section className='view-chat w-full h-full items-center text-white flex flex-col-reverse overflow-y-auto'>
      <div className='max-w-[50rem] xl:w-[50rem] lg:w-[45rem] w-full grow flex flex-col justify-end'>
        {
          messages.slice().map(({ message, username, avatarUrl }, index) => (
            <Message key={index} user={username} text={message} avatar={avatarUrl} />
          ))
        }
      </div>
    </section>
  )
}

// export default function ViewChat () {
//   const { messages } = useMessageContext()

//   return (
//     <section className='view-chat w-full h-[95vh] items-center text-white flex flex-col overflow-y-auto'>
//       <div className='max-w-[50rem] xl:w-[50rem] lg:w-[45rem] w-full grow flex flex-col-reverse'>
//         {
//           messages.slice().reverse().map(({ message, username, avatarUrl }, index) => (
//             <Message key={index} user={username} text={message} avatar={avatarUrl} />
//           ))
//         }
//       </div>
//     </section>
//   )
// }

function Message ({ user, text, avatar }) {
  return (
    <div className='w-full border-green-500 min-h-[8rem]'>
      <div className='mx-6 py-5'>
        <div className='flex gap-3 items-center'>
          <img
            className='w-10 h-10 rounded-full bg-[#ffffffaf]'
            src={avatar || profileNone}
            alt={user}
          />
          <div className='text-gray-400 font-bold'>
            {user}
          </div>
        </div>

        <div>
          <p className='break-words pt-1 pl-[50px]'>
            {text}
          </p>
        </div>

      </div>
    </div>
  )
}
