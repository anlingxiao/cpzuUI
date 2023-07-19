// 全路径中截取一级路径
export function sliceRootPath(fullpath: string) {
  return '/' + fullpath?.split('/')[1];
}
