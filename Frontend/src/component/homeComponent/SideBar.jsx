import React, { useState } from 'react'
import OtherUser from './OtherUser.jsx'
import { BiSearchAlt2 } from "react-icons/bi";
import axios from 'axios';
import { BASE_URL } from '../../main';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOtherUsers, setSelectedUser, setauthUser, setOnlineUsers } from '../../redux/userSlice.js';

const SideBar = () => {

    const [search, setSearch] = useState("");
    const { OtherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            // toast.success(res.data);
            console.log(res.data.data);
            dispatch(setauthUser(null));
            // dispatch(setMessages(null));
            dispatch(setOnlineUsers(null));
            dispatch(setSelectedUser(null));
            dispatch(setOtherUsers(null));

        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = OtherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            console.log("User not found!");
        }
    }


    return (
        <div className='border-r min-w-[300] border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className="flex items-center gap-2 rounded-lg border-2 w-full">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-2 ml-1 h-10  focus:outline-none" // Consistent height and border
                    type="text"
                    placeholder="Search..."
                />
                <button type="submit" className="btn bg-black text-white h-10 px-4 rounded-r-lg flex items-center justify-center border-2">
                    <BiSearchAlt2 className="w-6 h-6" />
                </button>
            </form>

            <div className="divider px-3"></div>
            <OtherUser />
            <div className='mt-2 rounded-lg items-center border-2 flex justify-center'>
                <button
                    onClick={logoutHandler}
                    className='p-1 '>Logout</button>
            </div>
        </div>
    )
}

export default SideBar