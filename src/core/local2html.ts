import { TypeDisguise } from "@/core/feature/typeDisguise"

import { localSettingProp } from "@/stores/local"

export const Local2Html = (localSetting: localSettingProp) => {
  return `
    <script>
      ${TypeDisguise(localSetting.phoneType)}
    </script>
  `
}
