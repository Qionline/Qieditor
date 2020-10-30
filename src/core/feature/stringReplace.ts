import { componentsTreePramasProp } from "@/stores/data"

// 内部关键字、使用者禁止使用关键字中出现的值作为变量
const KEY_WORD = {
  QID: "<%Qid%>",
  QIDDOM: "<%QidDom%>",
}

// 字符串替换（替换<% %>中的内容）
export const TmpReplace = function (id: number, tmp: string, compParams: componentsTreePramasProp, globalParams: componentsTreePramasProp): string {
  // 在根div中注入qid <div qid=`q${id}`></div>
  const qidReg = /^<div/
  tmp = tmp.replace(qidReg, `<div qid="q${id}"`)

  // 关键字替换
  tmp = tmp.replace(new RegExp(KEY_WORD.QID), `q${id}`)
  tmp = tmp.replace(new RegExp(KEY_WORD.QIDDOM), `document.querySelectorAll('[qid="q${id}"]')[0]`)

  // 匹配自定义变量替换
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
