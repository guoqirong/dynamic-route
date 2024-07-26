import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', wrappers: ['@/layouts'], component: '@/pages/index' },
  ],
  fastRefresh: {},
  copy: [{
    from: 'src/config/routes.json',
    to: 'routes.json',
  }],
});
