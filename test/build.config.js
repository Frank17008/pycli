module.exports = {
  vite: false,
  proxy: {
    '/api': {
      enable: true,
      // target: 'http://127.0.0.1',
      target: 'http://192.168.1.200:8124',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  plugins: [
    [
      'build-plugin-icestark',
      {
        type: 'child',
      },
    ],
    [
      'build-plugin-moment-locales',
      {
        locales: ['zh-cn'],
      },
    ],
    [
      'build-plugin-load-assets',
      {
        assets: {
          start: ['/constants.js', '/constants.js'],
          build: ['/constants.js', '/constants.js'],
        },
      },
    ],
  ],
};
