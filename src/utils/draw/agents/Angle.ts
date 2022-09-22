import type { Vector } from './Vector';
import { average, getAngleWedge, getDistance, toRadians } from '../../general';

export class Angle {
  private w: number;
  private h: number;
  private dimensionScale: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.dimensionScale = average([w, h]);
  }

  drawOnField = (
    positionA: Vector,
    positionB: Vector,
    positionC: Vector,
    ctx: CanvasRenderingContext2D
  ): void => {
    const [angle1, angle2] = getAngleWedge(positionA, positionB, positionC);

    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';

    ctx.beginPath();
    ctx.moveTo(positionA.x, positionA.y);
    ctx.lineTo(positionB.x, positionB.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(positionB.x, positionB.y);
    ctx.lineTo(positionC.x, positionC.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.translate(positionB.x, positionB.y);
    const dBC = getDistance(positionB, positionC);
    ctx.arc(0, 0, Math.min(this.dimensionScale * 0.2, dBC), angle1, angle2);
    ctx.stroke();
    ctx.restore();
  };

  drawOnDanceFloor = (
    angle: number,
    sunYOffset: number,
    flowerYOffset: number,
    ctx: CanvasRenderingContext2D
  ): void => {
    ctx.save();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';

    ctx.translate(this.w / 2, 0);
    ctx.beginPath();
    ctx.moveTo(0, sunYOffset);
    ctx.lineTo(0, this.h * 0.5);
    ctx.stroke();

    ctx.translate(0, this.h * 0.5);
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    const flip = angle < 0;
    ctx.arc(
      0,
      0,
      this.dimensionScale * 0.2,
      toRadians(-90),
      toRadians(-90) + angle,
      flip
    );
    ctx.stroke();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, flowerYOffset);
    ctx.stroke();
    ctx.restore();
  };
}
