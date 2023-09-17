import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorageData, getLocalStorageData, setLocalStorageData } from "../../utils/localStorgae";


const initialState = {
  userId: getLocalStorageData().userId,
  userName:getLocalStorageData().userName,
  userImage:getLocalStorageData().userImage,
  role:getLocalStorageData().role

};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setData: (state, action) => {
        console.log(action.payload);
  
        setLocalStorageData({
          userId: action.payload.userId,
          userName:action.payload.userName,
          userImage:action.payload.userImage,
          role:action.payload.role
        });
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        state.userImage = action.payload.userImage;
        state.role = action.payload.role

      },
  
      clearData: (state) => {
        clearLocalStorageData();
        state.userId = undefined;
        state.userName = undefined;
        state.userImage = undefined;
        state.role = undefined;
      },
    },
  });
  
  

// Action creators are generated for each case reducer function
export const { setData, clearData } =
  userSlice.actions;

export default userSlice.reducer;
