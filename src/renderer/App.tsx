import React, { useState, useEffect, SyntheticEvent } from 'react'
import useMouse, { MousePosition } from '@react-hook/mouse-position'

console.log("I'm here I'm ready")

const Button: React.FC<{ onClick(): void }> = ({ onClick }) => {
  return (
    <div style={{ height: '200px', border: '4px solid pink' }} onClick={onClick}>

    </div>
  )
}

const App: React.FC<{}> = () => {
  const [testValue, setTestValue] = useState(0)
  const [testString, setTestString] = useState('')

  const ref = React.useRef(null)
  const mouse: MousePosition = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  useEffect(() => {
    setTestValue(Number(mouse.x))
  }, [mouse.x])

  return (
    <div ref={ref}>
      <Button onClick={() => { console.log('clicked') }}>click me</Button>
      <p>Test value is: {testValue}</p>
      Hover me and see where I am relative to the element:
      <br />
       x: ${mouse.x}
       y: ${mouse.y}
    </div>
  )
}

export default App
