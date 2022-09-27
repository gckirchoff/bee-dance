import { average, scale, toDegrees, toRadians } from '../../general';
import { BEE_WIDTH, BEE_HEIGHT } from '../../../constants';
import BeeSVG from '../../../assets/bee.svg';
import { Flower } from './Flower';
import { Vector } from './Vector';

enum DanceStage {
  WAGGLE = 'waggle',
  ROUND = 'round',
}

export class BeeAgent {
  private w: number;
  private h: number;
  private sizeScale: number;
  private maxDistanceFromHive: number;
  private bee: HTMLImageElement;
  private flower: Flower;
  private flowerYOffset: number;

  // constants
  private waggleMin = 1000;
  private waggleMax = 3000;
  private waggleAngle = toRadians(3);

  // Updated in this.updateBeePosition()
  private timeUntilFlip = 0;
  private roundDuration = 2000;
  private lastFlip = 0;
  private danceRight = false;
  private previousFlowerDistance = 0;
  private danceStage = DanceStage.WAGGLE;

  private x = 0;
  private y = 0;
  private beeAngle = 0;

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
  draw = (angle: number, ctx: CanvasRenderingContext2D): void => {
    const danceLineWidth = this.sizeScale * 0.02;

    // const danceDistanceScale = scale({
    //   num: flowerDistance,
    //   inRange: [0, this.maxDistanceFromHive],
    //   outRange: [0.6, 1],
    // });
    const danceDistanceScale = 1;
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
    this.applyBeeTransforms(ctx);
    ctx.scale(this.sizeScale * 0.0004, this.sizeScale * 0.0004);
    ctx.drawImage(this.bee, -BEE_WIDTH / 2, -BEE_HEIGHT / 2);

    ctx.restore();
  };

  updateBeePosition = (t: number, flowerDistance: number) => {
    const wagglePortionDuration = scale({
      num: flowerDistance,
      inRange: [0, this.maxDistanceFromHive],
      outRange: [1000, 3000],
    });

    if (this.lastFlip === 0) {
      this.lastFlip = t;
      this.previousFlowerDistance = flowerDistance;
    }

    if (this.previousFlowerDistance !== flowerDistance) {
      this.resetBeePosition(t);
      this.previousFlowerDistance = flowerDistance;
    }

    this.timeUntilFlip = this.roundDuration + wagglePortionDuration;

    if (t > this.lastFlip + this.timeUntilFlip) {
      this.danceRight = !this.danceRight;
      this.resetBeePosition(t);
    }

    const timeInCircuit = t - this.lastFlip;
    const inWaggle = timeInCircuit <= wagglePortionDuration;

    if (inWaggle) {
      this.danceStage = DanceStage.WAGGLE;
      const distanceToCover = this.h * 0.6;
      const percentThroughWaggle =
        (timeInCircuit / wagglePortionDuration) * 100;
      this.y =
        scale({
          num: percentThroughWaggle,
          inRange: [0, 100],
          outRange: [0, distanceToCover],
        }) * -1;

      this.updateWaggleAngle();
    } else {
      this.danceStage = DanceStage.ROUND;
      const percentThroughRound = ((timeInCircuit - wagglePortionDuration) / this.roundDuration) * 100;
      const radius = this.h * 0.3;
      const angle =
        scale({
          num: percentThroughRound,
          inRange: [0, 100],
          outRange: [0, Math.PI],
        }) + toRadians(this.danceRight ? -90 : 90);
      const flip = this.danceRight ? 1 : -1;
      this.x = radius * Math.cos(angle * flip);
      this.y = radius * Math.sin(angle * flip) - this.h * 0.3;
      this.beeAngle = angle * flip + toRadians(180);
      this.beeAngle = this.danceRight ? angle + toRadians(180) : angle * flip;
    }
  };

  resetBeePosition = (newLastFlipTime?: number) => {
    this.x = 0;
    this.y = 0;
    this.beeAngle = 0;
    if (newLastFlipTime) {
      this.lastFlip = newLastFlipTime;
    }
  };

  private applyBeeTransforms = (ctx: CanvasRenderingContext2D) => {
    ctx.translate(this.x, this.y);
    if (this.danceStage === DanceStage.WAGGLE) {
      ctx.rotate(this.waggleAngle);
    } else if (this.danceStage === DanceStage.ROUND) {
      ctx.rotate(this.beeAngle);
    }
  };

  private updateWaggleAngle = () => {
    if (Math.random() > 0.3) {
      this.waggleAngle = -this.waggleAngle;
    }
  };
}
