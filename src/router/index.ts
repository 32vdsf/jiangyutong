/*
 * @Author: yangmingyue 915772262@qq.com
 * @Date: 2022-09-20 09:51:49
 * @LastEditors: yangmingyue 915772262@qq.com
 * @LastEditTime: 2022-09-28 14:28:52
 * @FilePath: \text6\vue-project\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    // { path: "/", redirect: "/admin" },
    {
      path: "/admin/static",
      name: "static",
      component: () => import("../views/static.vue"), //异步
    },
    {
      path: "/admin/todo",
      name: "details",
      component: () => import("../views/details.vue"), //异步
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin.vue"),
    },
    // {
    //   path: "/",
    //   name: "todoList",
    //   component: () => import("../views/todoList.vue"),//异步
    // },
    {
      path: "/",
      name: "todoList",
      component: () => import("../views/todoList.vue"),
    },
  ],
});

export default router;
