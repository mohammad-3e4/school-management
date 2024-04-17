import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Example asynchronous thunk to get students
export const getSalary = createAsyncThunk(
  "fees/getSalary",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/salary`);

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

export const createSalary = createAsyncThunk(
    "create/Salary",
    async (values, thunkAPI) => {
      try {
        const response = await fetch("/api/v1/salary/create", {
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
  
  export const paySalary = createAsyncThunk(
    "create/paySalary",
    async (values, thunkAPI) => {
      try {
        const response = await fetch("/api/v1/salary/pay", {
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
  export const getSalaryStructureById = createAsyncThunk(
    "create/Salarybyid",
    async (id, thunkAPI) => {
      try {
        const response = await fetch(`/api/v1/salary/${id}` ,)
  
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
    salary: null,
    memberPay: null,
    salaryStructure:null,
    loading: false,
    error: null,
    message: null,
  };
  
  const salarySlice = createSlice({
    name: "salary",
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
      
        .addCase(getSalary.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getSalary.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.salary = action.payload.salary;
        })
        .addCase(getSalary.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        }) 
        .addCase(createSalary.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(createSalary.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
          })        
          .addCase(paySalary.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(paySalary.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
          })
          .addCase(getSalaryStructureById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getSalaryStructureById.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.memberPay = action.payload.memberSalary;
          })
          .addCase(getSalaryStructureById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
          }) 
      
    },
  });
  
  
  
  export const { clearErrors, clearMessage } = salarySlice.actions;
  
  export default salarySlice.reducer;
  