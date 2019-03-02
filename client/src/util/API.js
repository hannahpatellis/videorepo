import axios from 'axios';

export default {
  getData: token => {
    return axios.post('/api/data', { token: token });
  },
  preformAuth: password => {
    return axios.post('/api/auth', { password: password });
  }
};