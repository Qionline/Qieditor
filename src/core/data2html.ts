// sdata编译成可导出的json
import { TmpReplace } from "@/core/feature/stringReplace"

import { globalSettingProp, componentsTreeProp } from "@/stores/data"

export interface SData2HtmlFuncProp {
  (globalSetting: globalSettingProp, mainTree: componentsTreeProp[], localString?: string): string
}

// sdata编译成可导出的html
export const SData2Html: SData2HtmlFuncProp = (globalSetting, mainTree, localString = "") => {
  let main = ""
  mainTree.forEach(el => {
    const res = TmpReplace(el.htmlstr, el.params)
    main += res
  })

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${globalSetting.global.title}</title>
    </head>
    <style>body{background-color:${globalSetting.global.bodyColor};direction:${globalSetting.global.direction}}</style>
    <style>${globalSetting.global.css}</style>
    <body>
      <div id="#sapp">${main}</div>
    </body>
    ${localString}
    <script>${globalSetting.global.js}</script>
    <script>console.log(navigator.userAgent);</script>
  </html>
  `
}
