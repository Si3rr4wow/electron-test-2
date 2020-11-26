import React from 'react'

import DraggableArea from './components/DraggableArea'
import Draggable from './components/Draggable'

const App: React.FC<{}> = () => {
  return (
    <div>
      <DraggableArea>
        <Draggable id={'dra_1'} initialPosition={{ x:100, y: 200 }}>
          <div style={{ display: 'grid', height: '100%' }}>
            <div className="m-auto">
              dra_1
            </div>
          </div>
        </Draggable>
        <Draggable id={'dra_2'} initialPosition={{ x:400, y: 300 }}>
          <div style={{ display: 'grid', height: '100%' }}>
            <div className="m-auto">
              dra_2
            </div>
          </div>
        </Draggable>
        <Draggable id={'dra_3'} initialPosition={{ x: 0, y: 0 }}>
          <div style={{ display: 'grid', height: '100%' }}>
            <div className="m-auto">
              dra_3
            </div>
          </div>
        </Draggable>
      </DraggableArea>
    </div>
  )
}

export default App
