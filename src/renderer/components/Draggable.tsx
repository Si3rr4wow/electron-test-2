import React, { useEffect, useContext } from 'react'

import { ICoordinate, IDraggableAreaContext } from '../types/draggable'
import { DraggableAreaContext } from './DraggableArea'

const isInsideWidth = (draggableContext: IDraggableAreaContext, boundingRect: { height: number, width: number }) => {
  return (
    (draggableContext.mouse?.x || 0) + ((boundingRect.width || 0) / 2) <= draggableContext.boundingRect.width
  ) && (
    (draggableContext.mouse?.x || 0) - ((boundingRect.width || 0) / 2) >= 0
  )
}

const isInsideHeight = (draggableContext: IDraggableAreaContext, boundingRect: { height: number, width: number }) => {
  return (
    (draggableContext.mouse?.y || 0) + ((boundingRect.height || 0) / 2) <= draggableContext.boundingRect.height
  ) && (
    (draggableContext.mouse?.y || 0) - ((boundingRect.height || 0) / 2) >= 0
  )
}

const Draggable: React.FC<{ id: string, initialPosition: ICoordinate, disabled?: Boolean }> = ({ id, initialPosition, disabled, children }) => {
  const draggableContext = useContext(DraggableAreaContext)
  const isDragTarget = draggableContext.dragTarget === id
  const draggable = draggableContext.draggables?.[id]
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(`registering ${id}`)
    draggableContext.registerDraggable({
      id,
      position: initialPosition
    })
  }, [id, initialPosition])

  const boundingRect = (() => {
    const height = ref.current?.getBoundingClientRect().height || 0
    const width = ref.current?.getBoundingClientRect().width || 0
    return {
      height,
      width
    }
  })()

  useEffect(() => {
    if (!isDragTarget || disabled || draggableContext.dropTarget) { return }
    const nextX: number = isInsideWidth(draggableContext, boundingRect) ? (
      (draggableContext.mouse?.x || 0) - ((boundingRect.width || 0) / 2)
    ) : (
      draggable?.position?.x || 0
    )
    const nextY: number = isInsideHeight(draggableContext, boundingRect) ? (
      (draggableContext.mouse?.y || 0) - ((boundingRect.height || 0) / 2)
    ) : (
      draggable?.position?.y || 0
    )
    const nextPosition: ICoordinate = {
      x: nextX,
      y: nextY
    }
    draggableContext.onDraggableChange({
      id,
      position: nextPosition
    })
  }, [draggableContext.mouse?.x, draggableContext.mouse?.y])

  const handleMouseDown = () => {
    if(disabled) { return }
    draggableContext.onDragTargetChange(id)
  }

  const handleMouseUp = () => {
    if(disabled) { return }
    draggableContext.onDragTargetChange(null)
  }

  const { x, y } = (() => {
    return {
      x: typeof draggable?.position?.y === 'number' ? draggable?.position?.y : initialPosition.y || 0,
      y: typeof draggable?.position?.x === 'number' ? draggable?.position?.x : initialPosition.x || 0
    }
  })()

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left:0,
        zIndex: isDragTarget ? 1 : 0,
        opacity: isDragTarget ? 0.8 : 1,
        boxShadow: isDragTarget ? '0px 4px 9px -3px' : '0px 0px 0px 0px',
        userSelect: 'none',
        transform: `translate(${y}px, ${x}px)`,
        transition: 'opacity 0.2s, box-shadow 0.2s'
      }}>
      {children}
    </div>
  )
}

export default Draggable
