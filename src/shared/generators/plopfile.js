// eslint-disable-next-line @typescript-eslint/no-var-requires
const migrationGenerator = require('./migrations');

module.exports = function (plop) {
  plop.setGenerator('Migration', migrationGenerator);
};
