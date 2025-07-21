import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TodoUserDTO {
    email: string;
    id: string;
    password: string;
    username: string;
    profilePicture: any;
};

const initialState: TodoUserDTO = {
  email: '',
  id: '',
  password: '',
  username: '',
  profilePicture:''
};

const userDTOSlice = createSlice({
    name: 'userDTO',
    initialState,
    reducers: {
        editDTO(state, action: PayloadAction<Partial<TodoUserDTO>>) {
        Object.assign(state, action.payload);
        },
        reset() { // 초기상태로 리셋할때 사용
            return initialState;
        }
    },

});

export const { editDTO, reset } = userDTOSlice.actions;
export default userDTOSlice.reducer;