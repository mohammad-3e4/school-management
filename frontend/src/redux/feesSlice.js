import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Example asynchronous thunk to get students
export const getFees = createAsyncThunk(
  "fees/getFees",
  async (selectedClass, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/fees/class/${selectedClass || '5-1'}`);

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


export const getFeeStructure = createAsyncThunk(
  "fees/getFeeStructure",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/fees/structure`);

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

export const getFeeStructureByClass = createAsyncThunk(
  "fees/getFeeStructureByClass",
  async (class_value, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/fees/structure/${class_value}`);

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
export const getFeesByStudentId = createAsyncThunk(
  "fees/getFeesByStudentId",
  async ( studentId, thunkAPI) => {
    try {
      // Your asynchronous logic to update student her
      const response = await fetch(`/api/v1/fees/${studentId}`);
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



export const createFees = createAsyncThunk(
  "fees/create",
  async (values, thunkAPI) => {
    try {
      const response = await fetch("/api/v1/fees", {
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

export const createFeeStructure = createAsyncThunk(
  "feestructure/create",
  async (values, thunkAPI) => {
    try {
      const response = await fetch("/api/v1/fees/structure", {
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

export const updateFeeStructure = createAsyncThunk(
  "feestructure/update",
  async ({id,updatedData}, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/fees/update/structure/${id}`, {
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

export const deleteStructure = createAsyncThunk(
  "fees/deleteStructure",
  async (Id, thunkAPI) => {
    console.log(Id)
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(`/api/v1/fees/delete/structure/${Id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
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
  fees: null,
  feeStructure:null,
  studentFees: null,
  loading: false,
  error: null,
  message: null,
};

const feesSlice = createSlice({
  name: "fees",
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
    .addCase(createFees.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createFees.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    })
    .addCase(createFees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    })
    .addCase(createFeeStructure.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createFeeStructure.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    })
    .addCase(updateFeeStructure.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    }) .addCase(updateFeeStructure.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateFeeStructure.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    })
    .addCase(createFeeStructure.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    })
      .addCase(getFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.fees = action.payload.fees;
      })
      .addCase(getFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getFeesByStudentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeesByStudentId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studentFees = action.payload.fees; 
      })
      .addCase(getFeesByStudentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
       .addCase(getFeeStructure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeStructure.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feeStructure = action.payload.feeStructure;
      })
      .addCase(getFeeStructure.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      }) .addCase(getFeeStructureByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeStructureByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feeStructure = action.payload.feeStructure;
      })
      .addCase(getFeeStructureByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      }) 
      .addCase(deleteStructure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStructure.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteStructure.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
  },
});



export const { clearErrors, clearMessage } = feesSlice.actions;

export default feesSlice.reducer;
