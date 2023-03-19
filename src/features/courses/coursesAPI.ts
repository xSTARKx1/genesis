import axios from 'axios';

axios.defaults.baseURL = 'https://api.wisey.app/api/v1';

const baseConfig = {
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': 'multipart/form-data',
  },
};

const fetchToken = async () => {
  return axios.get('/auth/anonymous?platform=subscriptions', baseConfig);
};

const fetchCourses = async (token: string) => {
  return axios.get('/core/preview-courses', {
    headers: {
      ...baseConfig.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

const fetchCourse = async (courseId: string, token: string) => {
  return axios.get(`/core/preview-courses/${courseId}`, {
    headers: {
      ...baseConfig.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export { fetchToken, fetchCourses, fetchCourse };
