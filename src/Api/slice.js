import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

// First, create the thunk
export const fetchRestaurants = createAsyncThunk(
  "users/fetchRestaurants",
  async () => {
    try {
      // const response = await axios.get("http://localhost:3000/restaurants");
      // console.log(response)
      // return response.data;

      // Work with the response...
    } catch (err) {
      // console.log(err);
    }
  }
);

const initialState = {
  status: "pending",
  restaurants: [],
};

// Then, handle actions in your reducers:
const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "success";
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.pending, (state) => {
        // Add user to the state array
        state.status = "pending";
      })
      .addCase(fetchRestaurants.rejected, (state) => {
        // Add user to the state array
        state.status = "failed";
      });
  },
});
export const restaurants = (state) => state.restaurants.restaurants;
export const status = (state) => state.restaurants.status;

export default restaurantsSlice.reducer;

// Later, dispatch the thunk as needed in the app
