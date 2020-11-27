import React, { useEffect, useContext } from 'react'

import { ICoordinate, IDraggableAreaContext } from '../types/draggable'
import { DraggableAreaContext } from './DraggableArea'

const isInsideWidth = (draggableContext: IDraggableAreaContext, boundingRect: { height: number, width: number }) => {
  return (
    (draggableContext.mouse?.x || 0) + ((boundingRect.width || 0) / 2) < draggableContext.boundingRect.width
  ) && (
    (draggableContext.mouse?.x || 0) - ((boundingRect.width || 0) / 2) > 0
  )
}

const isInsideHeight = (draggableContext: IDraggableAreaContext, boundingRect: { height: number, width: number }) => {
  return (
    (draggableContext.mouse?.y || 0) + ((boundingRect.height || 0) / 2) < draggableContext.boundingRect.height
  ) && (
    (draggableContext.mouse?.y || 0) - ((boundingRect.height || 0) / 2) > 0
  )
}

const Draggable: React.FC<{ id: string, initialPosition: ICoordinate }> = ({ id, initialPosition, children }) => {
  const draggableContext = useContext(DraggableAreaContext)
  const isTarget = draggableContext.target === id
  const draggable = draggableContext.draggables?.[id]
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    draggableContext.registerDraggable({
      id,
      position: initialPosition
    })
  }, [])

  const boundingRect = (() => {
    const height = ref.current?.getBoundingClientRect?.()?.height || 0
    const width = ref.current?.getBoundingClientRect?.()?.width || 0
    return {
      height,
      width
    }
  })()

  useEffect(() => {
    if (!isTarget) { return }
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
    draggableContext.onTargetChange(id)
  }

  const handleMouseUp = () => {
    draggableContext.onTargetChange(null)
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
      style={{
        position: 'absolute',
        zIndex: isTarget ? 1 : 0,
        opacity: isTarget ? 0.8 : 1,
        boxShadow: isTarget ? '0px 4px 9px -3px' : '0px 0px 0px 0px',
        userSelect: 'none',
        height: '100px',
        width: '100px',
        background: '#8082c7',
        top: draggable?.position?.y || initialPosition.y || 0,
        left: draggable?.position?.x || initialPosition.x || 0,
        transition: 'opacity 0.2s, box-shadow 0.2s'
      }}>
      {children}
    </div>
  )
}

export default Draggable
