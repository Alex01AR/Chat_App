import React from 'react'
import SendInput from './SendInput'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';

const MessageContainer = () => {

    const { SelectedUser, authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    return (
        <>
            {
                SelectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col max-w-auto bg-zinc-500'>
                        <div className='flex gap-2 items-center  text-white px-4 py-2  border-b border-zinc-300'>
                            <div className={`avatar online`}>
                                <div className='w-12 rounded-full'>
                                    <img src={SelectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{SelectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Message />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                        <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
                        <h1 className='text-2xl text-white'>Let's start conversation</h1>

                    </div>
                )
            }
        </>
    )
}

export default MessageContainer