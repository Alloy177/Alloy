import * as PIXI from "pixi.js";

import { GAME, TILE, GRID, KEYS } from "./consts";
import { GridAxis, Position, Keys, InteractionState, Pointer, MovementMethod, Direction } from "./types";

import Tile from "./sprites/Tile";
export default class Game {
    public readonly app = new PIXI.Application({
        width: GAME.width,
        height: GAME.height,

        view: GAME.canvas,

        backgroundColor: GAME.background.color     
    });

    public readonly tiles: Tile[] = [];

    private interactionState: InteractionState = "AWAITING";
    private readonly keys: Keys = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    private readonly pointer: Pointer = {
        up: 0,
        down: 0,
        left: 0,
        right: 0
    };
    
    constructor() {
        window.addEventListener("keydown", ({ key }) => {
            this.interactionState = "INPUTTED";

            this.handleKey(key);

            this.moveTiles("KEYS");
        });
        window.addEventListener("keyup", () => this.interactionState = "AWAITING");

        window.addEventListener("pointerdown", () => this.interactionState = "INPUTTED");
        window.addEventListener("pointerup", () => this.interactionState = "AWAITING");
        window.addEventListener("pointermove", ({ movementX, movementY }) => {
            
        });

        this.addTile();
    }

    public addTile(times: number = 1): void {
        for (let i = 0; i < times; i++) {
            const tile = this.createNewTile();

            this.tiles.push(tile);
            this.app.stage.addChild(tile.sprite);
        }
    }

    public moveTiles(method: MovementMethod): void {
        this.interactionState = "MOVED";

        const direction = this.getDirection(method);
        this.shiftTilesInDirection(direction);

        this.addTile();
    }

    private createNewTile(): Tile {
        const power = this.getRandomStartingPower();
        const position = this.getRandomAvaliablePosition();
        const tile = new Tile(power, position);

        return tile;
    }

    private handleKey(key: string): void {
        const idx = Object.values(KEYS).findIndex((keys) => keys.includes(key));
        const direction = Object.keys(KEYS)[idx] as keyof Keys;
        
        this.keys[direction] = !this.keys[direction];
    }

    private shiftTilesInDirection(direction: Direction): void  {
        switch (direction) {
            case "UP":
            case "DOWN": {
                for (let x = 0; x < GRID.width; x++) {
                    const tiles = this.filterTilesByPosition({
                        x,
                        y: 0
                    }, "X");

                    console.log(tiles);

                    tiles.forEach((tile, y) => tile.updatePosition({
                        x,
                        y: direction === "UP" ? y : (GRID.height - 1) - y
                    }));
                }

                break;
            }
            case "LEFT":
            case "RIGHT": {
                for (let y = 0; y < GRID.width; y++) {
                    const tiles = this.filterTilesByPosition({
                        x: 0,
                        y
                    }, "Y");

                    tiles.forEach((tile, x) => tile.updatePosition({
                        x: direction === "LEFT" ? x : (GRID.width - 1) - x,
                        y
                    }));
                }

                break;
            }
        }
    }

    private getDirection(method: MovementMethod): Direction {
        let key: keyof Keys | keyof Pointer | null = null;
        
        switch (method) {
            case "KEYS": {
                const idx = Object.values(this.keys).findIndex((val) => val === true);
                key = Object.keys(this.keys)[idx] as keyof Keys;

                break;
            }

            case "POINTER": {
                const idx = Math.max(...Object.values(this.pointer));
                key = Object.keys(this.pointer)[idx] as keyof Pointer;

                break;
            }
        }

        const direction = key.toUpperCase() as Direction;
    
        return direction;
    }

    private getRandomAvaliablePosition(): Position {
        const positions = this.getPositionsOfEmptyTiles();
        const chosenPos: Position = positions[Math.floor(Math.random() * (positions.length - 1))];

        return chosenPos;
    }

    private getRandomStartingPower(): number {
        const randomNum = Math.ceil(Math.random() * (TILE.power.chancesPerPower ** (TILE.power.maxStart - 1)));
        const power = Math.floor(Math.log(randomNum) / Math.log(TILE.power.chancesPerPower)) + 1;

        return power;
    }

    private getPositionsOfEmptyTiles(): Position[] {
        const positions: Position[] = Array(GRID.width * GRID.height).map((_, i) => ({
            x: i % 4,
            y: Math.floor(i / 4)
        }));
        
        this.tiles.forEach(({ position }) => {
            const idx = positions.findIndex(() => position);

            positions.splice(idx, 1);
        });

        return positions;
    }

    private filterTilesByPosition({ x, y }: Position, axis: GridAxis): Tile[] {
        const filteredTiles: Tile[] = this.tiles.filter(({
            position: {
                x: tileX,
                y: tileY
            }
        }) => {
            console.log(+axis.includes("X") * +(tileX === x), +axis.includes("Y") * +(tileY === y))
            return +axis.includes("X") * +(tileX === x) || +axis.includes("Y") * +(tileY === y)
        });

       

        return filteredTiles;
    }
}