<template>
  <div class="dialog_wrap">
    <el-dialog
      :visible.sync="$store.state.showDialog"
      :show-close="false"
      width="50%"
    >
      <div class="top_msg">
        <el-input
          placeholder="请输入内容"
          style="width: 70%"
          v-model="showData.title"
        ></el-input>
        <el-select placeholder="" style="width: 10%" v-model="showData.typeId">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <span
          class="el-icon-s-claim"
          style="font-size: 30px;"
          @click="saveBook"
        ></span>
        <span
          class="el-icon-error"
          style="font-size: 30px"
          @click="$store.state.showDialog = false"
        ></span>
      </div>
      <div class="bottom_content">
        <el-input
          type="textarea"
          v-model="showData.content"
          placeholder="请输入内容"
          :autosize="{ minRows: 10, maxRows: 20 }"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$store.state.showDialog = false">取 消</el-button>
        <el-button type="primary" @click="closeDialog"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ItemData from "../model/itemData";
@Component({})
export default class Dialog extends Vue {
  showData: ItemData = new ItemData();
  options: Array<any> = [
    {
      value: "工作",
      id: 0,
    },
    {
      value: "学习",
      id: 1,
    },
    {
      value: "生活",
      id: 2,
    },
  ];
  created(): void {
    this.showData = JSON.parse(JSON.stringify(this.$store.state.editData));
    this.showData.typeId =
      this.showData.typeId === -1 ? 0 : this.showData.typeId;
  }
  closeDialog(): void {
    this.saveBook();
    this.$store.state.showDialog = false;
  }
  saveBook() {
    const dataArr = this.$store.state.actionHelper.read();

    if (this.$store.state.editData.typeId === -1) {
      //新增

      const item = new ItemData(
        this.showData.title,
        this.showData.content,
        undefined,
        this.showData.typeId,
        0
      );

      const id = this.$store.state.actionHelper.add(item);

      item.indexId = id;

      dataArr.push(item);

    } else {
      //修改
      const editIndex = dataArr.findIndex((i: any) => {
        return i === this.showData.typeId;
      });
      dataArr.splice(editIndex, 1, this.showData);
    }
    this.$store.commit("dispatchAllData",dataArr)

    this.$store.state.actionHelper.save(dataArr);

    this.$store.state.showDialog = false;

  }
}
</script>
<style scoped>
.bottom_content {
  margin-top: 10px;
}
.dialog_wrap /deep/ .el-dialog__header {
  padding: 0px;
}
.dialog_wrap /deep/ .el-input__icon {
  width: 0px;
}
.dialog_wrap /deep/ .el-input__inner {
  padding-right: 0px;
}
.top_msg {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
