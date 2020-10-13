export const ScrollPositonSetting = {
  num: 0,
}

export const ScrollPositonCache = function (num: number) {
  return `
    window.scrollTo( 0, ${num} );
    document.addEventListener("scroll",function(){ parent.postMessage(document.documentElement.scrollTop,'*');})
  `
}
