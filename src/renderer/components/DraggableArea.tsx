import React, { useState, createContext } from 'react'
import useMouse, { MousePosition } from '@react-hook/mouse-position'
import { IDraggable, IDraggables, IDraggableAreaContext } from '../types/draggable'

const initialDraggableAreaContext: IDraggableAreaContext = {
  mouse: null,
  draggables: {},
  registerDraggable: () => {},
  setDraggable: () => {}
}

export const DraggableAreaContext = createContext(initialDraggableAreaContext)

const DraggableArea: React.FC<{}> = ({ children }) => {
  const [draggables, setDraggables] = useState<IDraggables>({})
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

  const setDraggable = (draggable: IDraggable): void => {
    setDraggables(s => ({
      ...s,
      [draggable.id]: draggable
    }))
  }

  const draggableAreaContextValue: IDraggableAreaContext = {
    mouse,
    draggables,
    registerDraggable,
    setDraggable
  }

  return (
    <DraggableAreaContext.Provider value={draggableAreaContextValue}>
      <div
        ref={ref}
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
