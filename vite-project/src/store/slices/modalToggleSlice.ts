import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ModalToggle {
    modalState: Boolean
};

const initialState: ModalToggle = {
    modalState: false
};

const modalToggleSlice = createSlice({
    name: 'modalToggle',
    initialState,
    reducers: {
        setModalState(state, action: PayloadAction<boolean>) {
            state.modalState = action.payload;
        }
    },

});

export const { setModalState } = modalToggleSlice.actions;
export default modalToggleSlice.reducer;