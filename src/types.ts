import Tile from "./sprites/Tile";

type InteractionState = "AWAITING" | "INPUTTED" | "MOVED";
type MovementMethod = "KEYS" | "POINTER";
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type GridTile = Tile | null;
type GridAxis = "X" | "Y" | "XY";

interface Position {
    x: number,
    y: number
}

interface Dimensions {
    width: number,
    height: number
}

interface Keys {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
}

interface Pointer {
    up: number,
    down: number,
    left: number,
    right: number
}

export type { Direction, MovementMethod, InteractionState, GridTile, GridAxis, Position, Dimensions, Keys, Pointer };