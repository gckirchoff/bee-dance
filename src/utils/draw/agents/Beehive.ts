import { roundRect } from '../helpers/shapes';

export class Beehive {
  w: number;
  h: number;
  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.save();
    const bottomWidth = this.w * 0.15;
    const height = this.h * 0.03;
    ctx.fillStyle = 'orange';
    ctx.translate(this.w / 2, this.h);
    ctx.beginPath();
    ctx.arc(0, -height * 4, bottomWidth * 0.4, 0, Math.PI, true);
    ctx.fill();
    ctx.stroke();
    roundRect({
      ctx,
      x: -bottomWidth / 2,
      y: -height,
      width: bottomWidth,
      height,
      radius: 5,
      fill: true,
      stroke: true,
    });
    roundRect({
      ctx,
      x: -bottomWidth / 2 + bottomWidth * (0.05 / 2),
      y: -height * 2,
      width: bottomWidth * 0.95,
      height,
      radius: 5,
      fill: true,
      stroke: true,
    });
    roundRect({
      ctx,
      x: -bottomWidth / 2 + bottomWidth * (0.05 / 2),
      y: -height * 3,
      width: bottomWidth * 0.95,
      height,
      radius: 5,
      fill: true,
      stroke: true,
    });
    roundRect({
      ctx,
      x: -bottomWidth / 2 + bottomWidth * (0.05 / 2),
      y: -height * 4,
      width: bottomWidth * 0.95,
      height,
      radius: 5,
      fill: true,
      stroke: true,
    });
    roundRect({
      ctx,
      x: -bottomWidth / 2 + bottomWidth * (0.1 / 2),
      y: -height * 5,
      width: bottomWidth * 0.9,
      height,
      radius: 5,
      fill: true,
      stroke: true,
    });
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(0, 0, bottomWidth * 0.13, 0, Math.PI, true);
    ctx.fill();
    ctx.restore();
  };
}
