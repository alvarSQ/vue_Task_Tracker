<template>
  <div class="tags-list">
    <div
      class="tag-item"
      v-for="item in supportStore.getTags"
      :key="item"
      @click="$emit('tagClick', item)"
      :class="{
        'low-prior': item.title === 'низкий' && item.isActive == true,
        'mid-prior': item.title === 'средний' && item.isActive == true,
        'hi-prior': item.title === 'высокий' && item.isActive == true,
      }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useSupportStore } from "@/store/supportVar.js";
export default {  
  emits: ["tagClick"],
  data() {
    return {};
  },
  computed: {
    ...mapStores(useSupportStore),
  },
};
</script>

<style lang="scss">
.tags-list {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}

.tag-item {
  padding: 8px 22px;
  margin-right: 10px;
  background-color: #fff;
  border-radius: 22px;
  user-select: none;
  cursor: pointer;

  &.low-prior {
    background-color: #6a02fc4b;
  }

  &.mid-prior {
    background-color: #6a02fca8;
  }

  &.hi-prior {
    color: #fff;
    background-color: #6a02fc;
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
