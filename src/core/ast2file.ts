// sast编译成可导出的json
import { globalSettingProp } from "@/stores/data"

export interface SAst2HtmlFuncProp {
  (globalSetting: globalSettingProp, mainTree: string[]): string
}

// sast编译成可导出的html
export const SAst2Html: SAst2HtmlFuncProp = (globalSetting, mainTree) => {
  let main = ""
  mainTree.forEach(el => {
    main += el
  })

  return `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${globalSetting.global.title}</title>
    </head>
    <style>body{background-color:${globalSetting.global.bodyColor};}</style>
    <style>${globalSetting.global.css}</style>
    <body>
      <div id="#sapp">${main}</div>
    </body>
    <script>${globalSetting.global.js}</script>
    </html>
  `
}
