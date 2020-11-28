import React from 'react'

import LightbulbOn from '../svgs/LightbulbOn'
import LightbulbOff from '../svgs/LightbulbOff'

interface IComponentProps {
  voltage: number, //Volts
  current: number, //Amps
  powerRating: number, //Watts
  tolerance: [number, number] //[+Watts, -Watts]
}

const active = ({ voltage, current, powerRating, tolerance }: IComponentProps) => {
  const power: number = voltage * current
  const [upperLimit, lowerLimit]: [number, number] = tolerance.map((deltaP, i) => (
    powerRating + (Math.pow(-1, i) * Math.abs(deltaP))
  ))
  return power > lowerLimit && power < upperLimit
}

const Lightbulb: React.FC<IComponentProps> = (props) => {
  const isActive = active(props)

  return (
    isActive ? <LightbulbOn/> : <LightbulbOff/>
  )
}

export default Lightbulb
