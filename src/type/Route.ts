interface Route {
  path: string,
  name: string,
  icon: string | undefined,
  component: object,
  children: undefined | Array<Route>
  menuShow: boolean,
}

export default Route
