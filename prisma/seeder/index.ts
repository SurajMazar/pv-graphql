import UserSeeder from './user.seeder';

/**
 * APPLICATION SEEDER
 * @constructor
 */
const Seeder = async () => {
  await UserSeeder();
};

/**
 * EXECUTING THE SEEDER
 */
Seeder().then(() => {
  console.log('Database has been seeded.');
});
