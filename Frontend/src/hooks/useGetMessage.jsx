import React, { useEffect } from 'react'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import { BASE_URL } from '../main';
import { setMessages } from '../redux/messageSlice';



const useGetMessages = () => {
    const {SelectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/message/${SelectedUser?._id}`);
                console.log(res.data);
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [SelectedUser?._id]
    )
}

export default useGetMessages