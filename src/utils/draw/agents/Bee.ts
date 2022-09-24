import { average, scale, toRadians } from '../../general';
import { BEE_WIDTH, BEE_HEIGHT } from '../../../constants';
import BeeSVG from '../../../assets/bee.svg';
import { Flower } from './Flower';
import { Vector } from './Vector';

export class Bee {
  private w: number;
  private h: number;
  private sizeScale: number;
  private maxDistanceFromHive: number;
  private bee: HTMLImageElement;
  private flower: Flower;
  private flowerYOffset: number;

  private timeUntilFlip = 4000;
  private lastFlip = 0;
  private danceRight = false;

  constructor(w: number, h: number, maxDistanceFromHive: number) {
    this.w = w;
    this.h = h;
    this.sizeScale = average([w, h]);
    this.maxDistanceFromHive = maxDistanceFromHive;
    const bee = new Image();
    bee.src = BeeSVG;
    this.bee = bee;
    this.flowerYOffset = h * -0.36;
    this.flower = new Flower(new Vector(0, this.flowerYOffset), w, h);
  }
  draw = (
    t: number,
    angle: number,
    flowerDistance: number,
    ctx: CanvasRenderingContext2D
  ): void => {
    const danceLineWidth = this.sizeScale * 0.02;

    const danceDistanceScale = scale({
      num: flowerDistance,
      inRange: [0, this.maxDistanceFromHive],
      outRange: [0.6, 1],
    });
    ctx.save();
    ctx.fillStyle = 'grey';
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = danceLineWidth;
    ctx.translate(this.w * 0.5, this.h * 0.5);
    ctx.scale(danceDistanceScale, danceDistanceScale); // flower distance scale
    ctx.rotate(angle);
    ctx.fillRect(
      danceLineWidth * -0.5,
      this.h * -0.3,
      danceLineWidth,
      this.h * 0.6
    );
    ctx.beginPath();
    if (t > this.lastFlip + this.timeUntilFlip) {
      this.danceRight = !this.danceRight;
      this.lastFlip = t;
    }
    ctx.arc(
      0,
      0,
      this.h * 0.2915,
      toRadians(90),
      toRadians(270),
      this.danceRight
    );
    ctx.stroke();

    ctx.save();
    ctx.scale(1 / danceDistanceScale, 1 / danceDistanceScale); // reset flower distance scale
    this.flower.draw(ctx, -angle);
    ctx.restore();

    ctx.translate(0, this.h * 0.3);
    ctx.scale(1 / danceDistanceScale, 1 / danceDistanceScale); // reset flower distance scale
    ctx.scale(this.sizeScale * 0.0004, this.sizeScale * 0.0004);
    ctx.drawImage(this.bee, -BEE_WIDTH / 2, -BEE_HEIGHT / 2);

    ctx.restore();
  };
}
