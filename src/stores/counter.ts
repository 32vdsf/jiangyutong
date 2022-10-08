/*
 * @Author: yangmingyue 915772262@qq.com
 * @Date: 2022-09-20 09:51:49
 * @LastEditors: yangmingyue 915772262@qq.com
 * @LastEditTime: 2022-09-20 16:28:34
 * @FilePath: \text6\vue-project\src\stores\counter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
