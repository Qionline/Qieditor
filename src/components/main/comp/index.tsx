import React, { useState } from "react"
import { Divider } from "antd"
import { observer } from "mobx-react-lite"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import "./index.less"

const CompComponent: React.FC = () => {
  const [todos, setTodos] = useState([
    {
      id: "a1",
      text: "aaaaa",
    },
    {
      id: "a2",
      text: "bbbbb",
    },
    {
      id: "a3",
      text: "cccccc",
    },
  ])
  const [todos2, setTodos2] = useState([
    {
      id: "a4",
      text: "dddd",
    },
  ])
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
            let arr = Array.from(todos2)
            const [remove] = arr.splice(source.index, 1)
            arr.splice(destination.index, 0, remove)
            setTodos2([...arr])
            return
          }
          let arr1 = Array.from(todos)
          let arr2 = Array.from(todos2)
          const [remove] = arr1.splice(source.index, 1)
          arr2.splice(destination.index, 0, remove)
          setTodos([...arr1])
          setTodos2([...arr2])

          const item = {
            id: Date.parse(new Date().toString()).toString(),
            text: todos[source.index].text,
          }
          arr1.splice(source.index, 0, item)
          setTodos([...arr1])
        }}
      >
        <div className="comp-main">
          <Droppable isDropDisabled droppableId="compLib">
            {provided => (
              <div className="comp-item" ref={provided.innerRef} {...provided.droppableProps}>
                {todos.map((t, i) => (
                  <Draggable draggableId={t.id} index={i} key={t.id}>
                    {(p, s) => (
                      <div className="comp-item-child" ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} key={t.id}>
                        {t.text}
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
                  {todos2.map((t, i) => (
                    <Draggable draggableId={t.id} index={i} key={t.id}>
                      {(p, s) => {
                        return (
                          <div className={`comp-item-child  ${s.isDragging ? "comp-item-child-active" : ""}`} ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                            {t.text}
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
