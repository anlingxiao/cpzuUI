<template>
  <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
  >
    <div class="logo" />
    <a-menu
      class="scroll"
      :open-keys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      @click="(item: any) => { menuClick(item) }"
      @openChange="onOpenChange"
    >
      <template v-for="router in staticRouters">
        <template v-if="router.menuShow">
          <a-sub-menu :key="router.path">
            <template #icon>
              <component :is="router.icon" />
            </template>
            <template #title>{{ router.name }}</template>
            <a-menu-item :class="selectItem(router.path, subRouter.path)" v-for="subRouter in router.children" :key="router.path + '/' + subRouter.path">
              {{ subRouter.name }}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import router from "@/router"
import staticRouters from "@/store/static-router";
import { sliceRootPath } from "@/common/function";

export default defineComponent({
  setup() {

    const currRoute = localStorage.getItem('currRoute') === null ? '/app/homepage' : localStorage.getItem('currRoute') as string;

    const state = reactive({
      rootSubmenuKeys: ['/table'],
      selectedKeys: [],
      openKeys: [sliceRootPath(currRoute)],
      selectedClassPath: currRoute
    });

    const selectItem = (rootPath: string, subPath: string) => {
      return (rootPath + '/' + subPath) === state.selectedClassPath ? "ant-menu-item-selected" : '';
    }

    const menuClick = (item: { key: string, keyPath: Array<string>, item: object }) => {
      state.selectedClassPath = item.key;
      router.push(item.key)
    };

    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(key => {
        return state.openKeys.indexOf(key) === -1
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    return {
      ...toRefs(state),
      menuClick,
      onOpenChange,
      selectItem,
      staticRouters: staticRouters.routes,
      PieChartOutlined: 'PieChartOutlined'
    };
  },
});

</script>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
