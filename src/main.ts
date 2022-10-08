/*
 * @Author: yangmingyue 915772262@qq.com
 * @Date: 2022-09-20 09:51:49
 * @LastEditors: yangmingyue 915772262@qq.com
 * @LastEditTime: 2022-09-30 10:43:15
 * @FilePath: \text6\vue-project\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import * as ElIcon from "@element-plus/icons-vue";
import BaseEcharts from "./components/charts/index.vue";
// import store from "./stores/index1";
// import VePie from 'v-charts/lib/pie.common'
// import VeRing from 'v-charts/lib/ring.common'
// import VeMap from 'v-charts/lib/map.common'
// import * as echarts from "echarts";
// Vue.component(VePie.name, VePie)
// Vue.component(VeRing.name, VeRing)
// Vue.component(VeMap.name, VeMap)
// import * as from 'echarts'
import piniaPluginPersistedstate from "pinia-plugin-persist";

const app = createApp(App);
// Vue.prototype.$echarts = echarts;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(ElementPlus);
for (let iconName in ElIcon) {
  app.component(iconName, ElIcon[iconName]);
}
app.component("BaseEcharts", BaseEcharts);
app.use(createPinia());
// app.use(store);
app.use(router);
app.mount("#app");
