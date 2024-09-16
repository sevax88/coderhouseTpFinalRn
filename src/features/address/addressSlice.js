import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedAddressId: null,
    selectedAddressString: ""
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setSelectedAddressId(state, action) {
            state.selectedAddressId = action.payload;
        },
        setSelectedAddressString(state, action) {
            state.selectedAddressString= action.payload;
        },
        clearSelectedAddressId(state) {
            state.selectedAddressId = null;
        },
    },
});

export const { setSelectedAddressId, setSelectedAddressString, clearSelectedAddressId } = addressSlice.actions;
export default addressSlice.reducer;