import React from 'react'

import DraggableArea from './components/DraggableArea'
import Draggable from './components/Draggable'
import Droppable from './components/Droppable'

const App: React.FC<{}> = () => {
  return (
    <div style={{ display: 'grid', height: '100%' }}>
      <div className="m-auto" style={{ height: '90%', width: '90%' }}>
      <DraggableArea>
        <div style={{ display: 'grid', gridTemplateColumns: '101px 101px 101px 101px 101px 101px', margin: '100px' }}>
          {
            (new Array(36).fill(0)).map((_, id) => {
              return (
                <Droppable key={`dro_${id}`} id={`dro_${id}`} initialPosition={{ x: (id % 6) * 100 + 4 * (id % 6), y: Math.floor(id / 6) * 100 + 4 * (Math.floor(id / 6)) }}>
                  <div style={{
                    display: 'grid',
                    height: '100px',
                    width: '100px',
                    background: '#82c780'
                  }}>
                    <div className="m-auto">
                      dro_{id}
                    </div>
                  </div>
                </Droppable>
              )
            })
          }
        </div>


          <Draggable id={'dra_1'} initialPosition={{ x: 0, y: 0 }}>
            <div style={{
              display: 'grid',
              height: '100px',
              width: '100px',
              background: '#8082c7'
            }}>
              <div className="m-auto">
                dra_1
              </div>
            </div>
          </Draggable>
      </DraggableArea>
      </div>
    </div>
  )
}

export default App

// <Draggable id={'dra_2'} initialPosition={{ x:400, y: 300 }}>
//   <div style={{ display: 'grid', height: '100%' }}>
//     <div className="m-auto">
//       dra_2
//     </div>
//   </div>
// </Draggable>
// <Draggable id={'dra_3'} initialPosition={{ x: 0, y: 0 }}>
//   <div style={{ display: 'grid', height: '100%' }}>
//     <div className="m-auto">
//       dra_3
//     </div>
//   </div>
// </Draggable>
