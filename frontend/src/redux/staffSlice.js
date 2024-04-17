import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example asynchronous thunk to handle login
export const addStaff = createAsyncThunk(
  "staff/add",
  async (values, thunkAPI) => {
    try {
      // Your asynchronous logic to add student here
      const response = await fetch("/api/v1/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to get students
export const getStaff = createAsyncThunk(
  "staff/getStaff",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/v1/staff");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getStaffById = createAsyncThunk(
  "staff/getMember",
  async (staffId, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/staff/${staffId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to delete student
export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (staffId, thunkAPI) => {
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(`/api/v1/staff/${staffId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log(data);
      return { staffId: staffId, message: data.message };
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to update student
export const updateStaff = createAsyncThunk(
  "student/updateStaff",
  async ({ staffId, updatedData }, thunkAPI) => {
    try {
      // Your asynchronous logic to update student here
      const response = await fetch(`/api/v1/staff/${staffId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const setAbsent = createAsyncThunk(
  "student/setAbsent",
  async ({ staff_id, attendance, typeCase }) => {
    try {
      const requestBody = {
        staff_id,
        attendance,
        typeCase,
      };

      const response = await fetch("/api/v1/staff/attendance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();

        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const setPresent = createAsyncThunk(
  "attendance/setPresent",
  async ({ staff_id, attendance, typeCase }, thunkAPI) => {
    const requestBody = {
      staff_id,
      attendance,
      typeCase,
    };
    try {
      const response = await fetch("/api/v1/staff/present", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const getEntries = createAsyncThunk(
  "student/Absensts",
  async (_, thunkAPI) => {
    console.log("HII");
    try {
      const response = await fetch(`/api/v1/staff/entries`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  staff: null,
  loading: false,
  error: null,
  message: null,
  member: null,
  absents: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    // Define any synchronous actions here if needed
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.staff = action.payload.staff;
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getStaffById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.member = action.payload.staff;
      })
      .addCase(getStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        // Remove deleted student from the state
        state.staff = state.staff.filter(
          (staf) => staf.staff_id !== action.payload.staffId
        );
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.absents = action.payload.absents;
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(setAbsent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setAbsent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(setAbsent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(setPresent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(setPresent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(setPresent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessage } = staffSlice.actions;

export default staffSlice.reducer;
