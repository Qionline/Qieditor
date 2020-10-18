import { componentsTreePramasProp } from "@/stores/data"

// 字符串替换（替换<% %>中的内容）
export const TmpReplace = function (tmp: string, compParams: componentsTreePramasProp, globalParams: componentsTreePramasProp): string {
  const reg = /<%\w*%>+/g
  const paramsArr = tmp.match(reg)
  if (!paramsArr) return tmp
  for (const value of paramsArr) {
    const param = value.split("%")[1]
    if (compParams[param]) tmp = tmp.replace(new RegExp(value), compParams[param].value)
    if (globalParams[param]) tmp = tmp.replace(new RegExp(value), globalParams[param].value)
  }
  return tmp
}
