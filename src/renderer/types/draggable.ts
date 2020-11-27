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

export type TTarget = string | null

export interface IDraggableAreaContext {
  mouse: MousePosition | null,
  draggables: IDraggables,
  dragTarget: TTarget,
  dropTarget: TTarget,
  registerDraggable: (draggable: IDraggable) => void,
  onDraggableChange: (draggable: IDraggable) => void,
  onDragTargetChange: (nextTarget: TTarget) => void,
  onDropTargetChange: (nextTarget: TTarget) => void,
  boundingRect: {
    width: number,
    height: number
  }
}
