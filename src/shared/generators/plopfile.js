const migrationGenerator = require('./migrations');
const typeORMGenerator = require('./modules/typeorm');
const mongooseGenerator = require('./modules/mongoose');
const useCasesGenerator = require('./useCases');
const seedGenerator = require('./seeds');
const middlewareGenerator = require('./middlewares');
const providerGenerator = require('./providers');
const generator = require('./_generator');
const startGenerator = require('./start');

module.exports = function (plop) {
  plop.setGenerator('Migration', migrationGenerator);
  // plop.setGenerator('Module - TypeORM', typeORMGenerator);
  // plop.setGenerator('Module - Mongoose', mongooseGenerator);
  // plop.setGenerator('UseCase', useCasesGenerator);
  // plop.setGenerator('Seed', seedGenerator);
  // plop.setGenerator('Middleware', middlewareGenerator);
  // plop.setGenerator('Provider', providerGenerator);
  // plop.setGenerator('Generator', generator);
  // plop.setGenerator('Start', startGenerator);
};
