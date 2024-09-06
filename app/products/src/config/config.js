const config = {
  development: {
    dialect: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    ssl: false,
    dialectOptions: {
      clientMinMessages: 'warning',
    },
  },
};

export default config;
