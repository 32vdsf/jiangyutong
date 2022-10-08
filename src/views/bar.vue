<template>
    <div>
        <BaseEcharts ref="echart" :options="option" />
    </div>
</template>
<script setup >
import { getCurrentInstance, nextTick, onMounted, ref, toRefs, watch } from "vue";
const { proxy } = getCurrentInstance()
const props = defineProps({
    title: {
        type: Array,
        required: true
    },
    time: {
        type: Array,
        required: true
    },
});
console.log("props.title", props.title);
// watch(() => props.title, (val) => {
//     nextTick(() => {
//         debugger
//         option.value.xAxis.data = val
//         proxy.$refs.echart.renderEcharts(option.value)
//     })
// })
// watch(() => props.time, (val) => {
//     nextTick(() => {
//         option.value.series[0].data = val
//         console.log(option.value, "@@")
//         proxy.$refs.echart.renderEcharts(option.value)
//     })
// })
// watch(() => props.title, (val) => {
//     console.log(111)
//     debugger
//     proxy.$refs.echart.initCharts()
// })
const { title, time } = toRefs(props);
watch(title, (val) => {
    nextTick(() => {
        option.value.xAxis.data = val
        proxy.$refs.echart.renderEcharts(option.value)
    })
})
watch(time, (val) => {
    nextTick(() => {
        option.value.series[0].data = val
        proxy.$refs.echart.renderEcharts(option.value)
    })
})
const option = ref({
    // title: ssss,
    backgroundColor: "black",
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
    },

    legend: {
        // data: ["天数"],
        right: 10,
        top: 12,
        textStyle: {
            color: "#fff",
        },
        itemWidth: 12,
        itemHeight: 10,
        // itemGap: 35
    },
    xAxis: {
        type: "category",
        // data: ["es", "aas", "aa"],
        data: title,
        axisLine: {
            lineStyle: {
                color: "white",
            },
        },
        axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
                fontFamily: "Microsoft YaHei",
            },
        },
    },

    yAxis: {
        type: "value",
        axisLine: {
            show: false,
            lineStyle: {
                color: "white",
            },
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,0.3)",
            },
        },
        axisLabel: {},
    },
    dataZoom: [
        {
            show: true,
            height: 12,
            xAxisIndex: [0],
            bottom: "8%",
            start: 10,
            end: 90,
            handleIcon:
                "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",

        },
        {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
        },
    ],
    series: [
        {
            name: "1",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
                normal: {
                    barBorderRadius: 20,
                },
            },
            data: time,
            // data: [21, 34, 54]
        },

    ],
});


</script>
<style scoped>
.chart {
    display: flex;
    justify-content: center;
    text-align: center;
    /* margin-left: -100px; */
    /* height: 600px; */
}
</style>