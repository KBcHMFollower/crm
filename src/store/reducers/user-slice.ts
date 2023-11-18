import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { IWorker } from "../../api/interfaces";

const initialState:IWorker = {
    id:2,
    fname:'Vlad',
    lanme:'Melnikov',
    birthday:'13/13/13',
    phone:'567567',
    email:'vlad@gmail.com',
    role:'admin',
    ratetype:'hour',
    rate:0,
    login:'',
    pass:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserFname:(state, action:PayloadAction<string>)=>{
            state.fname = action.payload;
        },
        setUserRole:(state, action:PayloadAction<string>)=>{
            state.role = action.payload;
        },
        setUserLname:(state, action:PayloadAction<string>)=>{
            state.lanme = action.payload;
        },
        setUserBirthday:(state, action:PayloadAction<string>)=>{
            state.birthday = action.payload;
        },
        setUserPhone:(state, action:PayloadAction<string>)=>{
            state.phone = action.payload;
        },
        setUserEmail:(state, action:PayloadAction<string>)=>{
            state.email = action.payload;
        }
    }
})

export const {setUserBirthday, setUserEmail, setUserFname, setUserLname, setUserPhone, setUserRole} = userSlice.actions;
export default userSlice.reducer;