// sast编译成可导出的json
import { TmpReplace } from "@/utils/util"

import { globalSettingProp, componentsTreeProp } from "@/stores/data"

export interface SAst2HtmlFuncProp {
  (globalSetting: globalSettingProp, mainTree: componentsTreeProp[]): string
}

// sast编译成可导出的html
export const SAst2Html: SAst2HtmlFuncProp = (globalSetting, mainTree) => {
  let main = ""
  mainTree.forEach(el => {
    const res = TmpReplace(el.htmlstr, el.params)
    main += res
  })

  return `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${globalSetting.global.title}</title>
    </head>
    <style>body{background-color:${globalSetting.global.bodyColor};direction:${globalSetting.global.direction}}</style>
    <style>${globalSetting.global.css}</style>
    <body>
      <div id="#sapp">${main}</div>
    </body>
    <script>${globalSetting.global.js}</script>
    </html>
  `
}
