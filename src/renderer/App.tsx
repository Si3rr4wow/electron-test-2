import React from 'react'

import DraggableArea from './components/DraggableArea'
import Draggable from './components/Draggable'
import Droppable from './components/Droppable'

import Lightbulb from './components/Lightbulb'

import AnimatedSvg from './components/AnimatedSvg'

import switchFrames from './svgs/switch/frames'

const App: React.FC<{}> = () => {
  return (
    <div style={{ display: 'grid', height: '100%' }}>
      <div className="m-auto" style={{ height: '90%', width: '90%' }}>
        <DraggableArea>
          {
            (new Array(36).fill(0)).map((_, id) => {
              return (
                <Droppable key={`dro_${id}`} id={`dro_${id}`} initialPosition={{ x: 200 + (id % 6) * 100 + 4 * (id % 6), y: 150 + Math.floor(id / 6) * 100 + 4 * (Math.floor(id / 6)) }} draggable>
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

          <Droppable id={`dro_${36}`} initialPosition={{ x: 900, y: 700 }} draggable>
            <div style={{
              display: 'grid',
              height: '100px',
              width: '100px',
              background: '#82c780'
            }}>
              <div className="m-auto">
                dro_{36}
              </div>
            </div>
          </Droppable>

          <Droppable id={`dro_${37}`} initialPosition={{ x: 950, y: 325 }} draggable>
            <div style={{
              display: 'grid',
              height: '100px',
              width: '100px',
              background: '#82c780'
            }}>
              <div className="m-auto">
                dro_{37}
              </div>
            </div>
          </Droppable>

          <Droppable id={`dro_${38}`} initialPosition={{ x: 950, y: 325 }} draggable>
            <div style={{
              display: 'grid',
              height: '100px',
              width: '100px',
              background: '#82c780'
            }}>
              <div className="m-auto">
                dro_{38}
              </div>
            </div>
          </Droppable>

          <Draggable id={'dra_1'} initialPosition={{ x: 0, y: 0 }}>
            <div style={{
              height: '100px',
              width: '100px',
            }}>
              <Lightbulb voltage={9} current={3} powerRating={30} tolerance={[3, 10]}/>
            </div>
          </Draggable>
          <Draggable id={'dra_2'} initialPosition={{ x: 100, y: 0 }}>
            <div style={{
              height: '100px',
              width: '100px',
            }}>
              <Lightbulb voltage={3} current={3} powerRating={30} tolerance={[3, 10]}/>
            </div>
          </Draggable>

          <Draggable id={'dra_3'} initialPosition={{ x: 200, y: 0 }}>
            <div style={{
              height: '100px',
              width: '100px',
            }}>
              <AnimatedSvg fps={12} frames={switchFrames} isPlaying={true}/>
            </div>
          </Draggable>
          <Draggable id={'dra_4'} initialPosition={{ x: 300, y: 0 }} delay={400}>
            <div style={{
              height: '100px',
              width: '100px',
            }}>
              <AnimatedSvg fps={12} frames={switchFrames} isPlaying={false} direction={'backward'}/>
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
