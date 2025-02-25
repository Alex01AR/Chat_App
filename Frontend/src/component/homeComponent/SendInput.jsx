import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../redux/messageSlice';
import { BASE_URL } from '../../main';
import axios from 'axios';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { SelectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        console.log(message);
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${SelectedUser?._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res.data.data.message);
            dispatch(setMessages([...messages, res?.data?.data]))
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    }
    return (
        <form onSubmit={onSubmitHandler} className='px-4 p-3 bg-black'>
            <div className='w-full relative '>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-200  text-white'
                />
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput