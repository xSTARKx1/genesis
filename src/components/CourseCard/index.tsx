import { FC, useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { Link } from 'react-router-dom';
import { Tag, Rate, Space } from 'antd';

import { Course } from '../../types';

import './index.scss';

interface Props {
  course: Course;
}
const CourseCard: FC<Props> = (props) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const { course } = props;

  return (
    <div className='card'>
      <div className='image-wrapper'>
        {/*{course.meta.courseVideoPreview ? (*/}
        {/*  <ReactHlsPlayer*/}
        {/*    src={course.meta.courseVideoPreview.link}*/}
        {/*    autoPlay={false}*/}
        {/*    controls={true}*/}
        {/*    muted={false}*/}
        {/*    width='100%'*/}
        {/*    height='auto'*/}
        {/*    playerRef={playerRef}*/}
        {/*  />*/}
        {/*) : (*/}
        <img
          src={`${course.previewImageLink}/cover.webp`}
          alt={course.title}
          className='card__image'
        />
        {/*)}*/}
      </div>
      <div className='card__info'>
        <h2 className='title'>{course.title}</h2>
        <h3 className='description'>{course.description}</h3>
        <Rate allowHalf defaultValue={course.rating} disabled={true} />
        <h3 className='description'>
          Lessons available: {course.lessonsCount}
        </h3>
        <div>
          <Space size={[2, 8]} wrap>
            {course.meta.skills &&
              course.meta.skills.map((skill: string) => {
                return (
                  <Tag key={skill} color='purple'>
                    {skill}
                  </Tag>
                );
              })}
          </Space>
        </div>
        <div className='redirect-button-wrapper'>
          <Link to={`/course/${course.id}`} className='button'>
            More details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
