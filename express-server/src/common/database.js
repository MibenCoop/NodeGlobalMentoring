import  Sequelize from 'sequelize';
export default new Sequelize('products', 'postgres', '123456', {
    dialect: 'postgres',
    host: "localhost",
    port: 54320,
  })
  