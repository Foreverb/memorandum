<template>
  <transition
    name="my"
    enter-class="my-enter"
    enter-active-class="my-enter-active"
    leave-class="my-leave-to"
    leave-active-class="my-leave-active"
  >
    <div class="listItem_wrap" @dblclick="editBook">
      <div class="head">
        <div class="top">
          <p class="title">{{ infoData.title }}</p>
          <div class="icon_use">
            <span class="edit el-icon-edit" @click="editBook"></span>
            <span class="delete el-icon-delete" @click="deleteBook"></span>
          </div>
        </div>
        <div class="bottom">
          <p class="createTime">{{ infoData.createTime }}</p>
          <p>
            分类：<span>{{
              $store.state.actionHelper.filterType(infoData.typeId)
            }}</span>
          </p>
        </div>
      </div>
      <div class="content">
        {{ infoData.content }}
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>{{ `确认删除【${infoData.title}】这条便签？？？` }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureDelete">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class ListItem extends Vue {
  dialogVisible = false;
  @Prop() infoData: any;
  editBook(): void {
    this.$store.state.showDialog = true;
    this.$store.commit("dispatchEdit", this.infoData);
  }
  deleteBook(): void {
    this.dialogVisible = true;
  }
  sureDelete(): void {
    const result = this.$store.state.actionHelper.delete(this.infoData.indexId);

    if (result) {
      this.$message({
        message: "删除成功！！！",
        type: "success",
      });
      this.$store.commit(
        "dispatchAllData",
        this.$store.state.actionHelper.read()
      );
      this.dialogVisible = false;
    }
  }
}
</script>
<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(10000000px);
}
.v-enter-active,
.v-leave-active {
  transform: all 2s ease;
}
.my-enter,
.my-leave-to {
  opacity: 0;
  transform: translateY(10000000px);
}
.my-enter-active,
.my-leave-active {
  transform: all 2s ease;
}

.head .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head .top .title {
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.icon_use .edit,
.icon_use .delete {
  font-size: 24px;
  margin-left: 20px;
}
.listItem_wrap:hover {
  box-shadow: 0 0 10px #f00;
}
.listItem_wrap {
  width: 27%;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: #999;
  margin-right: 5vw;
}
.head {
  margin: 10px 0px;
}
.bottom {
  display: flex;
  align-items: center;
}
.bottom .createTime {
  margin: 10px 0px;
  margin-right: 10px;
}
.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}
</style>
