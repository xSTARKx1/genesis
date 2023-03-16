import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchToken, getCourses } from './coursesAPI';
import { Course } from '../../types';

interface coursesState {
  accessToken: string | null;
  tokenStatus: string;
  courses: Course[];
  coursesStatus: string;
}

const initialState: coursesState = {
  accessToken: null,
  tokenStatus: 'idle',
  courses: [],
  coursesStatus: 'idle',
};

export const getTokenAsync = createAsyncThunk(
  'courses/fetchToken',
  async () => {
    const response = await fetchToken();
    return response.data;
  }
);
export const getCoursesAsync = createAsyncThunk(
  'courses/fetchCourses',
  async (token: string) => {
    const response = await getCourses(token);
    return response.data;
  }
);

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetToken: () => ({
      ...initialState,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTokenAsync.pending, (state) => {
        state.tokenStatus = 'loading';
      })
      .addCase(getTokenAsync.fulfilled, (state, action) => {
        state.tokenStatus = 'idle';
        state.accessToken = action.payload.token;
      })
      .addCase(getTokenAsync.rejected, (state) => {
        state.tokenStatus = 'error';
      })
      .addCase(getCoursesAsync.pending, (state) => {
        state.coursesStatus = 'loading';
      })
      .addCase(getCoursesAsync.fulfilled, (state, action) => {
        state.coursesStatus = 'idle';
        state.courses = action.payload.courses;
      })
      .addCase(getCoursesAsync.rejected, (state) => {
        state.coursesStatus = 'error';
      });
  },
});

export const selectToken = (state: RootState) => state.courses.accessToken;
export const selectCourses = (state: RootState) => state.courses.courses;

export const { resetToken } = coursesSlice.actions;

export default coursesSlice.reducer;
