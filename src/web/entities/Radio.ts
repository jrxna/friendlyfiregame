import { Aseprite } from "../Aseprite";
import { asset } from "../Assets";
import { Entity, entity } from "../Entity";
import { RenderingLayer } from "../Renderer";
import { type GameScene } from "../scenes/GameScene";

@entity("radio")
export class Radio extends Entity {
    @asset("sprites/radio.aseprite.json")
    private static readonly sprite: Aseprite;

    public constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 24, 24, false);
    }

    public draw(): void {
        this.scene.renderer.addAseprite(Radio.sprite, "idle", this.x, this.y, RenderingLayer.ENTITIES);

        if (this.scene.showBounds) {
            this.drawBounds();
        }
    }

    public override update(): void {}
}
