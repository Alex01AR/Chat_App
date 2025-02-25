import { useEffect, useMemo, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './component/auth/SignUp.jsx'
import Home from './page/Home.jsx'
import Login from './component/auth/Login.jsx'
import { BASE_URL } from './main.jsx'
import { useDispatch, useSelector } from 'react-redux'
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice.js'
import { setOnlineUsers } from './redux/userSlice.js'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, {
    path: "/signup",
    element: <SignUp />
  }, {
    path: "/login",
    element: <Login />
  }
])


function App() {
  const [socketstore, setSocketstore] = useState(null)
  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);

  const dispatch = useDispatch()
  // useEffect(() => {
  //   if (authUser) {
  //     const socket = io("http://localhost:3000");

  //     // Listen for messages from the server
  //     socket.on('welcome', (message) => {
  //       console.log(message); // "Hello from the backend!"
  //     });

  //     // Send a message to the server
  //     socket.emit('message', 'Hello from the frontend!');

  //     // Listen for server responses
  //     socket.on('response', (data) => {
  //       console.log(data); // "Message received!"
  //     });

  //     // Clean up on component unmount
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // }, [authUser]);




  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userID: authUser._id
        }
      });

      // Listen for messages from the server
      socket.on('welcome', (message) => {
        console.log(message); // "Hello from the backend!"
      });
      console.log(socket);
      dispatch(setSocket(socket))

      socket.on('getOnlineUsers', (data) => {
        console.log(data); // "Message received!"
        dispatch(setOnlineUsers(data));
      });

      // Send a message to the server
      socket.emit('message', 'Hello from the frontend!');

      // Listen for server responses
      socket.on('response', (data) => {
        console.log(data); // "Message received!"
      });

      // Clean up on component unmount
      return () => {
        socket.disconnect();
      };
    }
    else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }

    }

  }, [authUser]);



  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>



  )
}

export default App
