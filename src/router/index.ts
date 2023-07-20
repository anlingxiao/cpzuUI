import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import staticRouter from "@/store/static-router";

const localRoutes: Array<RouteRecordRaw> = [];

staticRouter.routes.forEach(v => {
    localRoutes.push({
      path: v.path,
      name: v.name,
      component: v.component,
      children: v.children
    })
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: localRoutes
})

router.beforeEach((to) => {
  console.log('前往路由:', to.path);
  // 跳转默认路由
  if (to.path == '/')
    router.push('/account/login').then(() => {
      return;
    })
});

export default router
