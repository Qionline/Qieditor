// sdata编译成可导出的json
import { TmpReplace } from "@/core/feature/stringReplace"

import { Local2HtmlProp } from "@/core/local2html"
import { globalSettingProp, componentsTreeProp } from "@/stores/data"

export interface SData2HtmlFuncProp {
  (globalSetting: globalSettingProp, mainTree: componentsTreeProp[], localString?: Local2HtmlProp): string
}

// sdata编译成可导出的html
export const SData2Html: SData2HtmlFuncProp = (globalSetting, mainTree, localString) => {
  let main = ""
  mainTree.forEach(el => {
    const res = TmpReplace(el.id, el.htmlstr, el.params, globalSetting.global.params)
    main += res
  })

  const externalCss = globalSetting.global?.externalCss ? [...globalSetting.global.externalCss] : []
  const externalJs = globalSetting.global?.externalJs ? [...globalSetting.global.externalJs] : []

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${globalSetting.global.title}</title>
      ${externalCss.map(v => `<link rel="stylesheet" href="${v}" />`).join("")}
    </head>
    <style>body{background-color:${globalSetting.global.bodyColor};direction:${globalSetting.global.direction}}</style>
    <style>${globalSetting.global.css}</style>
    ${localString ? localString.ScrollBarHideStyle : ""}
    <body>
      <div id="qiapp">${main}</div>
    </body>
    ${localString ? localString.TypeDisguise : ""}

    ${externalJs.map(v => `<script src="${v}"></script>`).join("")}
    <script>${globalSetting.global.js}</script>

    ${localString ? localString.ScrollPositonCache : ""}
    ${localString ? localString.ComponentScrollToPagePos : ""}
    </html>
  `
}
