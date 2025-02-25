import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../main';
import { toast } from 'react-hot-toast';
import axios from "axios"

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        console.log(res.data.data);
        console.log(res.data.message);
        console.log(res.data.statusCode);
      }
    } catch (error) {
      toast.error(error?.data);
      console.log(error);
    }
    console.log(user);
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }

  return (
    <div className="min-w-96 mx-auto">
      <div className=' p-6  shadow-lg h-full w-full rounded-lg border-2'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler} action='' >
          <div className='my-3'>
            <label className='label p-1'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full rounded-lg p-1  border-2 h-8 '
              type="text"
              placeholder='Bat Man' />
          </div>
          <div>
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
          <div>
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
            <label className='label p-1'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full rounded-lg p-1  border-2 h-8'
              type="password"
              placeholder='Confirm Password'
              autoComplete='new-password'
               />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
              
                className="checkbox checkbox-success mx-2 " />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                
                className="checkbox checkbox-success  mx-2" />
            </div>
          </div>

          <div>
            <button type='submit' className='w-full rounded-lg p-1 mt-5 border-2'>Singup</button>
          </div>
          <p className='text-left my-2'>Already have an account? <Link className='text-blue-500 pl-1' to="/login"> Login </Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp