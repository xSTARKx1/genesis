import { Spin } from 'antd';
import './index.scss';

const Spinner = () => {
  return (
    <div className='spinner'>
      <Spin tip='Loading' size='large'></Spin>
    </div>
  );
};

export default Spinner;
