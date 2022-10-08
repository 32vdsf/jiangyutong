
<template>
    <div class="bar">
        <BaseEcharts class="chart" :options="option" height="400" />
    </div>
</template>
<script setup >
import { ref } from 'vue'

const option = ref({
    tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
        backgroundColor: 'rgba(3, 16, 42, 0.85)',
        borderColor: 'rgba(114, 190, 253, 0.6)',
        borderWidth: 1,
        padding: 12,
    },
    xAxis: {
        data: ['早乙女露依', '麻生希', '桃谷绘里香', '大桥未久'],

        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.45)',
                width: 1, // 这里是为了突出显示加上的
            },
        },
        axisLabel: {
            color: 'red',
            fontSize: 12,
            fontFamily: 'Bebas',
        },
    },
    yAxis: [{
        name: '消费值',
        type: 'value',
        min: 0,
        minInterval: 1,
        nameTextStyle: {
            fontSize: 12,
            color: 'red',
            padding: [0, 24, 4, 0],
        },
        axisLabel: {
            fontSize: 12,
            color: 'red',
            fontFamily: 'Bebas',
        },
    }, {

    }],
    dataZoom: [],
    series: [{
        type: 'pictorialBar',
        barCategoryGap: '20px',
        symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
        label: {
            show: false,
        },
        itemStyle: {
            normal: {

            },
            emphasis: {
                opacity: 1,
            },
        },
        data: [4675, 2375, 5319, 2275],
        z: 10,
    },
    {

        smooth: false,
        yAxisIndex: 1,
        data: [31, 127, 71, 85],
        itemStyle: {
            normal: {
                color: '#65CF9B',
            },
        },
    }],
});
</script>
<style scoped>
.chart {
    display: flex;
    justify-content: center;
    text-align: center;
    /* margin-left: -100px; */
    height: 400px;
}

</style>