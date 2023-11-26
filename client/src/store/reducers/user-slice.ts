import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWorker } from "../../api/interfaces";
import { fetchLogIn } from "../../api/thunks/userThunks";


type InitialType = {
    workerInfo:IWorker;
    isAuth:boolean;
    isLoading:boolean;
}

const initialState:InitialType = {
    workerInfo: {
        id: -1,
        fname: '',
        lanme: '',
        birthday: '',
        phone: '',
        email: '',
        role: '',
        ratetype: '',
        rate: 0,
        login:'',
        pass:''
    },
    isAuth: false,
    isLoading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserRole: (state, action: PayloadAction<string>) => {
            state.workerInfo.role = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogIn.fulfilled, (state, action: PayloadAction<IWorker[]>) => {
                state.workerInfo = action.payload[0];
                state.isAuth = true;
                state.isLoading = false;
                console.log('full');
            })
            .addCase(fetchLogIn.pending, (state) => {
                state.isLoading = true;
                console.log('pen');
            })
            .addCase(fetchLogIn.rejected, (state) => {
                state.isLoading = false;
                console.log('rej');
            })
    }
})

export const { setUserRole } = userSlice.actions;
export default userSlice.reducer;