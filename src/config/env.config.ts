export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: +process.env.PORT || 3000,
  pokeapi: process.env.POKEAPI,
  limit: process.env.LIMIT || 150,
});
