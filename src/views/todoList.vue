
<template>
    <el-container>
        <!-- <el-header></el-header> -->
        11000087
        <el-main>
            <el-card class="box-card">
                <div class="todo">
                    {{count}}
                    <h1>todoList</h1>
                    <br />
                    <div class="header">

                        <el-input type="text" placeholder="请输入计划。。。。" v-model="counterStore.inputContent" @keyup.enter="addList()" class="input" />

                        <el-select v-model="counterStore.levelSelect" class="select">
                            <el-option v-for="(item, index) in counterStore.level" :key="index" :value="item.label" :label="item.label">
                                {{ item.label }}
                            </el-option>
                        </el-select>
                        <el-button @click="addList()" class="submit">提交</el-button>

                        <el-button @click="Aescending">升序</el-button>
                        <el-button @click="Descending">降序</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @change="AllButton">全部</el-button>
                        <el-button @click="isCompleteButton">已完成</el-button>
                        <el-button @click="NotCompleteButton">未完成</el-button>
                    </div>
                    <br />
                    <div class="main">
                        <div class="title" fixed>
                            <el-row :gutter="50">
                                <el-col :span="5" class="event">事件名</el-col>
                                <el-col :span="3" class="time">时间</el-col>

                                <el-col :span="3" class="level">等级</el-col>
                                <el-col :span="3" class="change">修改</el-col>
                                <el-col :span="3" class="change">天数</el-col>
                                <el-col :span="2" class="delete-font">删除</el-col>
                            </el-row>
                        </div>
                        <el-scrollbar ref="scrollbarRef" height="300px" always>
                            <div v-if=" counterStore.list.length > 0">
                                <ul>
                                    <li v-for="(item, index) in  counterStore.list" :key="index" :class="item.checked ? 'success' : ''">
                                        <el-row :gutter="20">
                                            <el-col :span="1">
                                                <el-checkbox v-model="item.checked" :disabled="item.checked === true" @change="AllButton">
                                                </el-checkbox>
                                            </el-col>
                                            <el-col :span="3">
                                                <div class="grid-content ep-bg-purple" />
                                                {{ item.title }}
                                            </el-col>
                                            <el-col :span="7">
                                                <div class="grid-content ep-bg-purple" />
                                                <el-date-picker v-model="item.time" value-format="YYYY-MM-DD hh:mm:ss" type="datetimerange" range-separator="To" start-placeholder="Start date" end-placeholder="End date" @change="shortcuts(item)" :disabled="item.checked === true">

                                                    <!-- value-format="YYYY-MM-DD hh:mm:ss" -->
                                                </el-date-picker>

                                            </el-col>
                                            <el-col :span="3">
                                                <div class="grid-content ep-bg-purple" />
                                                {{ item.levels }}
                                            </el-col>
                                            <el-col :span="3">
                                                <div class="grid-content ep-bg-purple" />
                                                <el-button @click="changelist(item)" :disabled="item.checked === true">修改</el-button>
                                            </el-col>
                                            <el-col :span="3">
                                                <div class="grid-content ep-bg-purple" />
                                                {{item.dayTime}}

                                            </el-col>
                                            <el-col :span="4">
                                                <div class="grid-content ep-bg-purple" />
                                                <el-icon @click="delectList(index)" class="delect" :disabled="item.checked === true">
                                                    <el-button>
                                                        <Delete />
                                                    </el-button>
                                                </el-icon>
                                            </el-col>
                                        </el-row>
                                    </li>
                                </ul>
                            </div>
                            <div v-else class="else">
                                <el-empty :image-size="100" />
                            </div>
                        </el-scrollbar>
                    </div>

                    <div class="footerComplete">
                        <div class="judgmentComplete">
                            已完成{{ counterStore.isComplete }}/未完成{{ counterStore.notComplete }}/全部{{ counterStore.AllList.length }}
                        </div>
                        <div class="clearCompleted">
                            <el-button v-if="counterStore.isComplete > 0" @click="clearComplete()">清除已完成</el-button>
                        </div>
                        <div class="levelNumber">
                            <span>高的数量：{{ counterStore.heightQuantity}}</span>
                            <span>中的数量:{{ counterStore.middleQuantity }}</span>
                            <span>低的数量:{{ counterStore.lowQuantity}}||</span>
                        </div>
                        <br />
                        <div>
                            <span>已完成天数的数量:{{ counterStore.isCompleteEventTime}}||</span>
                            <span>未完成天数的数量:{{ counterStore.notCompleteEventTime}}||</span>
                            <span>总天数的数量:{{ counterStore.totalDay}}</span>
                        </div>
                    </div>
                    <!-- 修改 -->
                    <el-dialog v-model="counterStore.checked" title="事件信息修改" width="30%" draggable>
                        <div class="dialog-child" v-if="counterStore.checked">
                            <div class="dialog-body">
                                <!-- <slot>模拟对话框</slot> -->
                                title:
                                <el-input type="text" v-model="counterStore.currentRow.title" @keyup.enter="modifyTodo(item)" />
                                level:<br />
                                <el-select v-model="counterStore.currentRow.levels" placeholder="Please select a zone">
                                    <el-option v-for="(item, index) in counterStore.level" :key="index" :value="item.label" :label="item.label">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button class="close" @click="closeButton(item)">
                                ok
                            </el-button>
                        </div>

                    </el-dialog>
                </div>
                <!-- </teleport> -->
            </el-card>
        </el-main>
        <el-footer id="footerDom" class="bar">
            <!-- <BaseEcharts ref="echart" class="chart" :options="option" /> -->
            <Bar :title="counterStore.notCompleteEvent" :time="counterStore.notCompleteTime" :isShowEchats="isShowEchats"></Bar>
        </el-footer>
        <div class="pie">
            <Pie :height=" counterStore.heightQuantity" :middle=" counterStore.middleQuantity" :low=" counterStore.lowQuantity"></Pie>
        </div>
        <br />

    </el-container>
</template>
<script setup>
// import { storeToRefs } from 'pinia'

import { ref, reactive, onMounted, computed, watch, nextTick, getCurrentInstance } from "vue";
import Bar from "./bar.vue"
import Pie from "./pie.vue"
import useCounter from '../stores/index';
const isShowEchats = ref(true)
const option = ref({})
const counterStore = useCounter()
const { proxy } = getCurrentInstance()
// 日期数组
// const DateList = ref([
//     new Date(2000, 10, 10, 10, 10),
//     new Date(2000, 10, 11, 10, 10),
// ]);
//给数组添加成员
console.log("counterStore.totalDay", counterStore.totalDay);
function addList (item) {
    //es6的写法
    // let newTitles = list.value.map((v) => v.item);
    // if (newTitles.includes("inputContent.value")) {
    //   alert("有重复的值");
    //   return;
    // }
    counterStore.addList(item)
}
// 删除数组成员
function delectList (key) {
    counterStore.deleteList(key);
}
//改变list数据
function changelist (item) {
    counterStore.change(item)
}
//关闭弹窗按钮
function closeButton () {
    counterStore.closeButton()
}
//清除已完成按钮
function clearComplete () {
    counterStore.clearComplete()
}
//切换完成事件的按钮
function isCompleteButton () {
    counterStore.isCompleteButton()
}
//切换未完成事件的按钮
function NotCompleteButton () {
    counterStore.NotCompleteButton()
}
// 显示全部完成事件按钮
function AllButton () {
    counterStore.AllButton()
}
// 升序
function Aescending () {
    counterStore.Aescending()
}
// 降序
function Descending () {
    counterStore.Descending()
}
console.log(" counterStore.isCompleteEventTime", counterStore.isCompleteEventTime);
// 日期缓存
function shortcuts (item) {
    isShowEchats.value = false
    counterStore.shortcuts(item, () => {
        isShowEchats.value = true
        console.log("isShowEchats.value", isShowEchats.value);
    })

}
// const dynamicTitle = computed(() => {
//     return counterStore.notCompleteEvent
// })
// const dynamicSeries = computed(() => {
//     return counterStore.notCompleteTime
// })
// watch(dynamicTitle, (val) => {
//     nextTick(() => {
//         option.value.xAxis.data = val
//         proxy.$refs.echart.renderEcharts(option.value)
//     })
// })
// watch(dynamicSeries, (val) => {
//     nextTick(() => {
//         option.value.series[0].data = val
//         console.log(option.value,"@@")
//         proxy.$refs.echart.renderEcharts(option.value)
//     })
// })

// 刷新
onMounted(() => {
    let stro = JSON.parse(localStorage.getItem("todoList"));
    if (stro) {
        counterStore.AllList = stro;
        counterStore.list = counterStore.AllList;
    }
    // option.value = {
    //     // title: ssss,
    //     backgroundColor: "black",
    //     tooltip: {
    //         trigger: "axis",
    //         axisPointer: {
    //             // 坐标轴指示器，坐标轴触发有效
    //             type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //         },
    //     },

    //     legend: {
    //         // data: ["天数"],
    //         right: 10,
    //         top: 12,
    //         textStyle: {
    //             color: "#fff",
    //         },
    //         itemWidth: 12,
    //         itemHeight: 10,
    //         // itemGap: 35
    //     },
    //     xAxis: {
    //         type: "category",
    //         // data: ["es", "aas", "aa"],
    //         data: counterStore.notCompleteEvent,
    //         axisLine: {
    //             lineStyle: {
    //                 color: "white",
    //             },
    //         },
    //         axisLabel: {
    //             // interval: 0,
    //             // rotate: 40,
    //             textStyle: {
    //                 fontFamily: "Microsoft YaHei",
    //             },
    //         },
    //     },

    //     yAxis: {
    //         type: "value",
    //         axisLine: {
    //             show: false,
    //             lineStyle: {
    //                 color: "white",
    //             },
    //         },
    //         splitLine: {
    //             show: true,
    //             lineStyle: {
    //                 color: "rgba(255,255,255,0.3)",
    //             },
    //         },
    //         axisLabel: {},
    //     },
    //     dataZoom: [
    //         {
    //             show: true,
    //             height: 12,
    //             xAxisIndex: [0],
    //             bottom: "8%",
    //             start: 10,
    //             end: 90,
    //             handleIcon:
    //                 "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
    //             handleSize: "110%",

    //         },
    //         {
    //             type: "inside",
    //             show: true,
    //             height: 15,
    //             start: 1,
    //             end: 35,
    //         },
    //     ],
    //     series: [
    //         {
    //             name: "1",
    //             type: "bar",
    //             barWidth: "15%",
    //             itemStyle: {
    //                 normal: {
    //                     barBorderRadius: 20,
    //                 },
    //             },
    //             data: counterStore.notCompleteTime,
    //             // data: [21, 34, 54]
    //         },

    //     ],
    // }

});

</script>
<style scoped>
/* 最外面样式 */
.box-card {
    height: 600px;
}
/* todoList字体居中 */
h1 {
    text-align: center;
}
/* input输入框样式 */
.input {
    width: 400px;
}
/* 提交按钮样式 */
.submit {
    width: 100px;
}
/*循环的ul  */
ul {
    list-style-type: none;
    border: 1px black solid;
}
/*循环的li  */
li {
    padding: 5px;
}
/* 鼠标经过时候的样式 */
li:hover {
    background-color: #ddd;
}
/* 列表下面的一行字 */
.footerComplete {
    display: flex;
    justify-content: center;
}
/* 删除按钮 */
.delect {
    font-size: 20px;
    cursor: pointer;
    top: 15%;
}
/* 如果数据是空的时候显示的东西 */
.else {
    top: 50px;
    left: 50%;
    position: absolute;
    font-size: 20px;
}
/* 标题todolist下面的选项 */
.header {
    display: flex;
    justify-content: center;
}
/* 事例完成时候的样式 */
.success {
    text-decoration: line-through;
}
/* 事件名字体的样式 */
.event {
    margin-left: 13vh;
}
/* 等级字体的样式 */
.level {
    margin-left: 15vh;
}
/* 删除字体的样式 */
.delete-font {
    margin-left: -5vh;
}
/* 已完成，未完成，全部的位置样式 */
.judgmentComplete {
    flex: 1;
    font-size: 17px;
}
/* 清除已完成按钮的样式 */
.clearCompleted {
    flex: 1;
}
/* level高中低数量的样式 */
.levelNumber {
    font-size: 17px;
}
/* 关闭弹窗的按钮样式 */
.close {
    left: 90%;
}
/* 表格题头的样式 */
.title {
    background: rgb(109, 107, 107);
    color: aliceblue;
}
/* 图表的大小 */
.footerDom {
    width: 1000px;
    height: 2000px;
    padding-bottom: 200px;
}
.chart {
    display: flex;
    justify-content: center;
    text-align: center;
    /* margin-left: -100px; */
    height: 400px;
}
.bar {
    padding-bottom: 400px;
}
</style>