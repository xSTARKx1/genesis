import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { fetchToken, fetchCourses, fetchCourse } from './coursesAPI';
import { Course } from '../../types';

interface coursesState {
  accessToken: string | null;
  tokenStatus: string;
  courses: Course[];
  coursesStatus: string;
  course: Course | null;
  courseStatus: string;
}

interface CourseParams {
  courseId: string;
  token: string;
}

const initialState: coursesState = {
  accessToken: null,
  tokenStatus: 'idle',
  courses: [],
  coursesStatus: 'idle',
  course: null,
  courseStatus: 'idle',
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
    const response = await fetchCourses(token);
    return response.data;
  }
);

export const getCourseAsync = createAsyncThunk(
  'courses/fetchCourse',
  async ({ courseId, token }: CourseParams) => {
    const response = await fetchCourse(courseId, token);
    return response.data;
  }
);

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetCourse: (state) => ({
      ...state,
      course: null,
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
      })
      .addCase(getCourseAsync.pending, (state) => {
        state.courseStatus = 'loading';
      })
      .addCase(getCourseAsync.fulfilled, (state, action) => {
        state.courseStatus = 'idle';
        state.course = action.payload;
      })
      .addCase(getCourseAsync.rejected, (state) => {
        state.courseStatus = 'error';
      });
  },
});

export const selectToken = (state: RootState) => state.courses.accessToken;
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectCourse = (state: RootState) => state.courses.course;

export const { resetCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
