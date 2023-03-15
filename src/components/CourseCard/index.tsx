import { FC } from 'react';
import { Tag, Rate } from 'antd';

import './index.scss';

interface Props {
  course: any;
}
const CourseCard: FC<Props> = (props) => {
  const { course } = props;
  return (
    <div className='card'>
      <img
        src={`${course.previewImageLink}/cover.webp`}
        alt={course.title}
        className='card__image'
      />
      <div>
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
      </div>
      {/*<button onClick={() => console.log('course', course)}>CLICK</button>*/}
    </div>
  );
};

export default CourseCard;
