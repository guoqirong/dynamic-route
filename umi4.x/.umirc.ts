import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" }
  ],
  npmClient: 'yarn',
  copy: [{
    from: 'src/config/routes.json',
    to: 'dist/routes.json',
  }],
});
