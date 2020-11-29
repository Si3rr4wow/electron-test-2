import React, { useState, useEffect } from 'react'

import useTime from '../hooks/useTime'

const getNextForawrdFrame = (currentFrame: number, totalFrames: number) => {
  if (currentFrame === totalFrames - 1) { return 0 }
  return currentFrame + 1
}

const getNextBackwardFrame = (currentFrame: number, totalFrames: number) => {
  if (currentFrame === 0) { return totalFrames - 1 }
  return currentFrame - 1
}

const getNextFrame = (currentFrame: number, totalFrames: number, direction: string) => {
  switch(direction) {
    case 'forward': {
      return getNextForawrdFrame(currentFrame, totalFrames)
    }
    case 'backward': {
      return getNextBackwardFrame(currentFrame, totalFrames)
    }
    default: {
      return getNextForawrdFrame(currentFrame, totalFrames)
    }
  }
}

const getFirstFrame = (direction: string, totalFrames: number) => {
  switch(direction) {
    case 'forward': {
      return 0
    }
    case 'backward': {
      return totalFrames - 1
    }
    default: {
      return 0
    }
  }
}

const getLastFrame = (direction: string, totalFrames: number) => {
  switch(direction) {
    case 'forward': {
      return totalFrames - 1
    }
    case 'backward': {
      return 0
    }
    default: {
      return totalFrames - 1
    }
  }
}

const shouldAdvance = (isPlaying: boolean, gracefulStop: boolean, currentFrame: number, lastFrame: number) => {
  if((
    isPlaying
  ) || (
    !isPlaying && gracefulStop && currentFrame !== lastFrame
  )) { return true }
  return false
}

const AnimatedSvg: React.FC<{
  fps?: number,
  frames: Array<React.FC>,
  isPlaying?: boolean,
  gracefulStop?: boolean,
  direction?: string
}> = ({
  fps = 24,
  frames,
  isPlaying = true,
  gracefulStop = false,
  direction = 'forward'
}) => {
  const [frame, setFrame] = useState(getFirstFrame(direction, frames.length))
  const now = useTime(1000 / fps)

  useEffect(() => {
    if(!shouldAdvance(isPlaying, gracefulStop, frame, getLastFrame(direction, frames.length))) { return }
    setFrame(s => getNextFrame(s, frames.length, direction))
  }, [now])

  const Frame = frames[frame]

  return (
    <Frame/>
  )
}

export default AnimatedSvg
