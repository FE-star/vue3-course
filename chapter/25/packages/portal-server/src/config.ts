export const jwtConfig = {
  time: 60 * 60 * 1000, //ms
  secret: 'my-vue-project',
  unless: ['/', '/favicon.ico']
};
