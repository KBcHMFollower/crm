import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IWorker } from "../interfaces";
import { useAppSelector } from "../../hooks/redux";

const LOGIN_URL = 'http://localhost:3000/workers'

export const fetchLogIn = createAsyncThunk('user/fetchLogin',
  async ({ login, pass }: { login: string; pass: string }, thunkAPI) => {
    try {
      const response = await axios.get<IWorker[]>(`${LOGIN_URL}?login=${login}&pass=${pass}`);
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