import React, { useState } from 'react'

console.log("I'm here I'm ready")

const App: React.FC<{}> = () => {
  const [testValue, setTestValue] = useState(0)

  const handleClick = () => {
    console.log('incrimenting test value')
    setTestValue(s => s++)
  }

  return (
    <div>
      <button onClick={handleClick}>click me</button>
      <p>Test value is: {testValue}</p>
    </div>
  )
}

export default App
