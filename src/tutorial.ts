import { globalSettingProp, componentsTreeProp } from "@/stores/data"

export const globalTutorialConf: globalSettingProp = {
  filename: "Qieditor",
  global: {
    title: "Qieditor使用说明",
    direction: "ltr",
    bodyColor: "#f5e9dd",
    css:
      '\n    body {\n        font-family: Arial, Helvetica, sans-serif;\n      }\n      section,\n      div {\n        font-size: 0.12rem;\n      }\n\n      body,\n      ul,\n      p {\n        margin: 0;\n        padding: 0;\n      }\n\n      a {\n        display: block;\n        text-decoration: none;\n      }\n      ul {\n        list-style: none;\n      }\n\n      input[type="text"],\n      button,\n      textarea {\n        border: none;\n        outline: none;\n      }\n\n      textarea {\n        resize: none;\n      }\n    @keyframes sharked {\n        0% {\n          transform: rotate(0deg);\n        }\n        10% {\n          transform: rotate(1.5deg);\n        }\n        20% {\n          transform: rotate(-1deg);\n        }\n        30% {\n          transform: rotate(0.7deg);\n        }\n        40% {\n          transform: rotate(-0.2deg);\n        }\n        50% {\n          transform: rotate(0deg);\n        }\n        100% {\n          transform: rotate(0deg);\n        }\n      }\n\n      h3 {\n        margin-bottom: 0.1rem;\n        font-size: 0.25rem;\n        text-align: center;\n        color: #e07300;\n      }\n      h4 {\n        margin-bottom: 0.1rem;\n        font-size: 0.2rem;\n        text-align: center;\n        color: #e07300;\n      }\n      .title-common {\n        margin: 0 auto;\n        padding: 0.2rem 0 0.1rem;\n        font-size: 0.13rem;\n      }\n      .text-common {\n        margin: 0 auto;\n        padding: 0.15rem 0.2rem;\n        width: 90%;\n        font-size: 0.13rem;\n        line-height: 0.22rem;\n        border-radius: 0.1rem;\n        box-sizing: border-box;\n      }\n      .top-title p {\n        color: #fff;\n        background-color: #e26a4a;\n      }\n      .orange-p {\n        color: #fff;\n        background-color: #e29b4a;\n      }\n      .tips {\n        margin-top: 5px;\n        padding: 3px;\n        font-size: 0.12rem;\n        text-align: center;\n        animation: sharked 2s linear infinite;\n      }\n\n      .yellow-text {\n        color: #bdb401;\n      }\n      .yellow-p {\n        background-color: #bdb401;\n        color: #fff;\n      }\n\n      .green-text {\n        color: #009208;\n      }\n      .green-p {\n        background-color: #009208;\n        color: #fff;\n      }\n      .blue-text {\n        color: #008da9;\n      }\n      .blue-p {\n        background-color: #008da9;\n        color: #fff;\n      }\n      .indigo-text {\n        color: #29408c;\n      }\n      .indigo-p {\n        background-color: #29408c;\n        color: #fff;\n      }\n      .purple-p {\n        background-color: #6e2c92;\n        color: #fff;\n      }',
    js:
      'function Flexible(designWidth, maxWidth) {\n      var doc = document,\n        win = window,\n        docEl = doc.documentElement,\n        remStyle = document.createElement("style"),\n        tid\n\n      function refreshRem() {\n        var width = docEl.getBoundingClientRect().width\n        maxWidth = maxWidth || 540\n        width > maxWidth && (width = maxWidth)\n        var rem = (width * 100) / designWidth\n        remStyle.innerHTML = "html{font-size:" + rem + "px;}"\n      }\n\n      if (docEl.firstElementChild) {\n        docEl.firstElementChild.appendChild(remStyle)\n      } else {\n        var wrap = doc.createElement("div")\n        wrap.appendChild(remStyle)\n        doc.write(wrap.innerHTML)\n        wrap = null\n      }\n      refreshRem()\n\n      win.addEventListener(\n        "resize",\n        function () {\n          clearTimeout(tid)\n          tid = setTimeout(refreshRem, 300)\n        },\n        false\n      )\n\n      win.addEventListener(\n        "pageshow",\n        function (e) {\n          if (e.persisted) {\n            clearTimeout(tid)\n            tid = setTimeout(refreshRem, 300)\n          }\n        },\n        false\n      )\n\n      if (doc.readyState === "complete") {\n        doc.body.style.fontSize = "16px"\n      } else {\n        doc.addEventListener(\n          "DOMContentLoaded",\n          function (e) {\n            doc.body.style.fontSize = "16px"\n          },\n          false\n        )\n      }\n    }\n    Flexible(375, 750)',
    params: {
      globalTitle: {
        type: "radio",
        title: "所有组件都可访问的自定义公共配置",
        value: "Qieditor",
        radioArr: ["Hello", "Qieditor", "!!!"],
      },
    },
  },
}

export const mainTutorialConf: componentsTreeProp[] = [
  {
    id: 0,
    name: "Hi! Qieditor",
    params: {},
    htmlstr:
      '<div class="top-title">\n        <h3>Qieditor 功能简介</h3>\n        <p class="text-common">Qieditor 是为提高运营活动静态页面搭建效率、降低开发成本而生的html可视化编辑器...让运营同学通过拖拽、配置的形式完成页面输出，无需关心技术细节问题即可快速搭建页面。</p>\n      </div>',
  },
  {
    id: 1,
    name: "左侧功能介绍",
    params: {},
    htmlstr:
      '<div class="left-tipic">\n        <h4>👈👈 左侧功能介绍 👈👈</h4>\n        <h4 class="title-common"><%globalTitle%>组件库</h4>\n        <div class="text-common orange-p">开发同学配置好的不同组件，<b>本身编辑器无法更改其内容</b>，只能通过拖拽的方式将其拖入页面模版中。</div>\n        <div class="text-common orange-p tips">PS:请尝试将"功能介绍组件"拖入到"左侧功能介绍"的下方</div>\n      </div>',
  },
]

export const componentsTutorialConf: componentsTreeProp[] = [
  {
    id: 2,
    name: "功能介绍组件",
    params: {},
    htmlstr:
      '<div>\n        <h4 class="title-common yellow-text"><%globalTitle%>页面模板</h4>\n        <div class="text-common yellow-p">较于组件库，页面模板支持拖拽页面模版中的模块在内部动态的改变模块的顺序。</div>\n        <h4>👉👉 右侧功能介绍 👉👉</h4>\n        <h4 class="title-common green-text"><%globalTitle%>全局配置</h4>\n        <div class="text-common green-p">\n          <div>导出文件名：页面导出时的文件名</div>\n          <div>----------------------------------------</div>\n          <div>页面标题：页面在tab栏中的名称</div>\n          <div>----------------------------------------</div>\n          <div>阅读方向：根据不同语言的阅读习惯可选择从右到左或从左到右布局</div>\n          <div>----------------------------------------</div>\n          <div>背景颜色：页面的背景色设置</div>\n        </div>\n        <h4 class="title-common blue-text"><%globalTitle%>组件配置</h4>\n        <div class="text-common blue-p">每个组件的配置是由程序定义的，编辑器中只可修改已定义的组件选项。</div>\n        <div class="text-common blue-p tips">PS:请尝试将"配置测试组件"拖入到"功能介绍组件"的下方</div>\n      </div>',
  },
  {
    id: 3,
    name: "配置测试组件",
    params: {
      testp: {
        type: "text",
        title: "请修改文本框中的内容",
        value: "点击右侧组件配置，尝试修改文本框中的内容，并查看该模块本文内容变化",
      },
    },
    htmlstr:
      '<div>\n        <h4 class="title-common indigo-text"><%globalTitle%>尝试修改配置</h4>\n        <div class="text-common indigo-p"><%testp%></div>\n\n        <h4>👆👆 菜单/文件介绍 👆👆</h4>\n        <div class="text-common purple-p" style="margin-bottom: 0.2rem;">\n          <div>导入配置文件：把配置文件导入页面（⚠️注意要导入.json结尾的配置文件）</div>\n          <div>----------------------------------------</div>\n          <div>导出配置文件：导出的配置文件会保存你当前的更改内容</div>\n          <div>----------------------------------------</div>\n          <div>下载页面：下载出浏览器可读的html文件，将此页面放置于服务器即可正常访问页面内容！</div>\n          <div>----------------------------------------</div>\n          <div>最后：你可以尝试先导出该配置文件，然后刷新页面，再导入改配置文件查看效果</div>\n        </div>\n      </div>',
  },
]
