import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IWorker } from "../interfaces";
import { useAppSelector } from "../../hooks/redux";
import { $host } from "../api";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../models/user-model";


export interface ApiError{
  status:number;
  message:string;
}

export const fetchLogIn = createAsyncThunk('user/fetchLogin',
  async ({ login, pass }: { login: string; pass: string }, thunkAPI)=> {
    try {
      const response = await $host.post<{token:string}>('api/workers/login',{login: login, pass: pass});
      return response.data;
    } catch (error) {
      const axiosError =  error as AxiosError<ApiError>
      return thunkAPI.rejectWithValue(axiosError.response?.data.message)
    }
  })

  export const fetchCheckAuth = createAsyncThunk('user/fetchAuth',
  async (thunkAPI)=> {
    try {
      const response = await $host.get<{token:string}>('api/workers/auth');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  })

// export const fetchRights = createAsyncThunk('user/fetchRights', async ({id}:{id:number}, thunkAPI)=>{
//     try {
//         const response = await axios.get<IWorker>(`${LOGIN_URL}?id=${id}`);
//         return response.data;
//       } catch (error) {
//         throw new Error('Failed to fetch data');
//       }
// })