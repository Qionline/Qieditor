import { TypeDisguise } from "@/core/feature/typeDisguise"
import { ScrollPositonCache, ScrollPositonSetting } from "@/core/feature/scrollPositionCache"

import { localSettingProp } from "@/stores/local"
import { localSettingStores } from "@/stores"

export interface Local2HtmlProp {
  ScrollBarHideStyle: string // iframe scroll bar style
  TypeDisguise: string // phone type deceive
  ScrollPositonCache: string // scroll positon cache
  ComponentScrollToPagePos: string // component scroll to page position
}

export const Local2Html = (localSetting: localSettingProp): Local2HtmlProp => {
  if (ScrollPositonSetting.num !== localSetting.scrollPosition) {
    localSettingStores.localSettingStore.handleSetScrollPosition(ScrollPositonSetting.num)
  }
  return {
    ScrollBarHideStyle: `<style>
    ::-webkit-scrollbar {width: 6px;height: 6px;}
    ::-webkit-scrollbar-thumb {background-color: #b3b3b3;border-radius: 8px;}
    ::-webkit-scrollbar-thumb:hover {background-color: #999;}
    ::-webkit-scrollbar-track {background-color: #e3e3e3;border-radius: 8px;}
    body{overflow-y:auto;overflow-y:overlay;}
    </style>`,
    TypeDisguise: `<script>${TypeDisguise(localSetting.phoneType)}</script>`,
    ScrollPositonCache: `<script>${ScrollPositonCache(localSetting.scrollPosition)}</script>`,
    ComponentScrollToPagePos: `<script>function QiSelectQid(id){document.querySelectorAll('[qid="q'+id+'"]')[0].scrollIntoView()}</script>`,
  }
}
