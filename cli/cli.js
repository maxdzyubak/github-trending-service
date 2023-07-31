const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000'; // Базовый URL вашего сервера

// Функция для выполнения GET-запроса к API
const get = async url => {
  try {
    const response = await axios.get(API_BASE_URL + url);
    return response.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET-запроса:', error.message);
  }
};

// Функция для выполнения POST-запроса к API
const post = async (url, data) => {
  try {
    const response = await axios.post(API_BASE_URL + url, data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST-запроса:', error.message);
  }
};

// Пример использования
const main = async () => {
  // Выполнение GET-запроса к эндпоинту /repository/:nameOrId
  const repository = await get('/dev/nodejs/github-trending-service');
  console.log(repository);

  // Выполнение POST-запроса к эндпоинту /sync
  const syncResult = await post('/sync');
  console.log(syncResult);
};

main();
