// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk(
  "library/getBooks",
  async (_, thunkAPI) => {
    console.log("HIII");
    try {
      const response = await fetch(`http://localhost:3001/api/v1/library/books`);

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getIssuedBooks = createAsyncThunk(
  "library/getIssuedBooks",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`/library/issued-books`);

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getBookById = createAsyncThunk(
  "classes/getBook",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`/library/book/${id}`);

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

export const updateBook = createAsyncThunk(
  "library/updateBook",
  async ({ bookId, values }, thunkAPI) => {
    try {
      const response = await fetch(`/library/book/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to update classes");
      }
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteBook = createAsyncThunk(
  "library/deleteBook",
  async (bookId, thunkAPI) => {
    console.log(bookId);
    try {
      const response = await fetch(`/library/book/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to update classes");
      }
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addNewBook = createAsyncThunk(
  "library/addNewBook",
  async (values, thunkAPI) => {
    try {
      const response = await fetch(`/library/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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

export const issueBookToId = createAsyncThunk(
  "library/issueBook",
  async (values, thunkAPI) => {
    console.log(values);
    try {
      const response = await fetch(`/library/to-issue-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
        throw new Error(errorData.error);
      }
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const uploadBooks = createAsyncThunk(
  "library/uploadBooks",
  async ({ formData }, thunkAPI) => {

    try {
      const response = await fetch(`/library/upload/books`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json(); // Parse response once
      console.log(responseData);
      if (!response.ok) {
        console.log(responseData); // Log error data
        throw new Error(responseData.error);
      }

      return responseData; // Return data on success
    } catch (error) {
      console.log(error);
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialState = {
  books: null,
  loading: false,
  error: null,
  message: null,
  selectedClass: null,
  issuedBooks: null,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setClass: (state, action) => {
      state.selectedClass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.books = action.payload.books;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getIssuedBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIssuedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.issuedBooks = action.payload.books;
      })
      .addCase(getIssuedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(addNewBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addNewBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(issueBookToId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(issueBookToId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(issueBookToId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(uploadBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(uploadBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });;
  },
});

export const { clearError, clearMessages, setClass } = librarySlice.actions;
export default librarySlice.reducer;
