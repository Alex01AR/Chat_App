import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice.js';
import { BASE_URL } from '../main.jsx';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user`);
                // store
            
                console.log("resData",res.data.data);
                dispatch(setOtherUsers(res.data.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])
  
}

export default useGetOtherUsers