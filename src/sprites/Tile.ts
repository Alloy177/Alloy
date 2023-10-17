import * as PIXI from "pixi.js";

import { GAME, TEXT, TILE, GRID } from "../consts";
import { Position, Dimensions } from "../types";

export default class Tile {
    public readonly sprite = new PIXI.Sprite();
    public readonly graphics = new PIXI.Graphics();
    public readonly text = new PIXI.Text("", {
        align: "center",
        fill: 0xF0F0F0,

        fontFamily: TEXT.family,
        fontSize: 64
    });

    private canvasPos: Position = this.returnPositionOnCanvasFromPosition({
        x: 0,
        y: 0
    });
    
    constructor(public power: number = 1, public position: Position = {
        x: 0,
        y: 0
    }) {
        this.updatePosition(position);

        this.sprite.addChild(this.graphics, this.text);
        
        this.graphics
            .beginFill(TILE.background.color)
            .lineStyle(TILE.line.weight)
            .drawRect(0, 0, TILE.width, TILE.height);
        
        this.text.anchor.set(0.5);
        this.text.position.set(TILE.width / 2, TILE.height / 2);
        this.text.text = 2 ** power;
    }

    public updatePosition(position: Position): void {
        this.canvasPos = this.returnPositionOnCanvasFromPosition(position);
        this.sprite.position = this.canvasPos;
    }

    private returnPositionOnCanvasFromPosition(position: Position): Position {
        const {
            x: left,
            y: top
        } = this.getTopLeftOfGrid();
        const spacing = this.getSpacingBetweenTiles();

        const x: number = (left + (GRID.padding.width / 2)) + (TILE.width * position.x) + (spacing.width * position.x);
        const y: number = (top + (GRID.padding.height / 2)) + (TILE.height * position.y) + (spacing.height * position.y);

        return { x, y };
    }

    private getCentreOfGame(): Position {
        const x: number = GAME.width / 2;
        const y: number = GAME.height / 2;
    
        return { x, y };
    }

    private getTopLeftOfGrid(): Position {
        const centre = this.getCentreOfGame();
        
        const x: number = centre.x - (GRID.display.width / 2);
        const y: number = centre.y - (GRID.display.height / 2);
    
        return { x, y };
    }
    
    private getSpacingBetweenTiles(): Dimensions {
        const width: number = ((GRID.display.width - GRID.padding.width) - (TILE.width * GRID.width)) / (GRID.width - 1);
        const height: number = ((GRID.display.height - GRID.padding.height) - (TILE.height * GRID.height)) / (GRID.height - 1);
    
        return { width, height };
    }
}