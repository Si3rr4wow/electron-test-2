import { MousePosition } from '@react-hook/mouse-position'

export interface ICoordinate {
  x: number | null,
  y: number | null
}

export interface IDraggable {
  id: string,
  position: ICoordinate | null
}

export interface IDraggables {
  [key: string]: IDraggable
}

export interface IDraggableAreaContext {
  mouse: MousePosition | null,
  draggables: IDraggables,
  registerDraggable: (draggable: IDraggable) => void,
  setDraggable: (draggable: IDraggable) => void
}
