module.exports = {
  apps: [
    {
      name: 'odysseia-backend',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
