import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { 
      path: '/',
      component: '@/layouts',
      routes: [
        { path: '/', component: '@/pages/index' }
      ]
    },
  ],
  fastRefresh: {},
  dynamicImport: {},
  copy: [{
    from: 'src/config/routes.json',
    to: 'routes.json',
  }],
});
