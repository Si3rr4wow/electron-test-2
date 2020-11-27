import React, { useEffect, useContext } from 'react'
import { MousePosition } from '@react-hook/mouse-position'

import { ICoordinate, IDraggableAreaContext } from '../types/draggable'
import { DraggableAreaContext } from './DraggableArea'
import Draggable from './Draggable'

const mouseIsOver = (draggableContext: IDraggableAreaContext, boundingClientRect: DOMRect | undefined) => {
  const mouse: MousePosition | null = draggableContext.mouse
  return (
    (mouse?.clientX || 0) > (boundingClientRect?.left || -1)
  ) && (
    (mouse?.clientX || 0) < (boundingClientRect?.right || Infinity)
  ) && (
    (mouse?.clientY || 0) > (boundingClientRect?.top || -1)
  ) && (
    (mouse?.clientY || 0) < (boundingClientRect?.bottom || Infinity)
  )
}

const Droppable: React.FC<{ id: string, initialPosition: ICoordinate, draggable?: Boolean }> = ({ id, draggable, children, ...props }) => {
  const draggableContext = useContext(DraggableAreaContext)
  const isDropTarget = draggableContext.dropTarget === id
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(mouseIsOver(draggableContext, ref.current?.getBoundingClientRect())) {
      draggableContext.onDropTargetChange(id)
      if(draggableContext.dragTarget && draggableContext.dragTarget !== id) {
        draggableContext.onDraggableChange({
          id: draggableContext.dragTarget,
          position: draggableContext.draggables[id].position
        })
      }
    } else if (isDropTarget) {
      draggableContext.onDropTargetChange(null)
    }
  }, [draggableContext?.mouse?.clientX, draggableContext?.mouse?.clientY])

  return (
    <Draggable
      id={id}
      disabled={!draggable}
      {...props}>
      <div ref={ref} style={{
        color: 'yellow',
        boxShadow: isDropTarget ? '0px 0px 12px 2px' : 'none',
        transition: 'box-shadow 0.2s'
      }}>
        {children}
      </div>
    </Draggable>
  )
}

export default Droppable
