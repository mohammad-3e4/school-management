// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getListOfNotice = createAsyncThunk(
  "notice/getListOfNotice",
  async (_, thunkAPI) => {

    try {
      const response = await fetch(`/api/v1/noticeboard`);

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message);
      }

      const data = await response.json();
   
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteNoticeById = createAsyncThunk(
  "notice/deleteNotice",
  async (id, thunkAPI) => {

    try {
      const response = await fetch(`/api/v1/noticeboard/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error);
      }
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addNotice = createAsyncThunk(
  "notice/addNotice",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/noticeboard`, {
        method: "POST",
        body: formData, // Send the FormData object directly
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error);
      }
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



const initialState = {
  notices: null,
  loading: false,
  error: null,
  message: null,
};

const noticeSlice = createSlice({
  name: "noticeboard",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListOfNotice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListOfNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notices = action.payload.notice;
      })
      .addCase(getListOfNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(addNotice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteNoticeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNoticeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteNoticeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
   
    
  },
});

export const { clearErrors, clearMessages } = noticeSlice.actions;
export default noticeSlice.reducer;
