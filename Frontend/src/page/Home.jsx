import React from 'react'
import { Toaster } from 'react-hot-toast'

import SideBar from '../component/homeComponent/SideBar'
import MessageContainer from '../component/homeComponent/MessageContainer'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-2'>
      <SideBar />
      <MessageContainer />
    </div>
  )

}

export default Home