<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import {
    average,
    findAngle,
    getDanceAngle,
    getDistance,
    toDegrees,
    toRadians,
    scale,
  } from '../utils/general';
  import { BEE_WIDTH, BEE_HEIGHT } from '../constants';
  import Bee from '../assets/bee.svg';
  import { Vector } from '../utils/draw/agents/Vector';
  import { Flower } from '../utils/draw/agents/Flower';

  export let sunPosition: Vector;
  export let hivePosition: Vector;
  export let flowerPosition: Vector;

  export let maxDistanceFromHive: number;

  let w: number;
  let h: number;

  // Maybe have $: angle calculated here

  // Or maybe calculate angle and flowerDistance in animate function
  $: flowerDistance = getDistance(hivePosition, flowerPosition);

  let canvas: HTMLCanvasElement;

  // afterUpdate(() => {
  //   console.log('iupdating');
  // });

  onMount(() => {
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    const flower = new Flower(new Vector(0, h * -0.36), w, h);

    const bee = new Image();
    bee.src = Bee;

    let danceRight = true;
    let timeUntilFlip = 4000;
    let lastFlip = 0;

    let animationFrame = requestAnimationFrame(animate);
    function animate(t: number) {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
      canvas.width = w;
      let angle = getDanceAngle(flowerPosition, hivePosition, sunPosition);

      ctx.save();
      ctx.fillStyle = 'yellow';
      ctx.translate(w * 0.5, h * 0.1);
      ctx.beginPath();
      ctx.arc(0, 0, h * 0.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = 'green';
      const sizeScale = average([w, h]);
      const danceLineWidth = sizeScale * 0.02;

      const danceDistanceScale = scale({
        num: flowerDistance,
        inRange: [0, maxDistanceFromHive],
        outRange: [0.6, 1],
      });
      ctx.save();
      ctx.fillStyle = 'grey';
      ctx.strokeStyle = 'grey';
      ctx.lineWidth = danceLineWidth;
      ctx.translate(w * 0.5, h * 0.5);
      ctx.scale(danceDistanceScale, danceDistanceScale); // flower distance scale
      ctx.rotate(angle);
      ctx.fillRect(danceLineWidth * -0.5, h * -0.3, danceLineWidth, h * 0.6);
      ctx.beginPath();
      if (t > lastFlip + timeUntilFlip) {
        danceRight = !danceRight;
        lastFlip = t;
      }
      ctx.arc(0, 0, h * 0.2915, toRadians(90), toRadians(270), danceRight);
      ctx.stroke();

      ctx.save();
      ctx.scale(1 / danceDistanceScale, 1 / danceDistanceScale); // reset flower distance scale
      flower.draw(ctx, -angle);
      ctx.restore();

      ctx.translate(0, h * 0.3);
      ctx.scale(1 / danceDistanceScale, 1 / danceDistanceScale); // reset flower distance scale
      ctx.scale(sizeScale * 0.0004, sizeScale * 0.0004);
      ctx.drawImage(bee, -BEE_WIDTH / 2, -BEE_HEIGHT / 2);

      ctx.restore();

      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  });
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
  <canvas bind:this={canvas} width={200} height={200} />
</div>

<style>
  div {
    height: 100%;
  }
  canvas {
    background-color: rgb(60, 64, 67);
  }
</style>
