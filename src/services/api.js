import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://sua-api-aqui.com/api', // substitua pela URL da sua API
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getToken = async () => {
  try {
    const json = await AsyncStorage.getItem('auth_token');
    return json;
  } catch (err) {
    return null;
  }
};

export default api;
