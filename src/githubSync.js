const axios = require('axios');
const db = require('./database'); // Подключение к базе данных

const fetchPopularRepos = async () => {
  try {
    // Отправка запроса к GitHub API для получения популярных репозиториев
    const response = await axios.get('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc');
    const repositories = response.data.items;

    // Сохранение полученных репозиториев в базу данных
    for (const repo of repositories) {
      await db.saveRepository(repo);
    }

    console.log('Синхронизация успешно завершена');
  } catch (error) {
    console.error('Ошибка при синхронизации с GitHub API:', error.message);
  }
};

// Запуск синхронизации каждые X минут
const syncInterval = X * 60000; // X минут в миллисекундах
setInterval(fetchPopularRepos, syncInterval);
