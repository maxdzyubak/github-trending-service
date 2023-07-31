const express = require('express');
const app = express();
const routes = require('./routes/routes');
const db = require('./database');

// // Настройка маршрутов
// app.get('/', (req, res) => {
//   res.send('Привет, мир!');
// });

// Настройка маршрутов
app.use('/', routes);

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

app.on('error', (error) => {
  console.error('Произошла ошибка сервера:', error);
});
