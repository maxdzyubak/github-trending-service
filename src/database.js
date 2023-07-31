const { Pool } = require('pg');

// Создание пула подключений к базе данных
const pool = new Pool({
  user: 'maxdzyubak',
  host: 'localhost',
  database: 'github_trending_service_db',
  port: 5432 // Порт базы данных
});

const saveRepository = async repo => {
  try {
    const { name, description, fullname, htmlurl, stargazerscount } = repo;

    // Выполнение запроса для сохранения репозитория в базу данных
    const query =
      'INSERT INTO repositories (name, description, fullname, htmlurl, stargazerscount) VALUES ($1, $2, $3, $4, $5)';
    const values = [name, description, fullname, htmlurl, stargazerscount];
    await pool.query(query, values);

    console.log(`Репозиторий ${name} успешно сохранен в базе данных`);
  } catch (error) {
    console.error(
      'Ошибка при сохранении репозитория в базе данных:',
      error.message
    );
  }
};

module.exports = { saveRepository };
