module.exports = {
  development: {
    storage: process.env.DB_FILE, //location of the DB file
    dialect: "sqlite", //specifying RDBMS
    seederStorage: "sequelize",
    benchmark: true, //prints execution time to terminal
    logQueryParameters: true, //prints parameters with logged SQL
    typeValidation: true, //model-level data type validation
    // logging: false // prints SQL to the terminal
  },
  production: {
    url: process.env.DB_URL,
    dialect: "postgres", //specifying RDBMS
  },
};
