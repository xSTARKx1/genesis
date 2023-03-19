import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { getTokenAsync } from './features/courses/coursesSlice';
import { useAppDispatch } from './app/hooks';
import { AllCourses, Course } from './pages';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTokenAsync());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/all-courses' element={<AllCourses />} />
        <Route path='/course/:courseId' element={<Course />} />
        <Route path='*' element={<Navigate to={'/all-courses'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
