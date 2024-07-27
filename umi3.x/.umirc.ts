import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', wrappers: ['@/layouts'], component: '@/pages/index' },
  ],
  fastRefresh: {},
  dynamicImport: {},
  copy: [{
    from: 'src/config/routes.json',
    to: 'routes.json',
  }],
});
