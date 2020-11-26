import React, { useState, createContext } from 'react'
import useMouse, { MousePosition } from '@react-hook/mouse-position'
import { IDraggable, IDraggables, IDraggableAreaContext, TTarget } from '../types/draggable'

const initialDraggableAreaContext: IDraggableAreaContext = {
  mouse: null,
  draggables: {},
  target: null,
  registerDraggable: () => {},
  onDraggableChange: () => {},
  onTargetChange: () => {}
}

export const DraggableAreaContext = createContext(initialDraggableAreaContext)

const DraggableArea: React.FC<{}> = ({ children }) => {
  const [draggables, setDraggables] = useState<IDraggables>({})
  const [target, setTarget] = useState<TTarget>(null)
  const ref = React.useRef(null)
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

  const handleTargetChange = (nextTarget: TTarget): void => {
    setTarget(nextTarget)
  }

  const handleMouseUp = () => {
    setTarget(null)
  }

  const draggableAreaContextValue: IDraggableAreaContext = {
    mouse,
    draggables,
    target,
    registerDraggable,
    onDraggableChange: handleDraggableChange,
    onTargetChange: handleTargetChange,
    boundingRect: ref.current?.getBoundingClientRect?.()
  }

  return (
    <DraggableAreaContext.Provider value={draggableAreaContextValue}>
      <div
        ref={ref}
        onMouseUp={handleMouseUp}
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
