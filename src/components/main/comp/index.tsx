import React from "react"
import { Divider } from "antd"
import { observer } from "mobx-react-lite"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import "./index.less"
import { useDataStore, useStateStore } from "@/stores"
import { componentsTreePramasProp } from "@/stores/data"

const CompComponent: React.FC = () => {
  const { mainTree, componentsTree, handleSetMainTree, handleSetComponentsTree } = useDataStore()
  const { componetSelectState, handleSetComponetSelectState, handleSetConfMenuState } = useStateStore()

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) {
      return
    }
    handleSetComponetSelectState(destination.index)
    const start = source.droppableId
    const end = destination.droppableId
    if (start === end) {
      let mainTreeArr = [...mainTree]
      const [remove] = mainTreeArr.splice(source.index, 1)
      mainTreeArr.splice(destination.index, 0, remove)
      handleSetMainTree([...mainTreeArr])
      return
    }
    let compTreeArr = [...componentsTree]
    let mainTreeArr = [...mainTree]
    const [remove] = compTreeArr.splice(source.index, 1)
    let resParams: componentsTreePramasProp = {}
    Object.keys(remove.params).forEach(v => {
      resParams[v] = {
        value: remove.params[v].value,
        title: remove.params[v].title,
        type: remove.params[v].type,
      }
    })
    mainTreeArr.splice(destination.index, 0, {
      id: remove.id,
      name: remove.name,
      params: { ...resParams },
      htmlstr: remove.htmlstr,
    })
    handleSetMainTree([...mainTreeArr])

    const item = {
      id: parseInt(Date.parse(new Date().toString()).toString()),
      name: componentsTree[source.index].name,
      params: { ...componentsTree[source.index].params },
      htmlstr: componentsTree[source.index].htmlstr,
    }
    compTreeArr.splice(source.index, 0, item)
    handleSetComponentsTree([...compTreeArr])
  }

  const handleClickComp = (i: number) => {
    handleSetComponetSelectState(i)
    handleSetConfMenuState("comp")
  }
  return (
    <div className="comp-cmp">
      <div className="comp-title">
        <span>组件库</span>
        <span>页面模板</span>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="comp-main">
          <Droppable isDropDisabled droppableId="compLib">
            {provided => (
              <div className="comp-item" ref={provided.innerRef} {...provided.droppableProps}>
                {componentsTree.map((t, i) => (
                  <Draggable draggableId={t.id + ""} index={i} key={t.id}>
                    {(p, s) => (
                      <div className={`comp-item-child  ${s.isDragging ? "comp-item-child-drag" : ""}`} ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} key={t.id}>
                        {t.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <div className="comp-lib-tips">将组件拖拽至右侧</div>
              </div>
            )}
          </Droppable>
          <Divider className="line-vertical" type="vertical" />
          <Droppable droppableId="compTemp">
            {(provided, snapshot) => {
              return (
                <div style={{ backgroundColor: snapshot.isDraggingOver ? "#fff5df" : "" }} className="comp-item" ref={provided.innerRef} {...provided.droppableProps}>
                  {mainTree.map((t, i) => (
                    <Draggable draggableId={t.id + ""} index={i} key={t.id}>
                      {(p, s) => {
                        return (
                          <div
                            onClick={() => handleClickComp(i)}
                            className={`comp-item-child  ${s.isDragging ? "comp-item-child-drag" : ""} ${componetSelectState === i ? "comp-item-child-active" : ""}`}
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                          >
                            {t.name}
                          </div>
                        )
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}

export default observer(CompComponent)
