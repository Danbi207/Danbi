import axios from 'axios';
import { Token } from '../private/token';

const token = new Token();

export const setToken = (payload) => {
  token.setAccessToken(payload);
  // console.log(token.getAccessToken());
};

export const setTokenExpireTime = (payload) => {
  token.setAccessTokenExpireTime(payload);
  // console.log(token.getAccessTokenExpireTime());
};

export const reissueAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken || refreshToken === '') {
    // console.log('토큰이 없다.')
    return null;
  }

  try {
    const { data } = await axios({
      method: 'post',
      url: process.env.REACT_APP_SERVER + '/api/v1/access-token/issue',
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    token.setAccessToken(data.accessToken);
    token.setAccessTokenExpireTime(data.accessTokenExpireTime);
    return data;
  } catch (err) {
    console.log(err.response);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpireTime');
    localStorage.removeItem('role');
    token.clear();
    throw err;
  }
};

export const authGet = async (url) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken || refreshToken === '') {
    return null;
  }

  if (token.check()) {
    //엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if (res === null) return null;

    try {
      const { data } = await axios({
        method: 'get',
        url: process.env.REACT_APP_SERVER + url,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  } else {
    //엑세스 토큰이 사용가능한 경우
    try {
      const { data } = await axios({
        method: 'get',
        url: process.env.REACT_APP_SERVER + url,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  }
};

export const authPost = async (url, json) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken || refreshToken === '') {
    return null;
  }

  if (token.check()) {
    //엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if (res === null) return null;
    try {
      const { data } = await axios({
        method: 'post',
        url: process.env.REACT_APP_SERVER + url,
        data: json,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  } else {
    //엑세스 토큰이 사용가능한 경우
    try {
      const { data } = await axios({
        method: 'post',
        url: process.env.REACT_APP_SERVER + url,
        data: json,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  }
};

export const authDelete = async (url, json) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken || refreshToken === '') {
    return null;
  }

  if (token.check()) {
    //엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if (res === null) return null;
    try {
      const { data } = await axios({
        method: 'delete',
        url: process.env.REACT_APP_SERVER + url,
        data: json,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  } else {
    //엑세스 토큰이 사용가능한 경우
    // console.log(process.env.REACT_APP_SERVER+url);
    try {
      const { data } = await axios({
        method: 'delete',
        url: process.env.REACT_APP_SERVER + url,
        data: json,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  }
};

export const authPut = async (url, json) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken || refreshToken === '') {
    return null;
  }

  if (token.check()) {
    //엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if (res === null) return null;
    try {
      const { data } = await axios({
        method: 'put',
        url: process.env.REACT_APP_SERVER + url,
        data: json,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  } else {
    //엑세스 토큰이 사용가능한 경우
    try {
      const { data } = await axios({
        method: 'put',
        url: process.env.REACT_APP_SERVER + url,
        data: json,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  }
};

export const authFilePost = async (url, formData) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken || refreshToken === '') {
    return null;
  }

  if (token.check()) {
    //엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if (res === null) return null;
    try {
      // for(const pair of formData){
      //   console.log(pair);
      // }
      // console.log(process.env.REACT_APP_SERVER+url)

      const { data } = await axios({
        method: 'post',
        url: process.env.REACT_APP_SERVER + url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token.getAccessToken()}`,
        },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  } else {
    //엑세스 토큰이 사용가능한 경우
    // for(const pair of formData){
    //   console.log(pair);
    // }
    // console.log(process.env.REACT_APP_SERVER+url)
    try {
      const { data } = await axios({
        method: 'post',
        url: process.env.REACT_APP_SERVER + url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token.getAccessToken()}`,
        },
      });

      if (data.code === 200) {
        return data.data;
      }
    } catch (err) {
      throw err;
    }
  }
};

export const TestLogin = async (email) => {
  try {
    const { data } = await axios.post('/api/v1/test/member/login', {
      email,
    });
    if (data) {
      token.setAccessToken(data.accessToken);
      token.setAccessTokenExpireTime(data.accessTokenExpireTime);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('refreshTokenExpireTime', data.refreshTokenExpireTime);
      if (data.role === 'ROLE_IP') {
        localStorage.setItem('role', 'ip');
      }
      if (data.role === 'ROLE_HELPER') {
        localStorage.setItem('role', 'helper');
      }
      return true;
    }
  } catch (err) {
    throw err;
  }
};
