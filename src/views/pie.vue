<template>
       
    <v-chart class="chart" :option="option" />
</template>
  
  <script setup >
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, toRefs } from "vue"
use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);
// const { highNumber, middleNumber, lowNumber } = toRefs(props);
/* console.log("highNumber", highNumber); */
const props = defineProps({
    height: {
        type: Number,
        required: true
    },
    middle: {
        type: Number,
        required: true
    },
    low: {
        type: Number,
        required: true
    }
})
const { height } = toRefs(props);
const { middle } = toRefs(props);
const { low } = toRefs(props);

const option = ref({
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: height, name: '高' },
                { value: middle, name: '中' },
                { value: low, name: '低' },

            ]
        }
    ]
});
  </script>
  <style scoped>
.chart {
    height: 400px;
}
</style>