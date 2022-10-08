//定义关于counter的store
import { defineStore } from "pinia";
export const useCounter = defineStore("useCounter", {
  state: () => ({
    inputContent: "",
    AllList: [],
    list: [],
    currentRow: {},
    level: [
      {
        val: "0",
        label: "低",
      },
      {
        val: "1",
        label: "中",
      },
      {
        val: "2",
        label: "高",
      },
    ],
    levelSelect: "",
    title: "todoList修改",
    checked: false,
    arrComplete: [],
    timeAll: [],
    days: "",
    DateList: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    totalTime: [],
    totalList: [],
    sum: 0,
    notTotalTime: [],
    notTotalList: [],
    notSum: 0,
    notComList: [],
    notComListEvent: [],
    notTimeList: [],
    data: "",
    all: "",
  }),
  getters: {
    isComplete() {
      return this.AllList.filter((item) => item.checked == true).length;
    },
    notComplete() {
      return this.AllList.filter((item) => item.checked == false).length;
    },
    heightQuantity() {
      return this.list.filter((item) => item.levels == "高").length;
    },
    middleQuantity() {
      return this.list.filter((item) => item.levels == "中").length;
    },
    lowQuantity() {
      return this.list.filter((item) => item.levels == "低").length;
    },
    isCompleteEventTime() {
      this.totalTime = [];
      this.sum = 0;
      this.totalList = this.AllList.filter((item) => item.checked == true);
      this.totalList.forEach((item) => {
        this.totalTime.push(item.dayTime);
      });
      for (let i = 0; i < this.totalTime.length; i++) {
        this.sum += this.totalTime[i];
      }
      this.totalTime = [];
      console.log("this.sum", this.sum);

      return this.sum;
    },
    notCompleteEventTime() {
      this.notTotalTime = [];
      this.notSum = 0;

      this.notTotalList = this.AllList.filter((item) => !item.checked);
      this.notTotalList.forEach((item) => {
        this.notTotalTime.push(item.dayTime);
        this.data = item;
      });
      for (let i = 0; i < this.notTotalTime.length; i++) {
        this.notSum += this.notTotalTime[i];
      }
      console.log("this.notSum", this.notSum);
      return this.notSum;
    },
    totalDay() {
      return (
        Number(this.notCompleteEventTime) + Number(this.isCompleteEventTime)
      );
    },
    notCompleteEvent() {
      this.notComListEvent = [];
      this.notComList = this.AllList.filter((item) => item.checked == false);
      this.notComList.forEach((item) => {
        this.notComListEvent.push(item.title);
      });
      return this.notComListEvent;
    },
    notCompleteTime() {
      this.notTimeList = [];
      let notAllList = this.AllList.filter((item) => item.checked == false);
      notAllList.forEach((item) => {
        this.notTimeList.push(item.dayTime);
      });
      return this.notTimeList;
    },
  },
  actions: {
    addList() {
      console.log(11111);

      // console.log("text1", this.levelSelect);
      let flag = false; //默认是没有重复的
      this.AllList.forEach((item) => {
        if (this.inputContent === item.title) {
          flag = true;
        }
      });
      if (flag) {
        alert("有重复的值");
        return;
      }
      if (this.inputContent == "" || this.levelSelect == "") {
        alert("不能为空");
        return;
      }
      this.AllList.push({
        title: this.inputContent,
        levels: this.levelSelect,
        levelValue: this.level.filter((c) => c.label == this.levelSelect)[0]
          .val,
        complete: false,
        checked: false,
        flag: false,
        dayTime: 0, //设置一个空的来接收计算过后的天数值
      });

      this.Save();
      this.list = this.AllList;
      this.inputContent = "";
      this.levelSelect = null;
    },
    deleteList(index) {
      this.list.splice(index, 1);
      this.AllList = this.list;
      this.Save();
    },
    change(item) {
      this.currentRow = item;
      this.checked = true;
      this.Save();
    },
    closeButton() {
      this.checked = false;
      //根据修改后选中的级别获取对应的value值
      const levelLabels = this.level.map((v) => v.label);
      const index = levelLabels.indexOf(this.currentRow.levels);
      this.currentRow.levelValue = index + "";
      this.Save();
    },
    clearComplete() {
      this.AllList = this.AllList.filter((item) => !item.checked);
      this.list = this.AllList;
      this.Save();
    },
    Aescending() {
      this.AllList.sort(function (a, b) {
        return a.levelValue - b.levelValue;
      });
      this.Save();
    },
    Descending() {
      this.AllList.sort(function (a, b) {
        return b.levelValue - a.levelValue;
      });
      this.Save();
    },
    AllButton() {
      this.AllList = this.list;
      console.log("this.AllList", this.AllList);
      console.log("this.list", this.list);
      console.log("this.checked");

      // watch(this.AllList.checked);

      this.Save();
    },
    isCompleteButton() {
      this.list = this.AllList.filter((item) => item.checked);
      this.Save();
    },
    NotCompleteButton() {
      this.list = this.AllList.filter((item) => !item.checked);
    },
    Save() {
      localStorage.setItem("todoList", JSON.stringify(this.AllList));
    },
    shortcuts(item, callback) {
      // console.log("item", item);
      // if (item.time == null) {
      //   alert("不能为空");
      // } else {

      for (let i = 0; i < item.time.length; i++) {
        var date = new Date(item.time[i]);
        let time = date.getTime();
        this.timeAll.push(time);
      }
      let a1 = this.timeAll[0]; //startdate的时间戳
      let a2 = this.timeAll[1]; //enddate的时间戳
      let dis = (a2 - a1) / 1000; //秒数差
      // 一天=60*60*24秒
      this.days = dis / (60 * 60 * 24); //天数差
      let hours = dis / (60 * 60); //天数差
      this.all = this.days;

      // let all = this.days + "天" + hours + "小时";
      // console.log("days", this.days);
      // console.log("hours", hours);
      // localStorage.setItem("todoList", JSON.stringify(AllList.value));
      console.log("all", typeof this.all);

      // return this.days;
      item.dayTime = this.all;
      // console.log("item.time", item.dayTime);
      this.Save();

      this.timeAll = [];

      // }
      if (callback) {
        callback();
      }
    },
    isCompleteTimeSum() {
      for (var i = this.totalTime.length - 1; i >= 0; i--) {
        this.sum += this.totalTime[i];
      }
      return this.sum;
    },
  },
  // persist: {
  //   // 修改存储中使用的键名称，默认为当前 Store的 id
  //   // enabled: true,
  //   // 修改为 sessionStorage，默认为 localStorage
  //   storage: window.sessionStorage,
  //   // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
  //   // paths: ["nested.data"],
  // },
  // persist: true,
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       storage: localStorage, //localStorage存储多个key
  //       paths: ["AllList"],
  //       key: "AllList",
  //     },
  //   ],
  // },
});

export default useCounter;
