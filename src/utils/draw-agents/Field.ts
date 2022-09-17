export class Field {
  private w: number;
  private h: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.translate(this.w / 2, this.h);
    ctx.beginPath();
    ctx.arc(0, this.w * 0.95, this.w * 1.5, 0, Math.PI, true);
    ctx.fill();
    ctx.restore();
  };
}
