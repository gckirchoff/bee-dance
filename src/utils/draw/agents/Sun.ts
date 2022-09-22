import { average, scale, toRadians } from '../../general';
import { Vector } from './Vector';

export class Sun {
  w: number;
  h: number;
  centerOfEarth: Vector;
  radius: number;
  private sunRadius: number;

  // Assigned in draw
  position: Vector | undefined;

  constructor(w: number, h: number, centerOfEarth: Vector) {
    this.w = w;
    this.h = h;
    this.centerOfEarth = centerOfEarth;
    const dimensionScale = average([w, h]);
    this.radius = dimensionScale * 1.67;
    this.sunRadius = dimensionScale * 0.05;
  }

  draw = (timeInMins: number, ctx: CanvasRenderingContext2D): void => {
    const { x: centerX, y: centerY } = this.centerOfEarth;
    const angle = toRadians(
      scale({
        num: timeInMins,
        inRange: [360, 1080],
        outRange: [250, 290],
      })
    );
    const sunX = this.radius * Math.cos(angle);
    const sunY = this.radius * Math.sin(angle);
    this.position = new Vector(sunX, sunY);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = 'yellow';
    ctx.translate(sunX, sunY);
    ctx.beginPath();
    ctx.arc(0, 0, this.sunRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  getPosition = () =>
    new Vector(
      this.position.x + this.centerOfEarth.x,
      this.position.y + this.centerOfEarth.y
    );

  getCorrectedPosition = () =>
    new Vector(
      this.position.x + this.centerOfEarth.x,
      this.position.y + this.centerOfEarth.y
    );
}
