import React, { useEffect, useContext } from 'react'
import useMouse, { MousePosition } from '@react-hook/mouse-position'

import { ICoordinate } from '../types/draggable'
import { DraggableAreaContext } from './DraggableArea'

const Draggable: React.FC<{ id: string, initialPosition: ICoordinate }> = ({ id, initialPosition, children }) => {
  const draggableContext = useContext(DraggableAreaContext)
  const draggable = draggableContext.draggables?.[id]
  const ref = React.useRef(null)
  const mouse: MousePosition = useMouse(ref, {
    fps: 120
  })

  useEffect(() => {
    draggableContext.registerDraggable({
      id,
      position: initialPosition
    })
  }, [])

  useEffect(() => {
    if (!mouse.isDown) { return }
    console.log(mouse)
    const nextPosition: ICoordinate = {
      x: (draggableContext.mouse?.x || 0) - ((mouse.elementWidth || 0) / 2),
      y: (draggableContext.mouse?.y || 0) - ((mouse.elementHeight || 0) / 2)
    }
    console.log(nextPosition)
    draggableContext.setDraggable({
      id,
      position: nextPosition
    })
  }, [mouse.isDown, draggableContext.mouse?.x, draggableContext.mouse?.y])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        userSelect: 'none',
        height: '100px',
        width: '100px',
        background: '#8082c7',
        top: draggable?.position?.y || initialPosition.y || 0,
        left: draggable?.position?.x || initialPosition.x || 0
      }}>
      {children}
    </div>
  )
}

export default Draggable
