import { FC } from 'react';
import { Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';

interface Props {
  message: string;
  status?: ResultStatusType | undefined;
}

const ErrorMessage: FC<Props> = (props) => {
  const { message, status = 'warning' } = props;
  return <Result status={status} title={message} />;
};

export default ErrorMessage;
