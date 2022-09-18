import { scale, toRadians } from '../../general';
import type { Vector } from './Vector';

export class Sun {
  w: number;
  h: number;
  centerOfEarth: Vector;
  radius: number;

  constructor(w: number, h: number, centerOfEarth: Vector) {
    this.w = w;
    this.h = h;
    this.centerOfEarth = centerOfEarth;
    this.radius = w * 1.67;
    console.log('this.w', w);
    console.log('this.h', h);
    console.log('this.radius', this.radius);
  }

  draw = (timeInMins: number, ctx: CanvasRenderingContext2D): void => {
    const { x: centerX, y: centerY } = this.centerOfEarth;
    const angle = toRadians(
      scale({
        num: timeInMins,
        inRange: [360, 1080],
        outRange: [255, 285],
      })
    );
    const sunX = this.radius * Math.cos(angle);
    const sunY = this.radius * Math.sin(angle);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = 'yellow';
    ctx.translate(sunX, sunY);
    ctx.beginPath();
    ctx.arc(0, 0, this.h * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
}
