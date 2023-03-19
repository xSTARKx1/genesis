import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Rate, Tag, Space } from 'antd';
import ReactHlsPlayer from 'react-hls-player';
import { LockOutlined } from '@ant-design/icons';

import {
  courseStatus,
  getCourseAsync,
  selectCourse,
  selectToken,
} from '../../features/courses/coursesSlice';
import { ErrorMessage, Spinner } from '../../components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Lesson } from '../../types';

import './index.scss';

const Course = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const playerRef = useRef<HTMLVideoElement>(null);
  const token = useAppSelector(selectToken);
  const course = useAppSelector(selectCourse);
  const loadingStatus = useAppSelector(courseStatus);
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
    if (lesson.status === 'locked') return;
    setSelectedLesson(lesson);
  };

  return (
    <div className='main-wrapper'>
      {loadingStatus === 'idle' ? (
        <>
          <h1 className='main-title'>{course?.title}</h1>
          <h2 className='sub-title'>{course?.description}</h2>
          <div className='skills-wrapper'>
            <Space size={[2, 8]} wrap>
              {course?.meta.skills &&
                course.meta.skills.map((skill: string) => {
                  return (
                    <Tag key={skill} color='purple'>
                      {skill}
                    </Tag>
                  );
                })}
            </Space>
            <Rate
              allowHalf
              value={course?.rating}
              disabled={true}
              className='rating'
            />
          </div>

          <div className='video-section'>
            <div className='lesson-title'>
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

          <section className='lessons-wrapper'>
            <div className='lesson-title'>Another Lessons</div>
            <ul className='lessons-list'>
              {course?.lessons
                ?.filter(({ id }: Lesson) => id !== selectedLesson.id)
                .map((lesson) => {
                  const { id, title, previewImageLink, order, status } = lesson;
                  const isLockedLesson = status === 'locked';

                  return (
                    <li
                      key={id}
                      onClick={() => changeLesson(lesson)}
                      className={isLockedLesson ? '' : 'list-item'}
                    >
                      <img
                        className={
                          isLockedLesson ? 'locked-image' : 'course-image'
                        }
                        alt={title}
                        src={`${previewImageLink}/lesson-${order}.webp`}
                      />
                      <div className='title'>
                        Lesson {order}: {title}{' '}
                        {isLockedLesson ? <LockOutlined /> : null}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        </>
      ) : (
        <>
          {loadingStatus === 'error' ? (
            <ErrorMessage message='Try Again!' />
          ) : (
            <Spinner />
          )}
        </>
      )}
    </div>
  );
};

export default Course;
