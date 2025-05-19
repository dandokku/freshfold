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
            // Check if action.payload is defined
            if (action.payload) {
                state.id = action.payload._id || null;
                state.firstName = action.payload.firstName || null;
                state.lastName = action.payload.lastName || null;
                state.address = action.payload.address || null;
                state.phoneNo = action.payload.phoneNo || null;
                state.email = action.payload.email || null;
                state.password = action.payload.password || null;
            } else {
                console.log("Welp")
            }
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
});


export default userSlice.reducer;
export const { setUserLoginDetails, setUserSignOut } = userSlice.actions;
