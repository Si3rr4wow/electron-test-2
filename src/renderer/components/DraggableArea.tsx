import React, { useState, createContext } from 'react'
import useMouse, { MousePosition } from '@react-hook/mouse-position'
import { IDraggable, IDraggables, IDraggableAreaContext, TTarget } from '../types/draggable'

const initialDraggableAreaContext: IDraggableAreaContext = {
  mouse: null,
  draggables: {},
  dragTarget: null,
  dropTarget: null,
  registerDraggable: () => {},
  onDraggableChange: () => {},
  onDragTargetChange: () => {},
  onDropTargetChange: () => {},
  boundingRect: {
    width: 0,
    height: 0
  }
}

export const DraggableAreaContext = createContext(initialDraggableAreaContext)

const DraggableArea: React.FC<{}> = ({ children }) => {
  const [draggables, setDraggables] = useState<IDraggables>({})
  const [dragTarget, setDragTarget] = useState<TTarget>(null)
  const [dropTarget, setDropTarget] = useState<TTarget>(null)
  const ref = React.useRef<HTMLDivElement>(null)
  const mouse: MousePosition = useMouse(ref, {
    fps: 60
  })

  const registerDraggable = (draggable: IDraggable): void => {
    setDraggables(s => {
      const nextDraggables: IDraggables = {
        ...s,
        [draggable.id]: draggable
      }
      return nextDraggables
    })
  }

  const handleDraggableChange = (draggable: IDraggable): void => {
    setDraggables(s => ({
      ...s,
      [draggable.id]: draggable
    }))
  }

  const handleDragTargetChange = (nextDragTarget: TTarget): void => {
    setDragTarget(nextDragTarget)
  }

  const handleDropTargetChange = (nextDropTarget: TTarget): void => {
    setDropTarget(nextDropTarget)
  }

  const handleMouseUp = () => {
    setDragTarget(null)
    setDropTarget(null)
  }

  const handleMouseLeave = () => {
    setDragTarget(null)
    setDropTarget(null)
  }

  const boundingRect = (() => {
    const height = ref.current?.getBoundingClientRect?.()?.height || 0
    const width = ref.current?.getBoundingClientRect?.()?.width || 0
    return {
      height,
      width
    }
  })()

  const draggableAreaContextValue: IDraggableAreaContext = {
    mouse,
    draggables,
    dragTarget,
    dropTarget,
    registerDraggable,
    onDraggableChange: handleDraggableChange,
    onDragTargetChange: handleDragTargetChange,
    onDropTargetChange: handleDropTargetChange,
    boundingRect
  }

  return (
    <DraggableAreaContext.Provider value={draggableAreaContextValue}>
      <div
        ref={ref}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          height: '100%',
          border: '4px solid pink',
          background: '#b7c3ce'
        }}>
        {children}
      </div>
    </DraggableAreaContext.Provider>
  )
}

export default DraggableArea
