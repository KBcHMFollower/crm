import { createSlice} from "@reduxjs/toolkit";
import {  fetchCheckAuth, fetchLogIn } from "../../api/thunks/userThunks";
import { ITokenUser } from "../../api/models/user-model";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const resWithToken = (token: string, state: any) =>{
    localStorage.setItem('token', `Bearer ${token}`)
    const user:ITokenUser = jwtDecode(token);
    state.user = user;
    state.isLoading = false;
    state.isAuth = true;
    state.error = '';
}

type InitialType = {
    user:{
        id:number,
        role:string,
        email: string,
        rights:string[]
    },
    isAuth:boolean;
    isLoading:boolean;
    error:string;
}

const initialState:InitialType = {
    user: {
        id:-1,
        role:'',
        email: '',
        rights:[]
    },
    isAuth: false,
    isLoading: false,
    error:''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            localStorage.clear()
            state.user.id = -1;
            state.user.role = '';
            state.user.email = '';
            state.user.rights = [];
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogIn.fulfilled, (state, action) => {
                resWithToken(action.payload.token, state);
            })
            .addCase(fetchLogIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLogIn.rejected, (state, action) => {
                console.log(action.payload);
                state.isAuth = false;
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCheckAuth.fulfilled, (state, action) => {
                resWithToken(action.payload.token, state);
            })
            .addCase(fetchCheckAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCheckAuth.rejected, (state) => {
                state.isAuth = false;
                state.isLoading = false;
            })
    }
})

export const { logOut } = userSlice.actions;
export default userSlice.reducer;