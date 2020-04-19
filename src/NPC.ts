import { Entity } from './Entity';
import { Face } from './Face';
import { ScriptedDialog } from './ScriptedDialog';

export abstract class NPC extends Entity {
    public face: Face | null = null;
    public scriptedDialog: ScriptedDialog | null = null;

    public get hasDialog(): boolean {
        return this.scriptedDialog?.hasPlayerDialog ?? false;
    }

    protected drawFace(ctx: CanvasRenderingContext2D): void {
        if (this.face) {
            this.face.draw(ctx);
        }
    }

    protected drawDialog(ctx: CanvasRenderingContext2D): void {
        this.scriptedDialog?.draw(ctx);
    }

    protected updateDialog(dt: number) {
        this.scriptedDialog?.update(dt);
    }
}
