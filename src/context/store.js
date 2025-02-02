import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Create slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const { fetchStart, fetchSuccess, fetchError } = dataSlice.actions;

// Async function to fetch data
export const fetchData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1/todos");
    const result = await response.json();
    dispatch(fetchSuccess(result));
    
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

// Configure store
const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
