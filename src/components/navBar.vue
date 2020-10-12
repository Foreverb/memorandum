<template>
  <div class="vueTs-component_navbar-wrap">
    <div class="head">
      <div class="left_img">
        <img src="../assets/logo.png" alt="" />
        <div class="detail">
          <p>yangugbo</p>
          <p>杨古波制作备忘录</p>
        </div>
      </div>
      <div class="right_nav">
        <div class="create_down_load">
          <div class="show" @click="openOrCloseType">
            <p>新建</p>
            <span class="el-icon-arrow-down" style="color: #999"></span>
          </div>
          <ul class="create_item" v-if="showType">
            <li @click="openDialog">
              <span class="el-icon-caret-top cls"></span>
              <p>新建备忘录</p>
            </li>
          </ul>
        </div>
        <div class="type_down_load">
          <div class="show" @click="openOrCloseCreate">
            <p>全部</p>
            <span class="num">{{ $store.state.allLocalData.length }}</span>
            <span class="el-icon-arrow-down" style="color: #999"></span>
          </div>
          <ul class="type_item" v-if="showCreate">
            <li @click="filterShowList(-1)">
              <span class="el-icon-caret-top cls"></span>
              <p>全部</p>
              <span class="num">{{ $store.state.allLocalData.length }}</span>
            </li>
            <li @click="filterShowList(0)">
              <p>工作</p>
              <span class="num">{{ filterLength(0) }}</span>
            </li>
            <li @click="filterShowList(1)">
              <p>学习</p>
              <span class="num">{{ filterLength(1) }}</span>
            </li>
            <li @click="filterShowList(2)">
              <p>生活</p>
              <span class="num">{{ filterLength(2) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ItemData from "@/model/itemData";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  showType = false;
  showCreate = false;
  allData = [];

  created () {
    this.allData = this.$store.state.actionHelper.read();
  }

  filterLength(id: number): any {
    const arr = this.$store.state.allLocalData.filter((val: any) => {
      return val.typeId === id;
    });
    const len = arr.length > 99 ? "99+" : arr.length;
    return len;
  }

  filterShowList(showId: number): void {
    if (showId === -1) {
      this.$store.commit(
        "dispatchAllData",
        this.$store.state.actionHelper.read()
      );
    } else {
      const arr = this.$store.state.actionHelper.read().filter((val: any) => {
        return val.typeId === showId;
      });
      this.$store.commit("dispatchAllData", arr);
    }
  }

  openOrCloseType(): void {
    this.showType = !this.showType;
    this.showCreate = false;
  }
  openOrCloseCreate(): void {
    this.showCreate = !this.showCreate;
    this.showType = false;
  }
  openDialog(): void {
    this.$store.state.showDialog = true;
    this.showType = false;
    this.showCreate = false;
    this.$store.commit("dispatchEdit", new ItemData());
  }
}
</script>
<style scoped>
ul,
li {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.vueTs-component_navbar-wrap {
  background: #eee;
  margin-bottom: 20px;
}
.head {
  width: 80%;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left_img {
  display: flex;
  align-items: center;
}
.left_img .detail {
  margin: 10px;
  color: #999;
}
.left_img p {
  margin: 0px;
}
.left_img img {
  height: 50px;
  width: 50px;
}
.right_nav {
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.create_down_load {
  cursor: default;
}
.create_down_load .show {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
}
.create_down_load p {
  color: #999;
}
.create_item {
  position: absolute;
  background: #fff;
  transform: translateX(-25%);
  top: 60px;
}
.create_item li {
  width: 100px;
  height: 50px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.create_item li:hover {
  background: #ccc;
}
.create_item li .cls {
  position: absolute;
  top: -10px;
  color: #fff;
}
.type_down_load {
  cursor:default;
}
.type_down_load .show {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
}
.type_down_load p {
  color: #999;
}
.type_down_load .show .num {
  width: 25px;
  height: 25px;
  background: #999;
  border-radius: 6px;
  text-align: center;
  line-height: 25px;
  color: #fff;
}
.type_item {
  position: absolute;
  background: #fff;
  top: 60px;
}
.type_item li {
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.type_item li:hover {
  background: #ccc;
}
.type_item li .cls {
  position: absolute;
  top: -10px;
  color: #fff;
}
.type_item li .num {
  width: 30px;
  height: 30px;
  background: #999;
  border-radius: 6px;
  text-align: center;
  line-height: 30px;
  color: #fff;
}
</style>
