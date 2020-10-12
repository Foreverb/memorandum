<template>
    <div class="list_wrap">
      <ListItem
        v-for="item in $store.state.allLocalData"
        :infoData="item"
        :key="item.id"
      />
    </div>
</template>
<script lang="ts">
import ItemData from "@/model/itemData";
import { Vue, Component } from "vue-property-decorator";
import ListItem from "./listItem.vue";
@Component({
  components: {
    ListItem,
  },
})
export default class List extends Vue {
  created(): void {
    this.$store.commit(
      "dispatchAllData",
      this.$store.state.actionHelper.read()
    );
  }
}
</script>
<style scoped>
.list_wrap {
  width: 80%;
  margin: 0 auto;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
}
</style>
