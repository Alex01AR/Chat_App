import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        OtherUsers:null,
        SelectedUser:null,
        onlineUsers:null,

    },
    reducers:{
        setauthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.OtherUsers = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.SelectedUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }
    }

});
export const {setauthUser,setOtherUsers,setSelectedUser,setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;