const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../database');

router.post('/sync', async (req, res) => {
  try {
    // Выполните запрос к GitHub API для получения трендовых репозиториев
    const response = await axios.get(
      'https://api.github.com/search/repositories',
      {
        params: {
          q: 'stars:>1000',
          sort: 'stars',
          order: 'desc'
        }
      }
    );

    // Извлеките данные о репозиториях из ответа
    const repositories = response.data.items;

    // Сохраните полученные репозитории в базе данных
    await db.saveRepository(repositories);

    // Отправьте успешный ответ клиенту
    res
      .status(200)
      .json({ message: 'Синхронизация с GitHub успешно выполнена' });
  } catch (error) {
    console.error('Ошибка при синхронизации с GitHub:', error);
    // Отправьте ошибку клиенту
    res.status(500).json({ message: 'Ошибка при синхронизации с GitHub' });
  }
});

module.exports = router;
