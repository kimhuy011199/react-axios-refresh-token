import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from './auth.service';

const API_DOMAIN = 'http://localhost:5002';

export class ApiService {
  axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_DOMAIN}/api`,
      timeout: 800000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    this.axiosInstance.interceptors.response.use(
      async (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/login' && err.response) {
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
              const refreshToken = getRefreshToken();
              const oldAccessToken = getAccessToken();
              const res = await this.axiosInstance.post('/refreshtoken', {
                refreshToken,
              });

              const { token } = res.data;
              setAccessToken(token);
              originalConfig.headers.Authorization = `Bearer ${token}`;

              console.log('Old access token', oldAccessToken);
              console.log('Refresh your token!!!');
              console.log('New access token', token);

              return this.axiosInstance(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }

        return Promise.reject(err);
      }
    );
  }

  async get(url, moreConfigs = {}) {
    const res = await this.axiosInstance.get(url, moreConfigs);
    return res.data;
  }

  async post(url, body, moreConfigs = {}) {
    const res = await this.axiosInstance.post(url, body, moreConfigs);
    return res.data;
  }
}
