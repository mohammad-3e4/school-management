import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Example asynchronous thunk to get students
export const getMarks = createAsyncThunk(
  "marks/getMarks",
  async (selectedClass_name, thunkAPI) => {
    try {
      // const response = await fetch(`/marks/${class_name}`);
      const response = await fetch(`/api/v1/marks/${selectedClass_name}`);

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
export const getSubjectMarks = createAsyncThunk(
  "marks/getSubjectMarks",
  async ({selectedClass,selectedSubject}, thunkAPI) => {
    console.log(selectedClass,selectedSubject)
      try {
      // const response = await fetch(`/marks/${class_name}`);
      const response = await fetch(`/api/v1/marks/subjectmarks/${selectedClass}/${selectedSubject}`);

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
export const getMaxMarks = createAsyncThunk(
  "marks/getMaxMarks",
  async (class_name, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/marks/maxmarks/${class_name}`);

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
export const getMarksHeader = createAsyncThunk(
  "marks/getMarksHeader",
  async (class_name, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/marks/marksheader/${class_name}`);

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
export const getMaxMarksHeader = createAsyncThunk(
  "marks/getMaxMarksHeader",
  async (class_name, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/marks/maxmarksheader/${class_name}`);

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
export const getMarksByStudentId = createAsyncThunk(
  "marks/getMark",
  async ({ id, class_name, section }, thunkAPI) => {
    console.log(id, class_name, section)
    try {
      const response = await fetch(`/api/v1/marks/detail/${class_name}/${section}/${id}`);
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

export const editMarks = createAsyncThunk(
  "marks/editMarks",
  async ({updatedMarks,selectedClass,selectedSubject} , thunkAPI) => {
    try {
      // Your asynchronous logic to update student here

      const response = await fetch(`/api/v1/marks/edit/${selectedClass.replace("-","_")}/${selectedSubject}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMarks),
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
export const editMaxMarks = createAsyncThunk(
  "marks/editMaxMarks",
  async ({updatedMarks,selectedClass} , thunkAPI) => {
    try {
      // Your asynchronous logic to update student here

      const response = await fetch(`/api/v1/marks/editmaxmarks/${selectedClass.split("-")[0]}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMarks),
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
const initialState = {
  marks: null,
  subjectMarks:null,
  maxMarks:null,
  marksHeader:null,
  maxMarksHeader:null,
  studentMark: null,
  loading: false,
  error: null,
  message: null,
};

const marksSlice = createSlice({
  name: "marks",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.marks = action.payload.marks;
      })
      .addCase(getMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getMarksHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMarksHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.marksHeader = action.payload.marksHeader;
      })
      .addCase(getMarksHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })  

      .addCase(getMaxMarksHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMaxMarksHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.maxMarksHeader = action.payload.maxmarksHeader;
      })
      .addCase(getMaxMarksHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })  

      .addCase(getSubjectMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subjectMarks = action.payload.subjectMarks;
      })
      .addCase(getSubjectMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getMaxMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMaxMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.maxMarks = action.payload.maxMarks;
      })
      .addCase(getMaxMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getMarksByStudentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMarksByStudentId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studentMark = action.payload.mark; 
      })
      .addCase(getMarksByStudentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(editMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(editMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(editMaxMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMaxMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(editMaxMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
  },
});


export const { clearErrors, clearMessage } = marksSlice.actions;

export default marksSlice.reducer;
