// seditor ast parser
export const SAstParser = (html: string) => {
  // 设置每个节点标签属性
  // let attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
  function parseTag(tag: string) {
    let res: {
      type: string;
      name: string;
      voidElement: boolean;
      attrs: any;
      children: { type: string; content: string }[];
    } = {
      type: "tag",
      name: "",
      voidElement: false,
      attrs: {},
      children: [],
    };
    let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
    if (tagMatch) {
      // 标签名称为正则匹配的第2项
      res.name = tagMatch[1];
      if (tag.charAt(tag.length - 2) === "/") {
        // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
        res.voidElement = true;
      }
    }
    // 匹配所有的标签正则
    let classList = tag.match(/\s([^'"/\s><]+?)\s*?=\s*?(".*?"|'.*?')/g);

    if (classList && classList.length) {
      for (let i = 0; i < classList.length; i++) {
        // 去空格再以= 分隔字符串  得到['属性名称','属性值']
        let c = classList[i].replace(/\s*/g, "").split("=");
        // 循环设置属性
        if (c[1]) res.attrs[c[0]] = c[1].substring(1, c[1].length - 1);
      }
    }
    return res;
  }

  let result: any[] = [];
  let current: any;
  let level = -1;
  let arr: any = [];
  // let tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
  let tagRE = /<[a-zA-Z\-!/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;

  html.replace(tagRE, function (tag, index: number): any {
    // 判断第二个字符是不是'/'来判断是否open
    let isOpen = tag.charAt(1) !== "/";
    // 获取标签末尾的索引
    let start = index + tag.length;
    // 标签之前的文本信息
    let text = html.slice(start, html.indexOf("<", start));

    let parent;
    if (isOpen) {
      level++;
      // 设置标签属性
      current = parseTag(tag);
      // 判断是否为文本信息，是就push一个text children  不等于'  '
      if (!current.voidElement && text.trim()) {
        current.children.push({
          type: "text",
          content: text,
        });
      }
      // 如果我们是根用户，则推送新的基本节点
      if (level === 0) {
        result.push(current);
      }
      // 判断有没有上层，有就push当前标签
      parent = arr[level - 1];
      if (parent) {
        parent.children.push(current);
      }
      arr[level] = current;
    }
    // 如果不是开标签，或者是空元素：</div><img>
    if (!isOpen || current.voidElement) {
      level--;

      if (!!text.trim()) {
        const currentText = {
          type: "text",
          content: text,
        };
        if (level === -1) {
          result.push(currentText);
        } else {
          parent = arr[level];
          parent.children.push(currentText);
        }
      }
    }
  });
  return result;
};
