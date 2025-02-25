import React from 'react'
import Singlemessage from './Singlemessage'

import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../../hooks/useGetRealTimeMessage';
import useGetMessages from '../../hooks/useGetMessage';

const Message = () => {
    useGetRealTimeMessage();
    useGetMessages();
    // useGet
    const { messages } = useSelector(store => store.message);
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
                messages && messages?.map((message) => {
                    return (
                        <Singlemessage
                            key={message?._id} message={message} />
                    )
                })
            }

        </div>

    )
}

export default Message