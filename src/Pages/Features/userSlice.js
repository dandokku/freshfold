import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    address: null,
    phoneNo: null,
    email: null,
    password: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.id = action.payload._id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.address = action.payload.address;
            state.phoneNo = action.payload.phoneNo;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setUserSignOut: (state) => {
            state.id = null;
            state.firstName = null;
            state.lastName = null;
            state.address = null;
            state.phoneNo = null;
            state.email = null;
            state.password = null;
        }
    }
})

export default userSlice.reducer;
export const { setUserLoginDetails, setUserSignOut } = userSlice.actions;
