import * as dotenv from 'dotenv';

dotenv.config({
  path: `.${process.env.NODE_ENV}.env`,
});

module.exports = {
  'type': 'mongodb',
  'host': process.env.TYPEORM_HOST,
  'database': process.env.TYPEORM_DATABASE,
  'useNewUrlParser': true,
  'synchronize': true,
  'logging': false,
  'entities': [
    'src/**/**.entity.ts',
  ],
  'migrations': [
    'src/**/**.migration.ts',
  ],
  'subscribers': [
    'src/subscriber/**/*.ts',
  ],
  'cli': {
    'entitiesDir': 'src',
    'migrationsDir': 'src/',
  },
};
