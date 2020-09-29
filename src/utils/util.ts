import { componentsTreePramasProp } from "@/stores/data"

// 字符串替换（替换<% %>中的内容）
export function TmpReplace(tmp: string, params: componentsTreePramasProp): string {
  const reg = /<%\w*%>+/g
  const paramsArr = tmp.match(reg)
  if (!paramsArr) {
    return tmp
  }
  for (const key in params) {
    for (const value of paramsArr) {
      if (value.split("%")[1] === key) {
        tmp = tmp.replace(new RegExp(value), params[key].value)
      }
    }
  }
  return tmp
}
