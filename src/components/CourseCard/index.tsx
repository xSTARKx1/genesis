import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Rate } from 'antd';

import './index.scss';

interface Props {
  course: any;
}
const CourseCard: FC<Props> = (props) => {
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
        {/*  <video*/}
        {/*    // className='card__image'*/}
        {/*    autoPlay={true}*/}
        {/*    muted={true}*/}
        {/*    controls={true}*/}
        {/*    // width='960'*/}
        {/*    // height='540'*/}
        {/*    // poster={`${course.previewImageLink}/cover.webp`}*/}
        {/*  >*/}
        {/*    <source*/}
        {/*      src={`${course.meta.courseVideoPreview.link}`}*/}
        {/*      type='application/x-mpegURL'*/}
        {/*    ></source>*/}
        {/*  </video>*/}
        <img
          src={`${course.previewImageLink}/cover.webp`}
          alt={course.title}
          className='card__image'
        />
        {/*)}*/}
      </div>
      <div className='card__info'>
        <h2>{course.title}</h2>
        <Rate allowHalf defaultValue={course.rating} disabled={true} />
        <h3>{course.description}</h3>
        <h3>Кількість уроків: {course.lessonsCount}</h3>
        {course.meta.skills &&
          course.meta.skills.map((skill: string) => {
            return (
              <Tag key={skill} color='purple'>
                {skill}
              </Tag>
            );
          })}
        <Link to={`/course/${course.id}`}>More details</Link>
      </div>
    </div>
  );
};

export default CourseCard;
