import request from '@/apis/request'
import { getTableDataParams } from "@/type/table/FormState";

// 获取table数据
export function getTableData(params: getTableDataParams) {
  return request({
    url: 'table/example1',
    method: 'get',
    params: params
  })
}
