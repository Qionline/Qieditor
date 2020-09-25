// 解析attrs
const AttrsTranslater = (attrs: { [propName: string]: any }): string => {
  let res = "";
  Object.keys(attrs).forEach((key: string) => {
    res += `${key}="${attrs[key]}" `;
  });
  return res;
};

// sast 编译成html字符串
export interface SAstTagItemProp {
  attrs: {};
  children: SAstTagItemProp[];
  name: string;
  type: "tag";
  voidElement: boolean;
}
export interface SAstTextItemProp {
  content: string;
  type: "text";
}
export interface SAstTranslaterProp {
  (tree: (SAstTagItemProp | SAstTextItemProp)[]): string;
}
export const SAstTranslater: SAstTranslaterProp = (tree) => {
  let res = "";
  tree.forEach((el) => {
    if (el.type === "text") {
      res += el.content;
    } else {
      if (el.voidElement) {
        res += `<${el.name} ${AttrsTranslater(el.attrs)}/>`;
      } else {
        res += `<${el.name} ${AttrsTranslater(el.attrs)}>${SAstTranslater(
          el.children
        )}</${el.name}>`;
      }
    }
  });
  return res;
};
