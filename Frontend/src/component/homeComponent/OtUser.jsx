import React from 'react'
import OtherUser from './OtherUser'
import { setSelectedUser } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const OtUsers = ({ user }) => {
    // console.log("user otuser",user);

    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);

    const isOnline = onlineUsers?.includes(user._id);

    // const isOnline = onlineUsers?.includes(user._id);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    return (
        <div>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-black-200 text-white' : 'text-zinc-200'} flex gap-2 hover:scale-110 items-center hover:text-zinc-200 rounded p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className=' flex justify-between gap-2'>
                        <p className="flex flex-col flex-1">{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </div>
    )
}

export default OtUsers