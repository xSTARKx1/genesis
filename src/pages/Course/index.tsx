import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Rate, Tag } from 'antd';

import {
  getCourseAsync,
  selectCourse,
  selectToken,
} from '../../features/courses/coursesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Lesson } from '../../types';

import './index.scss';
import ReactHlsPlayer from 'react-hls-player';

const Course = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const playerRef = useRef<HTMLVideoElement>(null);
  const token = useAppSelector(selectToken);
  const course = useAppSelector(selectCourse);
  const [selectedLesson, setSelectedLesson] = useState({
    link: '',
    id: '',
    title: '',
    order: 0,
  });

  useEffect(() => {
    if (courseId && token) {
      dispatch(getCourseAsync({ courseId, token }));
    }
  }, [dispatch, courseId, token]);

  useEffect(() => {
    if (course && course.lessons) {
      setSelectedLesson(course.lessons[0]);
    }
  }, [course]);

  const changeLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className='main-wrapper'>
      <h1 className='main-title'>{course?.title}</h1>
      <h2 className='sub-title'>{course?.description}</h2>
      <Rate allowHalf value={course?.rating} disabled={true} />
      <div>
        {course?.meta.skills &&
          course.meta.skills.map((skill: string) => {
            return (
              <Tag key={skill} color='purple'>
                {skill}
              </Tag>
            );
          })}
      </div>

      {/*<button onClick={() => console.log('qwe', selectedLesson)}>CLICK</button>*/}

      <div>
        <div>
          Lesson {selectedLesson.order}: {selectedLesson.title}
        </div>
        <ReactHlsPlayer
          src={selectedLesson.link}
          autoPlay={false}
          controls={true}
          muted={false}
          width='100%'
          height='auto'
          playerRef={playerRef}
        />
      </div>

      <div>
        <div>Another Lessons</div>
        <ul className='lessons-list'>
          {course?.lessons
            ?.filter(({ id }: Lesson) => id !== selectedLesson.id)
            .map((lesson) => {
              const { id, title, previewImageLink, order, status } = lesson;
              return (
                <li key={id} onClick={() => changeLesson(lesson)}>
                  <img
                    className='course-image'
                    alt={title}
                    src={`${previewImageLink}/lesson-${order}.webp`}
                  />
                  {status === 'locked' && <div>LOCKED!</div>}
                  <div>
                    Lesson {order}: {title}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Course;
