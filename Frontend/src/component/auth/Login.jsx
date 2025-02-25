import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setauthUser } from '../../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);

        console.log(res.data.data);
        // console.log(res.data.message);
        console.log(res.data.data);
        dispatch(setauthUser(res.data.data));
        navigate("/");


      }

    } catch (error) {
      toast.error(error);
      console.log(error);
    }
    // console.log(user);
    setUser({
      username: "",
      password: ""
    })
  }

  return (
    <div className="min-w-96 mx-auto">
      <div className=' p-6  shadow-lg h-full w-full rounded-lg border-2'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <form onSubmit={onSubmitHandler} action=''>

          <div className='my-3 mt-5'>
            <label className='label p-1'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full rounded-lg p-1  border-2 h-8'
              type="text"
              placeholder='batman'
              autoComplete='new-password'
            />
          </div>
          <div className='my-3'>
            <label className='label p-1'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full rounded-lg p-1  border-2 h-8'
              type="password"
              placeholder='Password'
              autoComplete='new-password'
            />
          </div>


          <div>
            <button type='submit' className='w-full rounded-lg p-1 mt-10 border-2'>Login</button>
          </div>
          <p className='text-left my-2'>Create an Account ?  <Link className='text-blue-500 pl-1' to="/signup"> Signup </Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login