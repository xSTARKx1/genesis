import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AllCourses, Course } from './pages';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/all-courses' element={<AllCourses />} />
        <Route path='/course' element={<Course />} />
        <Route path='*' element={<Navigate to={'/all-courses'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
