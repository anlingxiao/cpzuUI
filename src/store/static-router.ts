import Route from "@/type/Route";
import TableView from "@/views/table/TableView.vue";
import FrameworkView from "@/views/layout/FrameworkView.vue";

const staticRouters: { routes: Array<Route> } = {
  routes: [
    {
      path: '/table',
      name: '表格数据',
      icon: 'BugOutlined',
      component: FrameworkView,
      children: [
        {
          path: 'example1',
          name: '案例1',
          icon: undefined,
          component: TableView,
          children: undefined,
          menuShow: true
        }
      ],
      menuShow: true,
    }
  ]
}

export default staticRouters;
