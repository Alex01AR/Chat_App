import React from 'react'
import OtUsers from './OtUser'
import useGetOtherUsers from '../../hooks/useGetOtherUsers.jsx'
import { useSelector } from 'react-redux';

const OtherUser = () => {

  useGetOtherUsers();

  const { OtherUsers } = useSelector(store => store.user);
  if (!OtherUsers) return;
  return (
    <div className='overflow-auto flex-1 '>
      {
        OtherUsers?.map((user) => {
          return (
            <OtUsers key={user._id} user={user} />
          )
        })
      }






    </div>
  )
}

export default OtherUser