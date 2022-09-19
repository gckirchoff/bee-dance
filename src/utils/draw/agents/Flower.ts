import type { Vector } from './Vector';
import { average, toRadians } from '../../general';
import { roundRect } from '../helpers/shapes';

export class Flower {
  private flowerLocation: Vector;
  private w: number;
  private h: number;
  private numOfPetals = 5;
  private stemColor = '#006C00';
  private flowerHeadColor = '#f8d568';
  private petalColor = 'white';

  constructor(flowerLocation: Vector, w: number, h: number) {
    this.flowerLocation = flowerLocation;
    this.w = w;
    this.h = h;
    this.numOfPetals = 5;
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.save();
    const { x: flowerX, y: flowerY } = this.flowerLocation;
    ctx.translate(flowerX, flowerY);
    const scale = average([this.w, this.h]);
    const stemWidth = scale * 0.005;
    const stemHeight = scale * 0.05;
    ctx.fillStyle = this.stemColor;
    ctx.fillRect(-stemWidth / 2, -stemHeight, stemWidth, stemHeight);
    const flowerHeadRadius = scale * 0.012;
    ctx.translate(0, -stemHeight);
    this.drawPetals(this.numOfPetals, flowerHeadRadius, scale, ctx);
    ctx.fillStyle = this.flowerHeadColor;
    ctx.beginPath();
    ctx.arc(0, 0, flowerHeadRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  private drawPetals = (
    numOfPetals: number,
    flowerHeadRadius: number,
    scale: number,
    ctx: CanvasRenderingContext2D
  ) => {
    for (let i = 0; i < numOfPetals; i++) {
      const slice = toRadians(360 / numOfPetals);
      const angle = slice * i;
      const x = flowerHeadRadius * Math.sin(angle);
      const y = flowerHeadRadius * Math.cos(angle);
      const petalWidth = scale * 0.01;
      const petalHeight = scale * 0.025;
      ctx.save();
      ctx.fillStyle = this.petalColor;
      ctx.translate(x, y);
      ctx.rotate(-angle - toRadians(90));

      ctx.beginPath();
      roundRect({
        ctx,
        x: 0,
        y: -petalWidth / 2,
        width: petalWidth,
        height: petalHeight,
        radius: 3,
        fill: true,
      });
      ctx.fill();
      ctx.restore();
    }
  };
}
