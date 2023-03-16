import { FC } from 'react';

import { createArray } from '../../services';

import './index.scss';

interface Props {
  prevPage: () => void;
  totalPages: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  page: number;
}

const Pagination: FC<Props> = (props) => {
  const { prevPage, totalPages, setPage, nextPage, page } = props;

  return (
    <div className='pagination'>
      <button onClick={prevPage} className='page'>
        &larr;
      </button>

      {createArray(totalPages).map((el) => (
        <button
          onClick={() => setPage(el + 1)}
          key={el}
          className={`page ${page === el + 1 ? 'active' : ''}`}
        >
          {el + 1}
        </button>
      ))}
      <button onClick={nextPage} className='page'>
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
