export const iosType = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
export const androidType = "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Mobile Safari/537.36"

export const TypeDisguise = function (type: "ios" | "android") {
  return `
    Object.defineProperty(navigator, 'userAgent', {
      value: "${type === "ios" ? iosType : androidType}",
      writable: false
    });
  `
}
