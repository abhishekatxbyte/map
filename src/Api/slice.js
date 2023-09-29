import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

// First, create the thunk

const initialState = {
  status: "pending",
  masterMarker: true,
  neighBourMarker: false,
  currentMarker: null,
  showInfoWindow: true,
  activeMarker: null,
  selectedRadius: [],
  activeCircle: null,
  activeArea: ''
};

// Then, handle actions in your reducers:
const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    TOGGLE_MASTER(state, action) {
      state.masterMarker = action.payload
    },
    TOGGLE_NEIGHBOUR(state, action) {
      state.neighBourMarker = action.payload
    },
    TOGGLE_SHOWINFO(state, action) {
      state.showInfoWindow = action.payload
    },
    SET_CURRENT_MARKER(state, action) {
      state.currentMarker = action.payload
    },
    SET_ACTIVE_MARKER(state, action) {
      state.activeMarker = action.payload
    },
    SET_SELECTED_RADIUS(state, action) {
      state.selectedRadius = action.payload
    },
    SET_ACTIVE_AREA(state, action) {
      state.activeArea = action.payload
    },


    // standard reducer logic, with auto-generated action types per reducer
  },

});
export const { TOGGLE_MASTER, TOGGLE_NEIGHBOUR, SET_CURRENT_MARKER, TOGGLE_SHOWINFO, SET_ACTIVE_MARKER, SET_SELECTED_RADIUS, SET_ACTIVE_AREA } = restaurantsSlice.actions
export default restaurantsSlice.reducer;

// Later, dispatch the thunk as needed in the app
