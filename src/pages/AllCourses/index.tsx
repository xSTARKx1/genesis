import { useEffect } from 'react';

import usePagination from '../../app/UsePagination';
import { CourseCard, Pagination } from '../../components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getCoursesAsync,
  selectCourses,
  selectToken,
  resetCourse,
} from '../../features/courses/coursesSlice';

import './index.scss';

const AllCourses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(resetCourse());
      dispatch(getCoursesAsync(token));
    }
  }, [token, dispatch]);

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 10,
    count: courses.length,
  });

  return (
    <div className='main-wrapper'>
      <h1 className='page-title'>All courses</h1>
      <ul className='course-list'>
        {courses.slice(firstContentIndex, lastContentIndex).map((course) => {
          return (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          );
        })}
      </ul>
      {courses.length > 0 && (
        <Pagination
          nextPage={nextPage}
          prevPage={prevPage}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default AllCourses;
