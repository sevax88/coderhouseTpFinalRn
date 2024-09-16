import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedAddressId: null,
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setSelectedAddressId(state, action) {
            state.selectedAddressId = action.payload;
        },
        clearSelectedAddressId(state) {
            state.selectedAddressId = null;
        },
    },
});

export const { setSelectedAddressId, clearSelectedAddressId } = addressSlice.actions;
export default addressSlice.reducer;