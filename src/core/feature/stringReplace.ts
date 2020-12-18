import { componentsTreePramasProp, ParamArrayType, ParamArrayParamTypeProp } from "@/stores/data"

// 内部关键字、使用者禁止使用关键字中出现的值作为变量
const KEY_WORD = {
  QID: "<%Qid%>",
  QIDDOM: "<%QidDom%>",
}

const handleArrayTypeError = function () {
  throw new Error("配置文件错误：禁止array类型参数中使用array类型参数作为子变量!")
}

const handleArrayTmp = function (template: string, vArray: ParamArrayParamTypeProp[],  comonParams: componentsTreePramasProp) {
  let tmp: string[] = []
  const reg = /<%\w*%>+/g
  const paramsArr = template.match(reg)
  if (!paramsArr) {
    vArray.forEach(() => {
      tmp.push(template)
    })
    return tmp.join("")
  }

  vArray.forEach(el => {
    let vTemp = template
    for (const value of paramsArr) {
      const param = value.split("%")[1]
      if (el[param]) vTemp = vTemp.replace(new RegExp(value), el[param].value)
      else if (comonParams[param]) {
        if (comonParams[param].type === "array") handleArrayTypeError()
        vTemp = vTemp.replace(new RegExp(value), comonParams[param].value as string)
      }
    }
    tmp.push(vTemp)
  })

  return tmp.join("")
}

// 字符串替换（替换<% %>中的内容）
export const TmpReplace = function (id: number, tmp: string, compParams: componentsTreePramasProp, globalParams: componentsTreePramasProp): string {
  // 在根div中注入qid <div qid=`q${id}`></div>
  const qidReg = /<div/
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
    if (compParams[param]) {
      tmp = tmp.replace(
        new RegExp(value),
        compParams[param].type === "array"
          ? handleArrayTmp((compParams[param] as ParamArrayType).template, (compParams[param] as ParamArrayType).value, compParams)
          : (compParams[param].value as string)
      )
    } else if (globalParams[param]) {
      tmp = tmp.replace(
        new RegExp(value),
        globalParams[param].type === "array"
          ? handleArrayTmp((globalParams[param] as ParamArrayType).template, (globalParams[param] as ParamArrayType).value, globalParams)
          : (globalParams[param].value as string)
      )
    }
  }

  return tmp
}
