import React from "react";
import { observer } from "mobx-react-lite";

import { SAstParser } from "@/core/parser";
import { SAstTranslater } from "@/core/translater";

import "./index.less";

const Home: React.FC = () => {

  const handleConsole = () => {};
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    var selectedFile = e.target.files && e.target.files[0]; //获取读取的File对象
    if (!selectedFile) {
      return;
    }
    var name = selectedFile.name; //读取选中文件的文件名
    var size = selectedFile.size; //读取选中文件的大小
    console.log("文件名:" + name + "大小：" + size);
    var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile); //读取文件的内容

    reader.onload = function () {
      console.log("读取结果：", this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
      console.log("读取结果转为JSON：");
      let json = JSON.parse(this.result as string);
      console.log(json);
    };
  };

  const tree = SAstParser(`<div class = 'divClass' style='backgroud:url(./src/asset/img.jpg)' type='c'>
  文本
  <span>文本1</span>  
  <p class='names'>
    文本2
    <div>
      <span class="span"></span>
      1233
    </div>
    文本3
    <img src="https://img.ququyou.com/2019/0529/19293045VUA.jpg" />
  </p>
</div>`);

  console.log(tree);

  const html = SAstTranslater(tree);
  console.log(html);

  return ( <div className="App">
  <div>
    <input
      onChange={(e) => {
        handleFiles(e);
      }}
      type="file"
      id="files"
    />
  </div>
  <div className="btn-group">
    <button onClick={handleConsole}>读取json</button>
    <button onClick={handleConsole}>下载html</button>
  </div>
  <div id="c">
    <iframe
      title="a"
      width="100%"
      height="100%"
      frameBorder="0"
      srcDoc={`<html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Document</title>
    </head>
    <style>.blue{color:blue;}</style>
    <body>
      <div style="color:red;">1234</div>
      <div class="blue">555</div>
      <img src="https://img.ququyou.com/2019/0529/19293045VUA.jpg" />
      <div onclick="func()">555</div>
    </body>
    <script>
      function func(){
        console.log(1)
      }
    </script>
    </html>`}
    />
  </div>
</div>);
};

export default observer(Home);
