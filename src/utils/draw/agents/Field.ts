import { Flower } from './Flower';
import { Vector } from './Vector';

export class Field {
  private w: number;
  private h: number;

  private radius: number;
  private center: Vector;
  private grass: Vector[];

  private fieldColor = '#228C22';
  private grassColor = 'green';

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;

    this.radius = w * 1.5;
    this.center = new Vector(w / 2, h + w * 0.95);
    this.grass = this.generateGrass(400);
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    const { x, y } = this.center;
    ctx.save();
    ctx.fillStyle = this.fieldColor;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI, true);
    ctx.fill();
    ctx.restore();

    this.drawGrass(ctx);
  };

  getCenterOfEarth = (): Vector => this.center;

  isInField = ({ x, y }: Vector) =>
    Math.pow(x - this.center.x, 2) + Math.pow(y - this.center.y, 2) <
    Math.pow(this.radius, 2);

  drawFlower = (flowerLocation: Vector, ctx: CanvasRenderingContext2D) => {
    const flower = new Flower(flowerLocation, this.w, this.h);
    flower.draw(ctx);
  };

  private generateGrass = (num = 100): Vector[] => {
    const { x: centerX, y: centerY } = this.center;
    const grassCords: Vector[] = [];
    for (let i = 0; i < num; i++) {
      const r = this.radius * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const x = centerX + r * Math.cos(theta);
      const y = centerY + r * Math.sin(theta);
      grassCords.push(new Vector(x, y));
    }
    return grassCords;
  };

  private drawGrass = (ctx: CanvasRenderingContext2D) => {
    this.grass.forEach((bladePosition) => {
      const { x, y } = bladePosition;
      const width = 3;
      const height = 10;
      ctx.save();
      ctx.fillStyle = this.grassColor;
      ctx.translate(x, y);
      ctx.fillRect(-width / 2, -height / 2, width, height);
      ctx.restore();
    });
  };
}
