import React from "react"
import { Divider } from "antd"
import { observer } from "mobx-react-lite"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import "./index.less"
import { useDataStore } from "@/stores"

const CompComponent: React.FC = () => {
  const { mainTree, componentsTree, handleSetMainTree, handleSetComponentsTree } = useDataStore()
  return (
    <div className="comp-cmp">
      <div className="comp-title">
        <span>组件库</span>
        <span>页面模板</span>
      </div>
      <DragDropContext
        onDragEnd={result => {
          const { source, destination } = result
          if (!destination) {
            return
          }

          const start = source.droppableId
          const end = destination.droppableId
          if (start === end) {
            let arr = Array.from(mainTree)
            const [remove] = arr.splice(source.index, 1)
            arr.splice(destination.index, 0, remove)
            handleSetMainTree([...arr])
            return
          }
          let arr1 = Array.from(componentsTree)
          let arr2 = Array.from(mainTree)
          const [remove] = arr1.splice(source.index, 1)
          arr2.splice(destination.index, 0, remove)
          handleSetComponentsTree([...arr1])
          handleSetMainTree([...arr2])

          const item = {
            id: parseInt(Date.parse(new Date().toString()).toString()),
            name: componentsTree[source.index].name,
            params: { ...componentsTree[source.index].params },
            htmlstr: componentsTree[source.index].htmlstr,
          }
          arr1.splice(source.index, 0, item)
          handleSetComponentsTree([...arr1])
        }}
      >
        <div className="comp-main">
          <Droppable isDropDisabled droppableId="compLib">
            {provided => (
              <div className="comp-item" ref={provided.innerRef} {...provided.droppableProps}>
                {componentsTree.map((t, i) => (
                  <Draggable draggableId={t.id + ""} index={i} key={t.id}>
                    {(p, s) => (
                      <div
                        onClick={() => {
                          console.log(1)
                        }}
                        className={`comp-item-child  ${s.isDragging ? "comp-item-child-active" : ""}`}
                        ref={p.innerRef}
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        key={t.id}
                      >
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
                            onClick={() => {
                              console.log(1)
                            }}
                            className={`comp-item-child  ${s.isDragging ? "comp-item-child-active" : ""}`}
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
