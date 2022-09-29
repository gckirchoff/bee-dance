<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import {
    average,
    getDanceAngle,
    getDistance,
    toRadians,
    scale,
  } from '../utils/general';
  import { BEE_WIDTH, BEE_HEIGHT } from '../constants';
  import Bee from '../assets/bee.svg';
  import { Vector } from '../utils/draw/agents/Vector';
  import { Flower } from '../utils/draw/agents/Flower';
  import { Angle } from '../utils/draw/agents/Angle';
  import { Sun } from '../utils/draw/agents/Sun';
  import { BeeAgent } from '../utils/draw/agents/Bee';

  export let sunPosition: Vector;
  export let hivePosition: Vector;
  export let flowerPosition: Vector;

  export let maxDistanceFromHive: number;
  export let flowerAmount = 1;
  export let showAngle = false;
  export let animateBee = false;

  let w: number;
  let h: number;

  // Maybe have $: angle calculated here
  $: angle = getDanceAngle(flowerPosition, hivePosition, sunPosition);

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

    const flowerYOffset = h * -0.36;
    const flower = new Flower(new Vector(0, flowerYOffset), w, h);
    const angleAgent = new Angle(w, h);
    const sun = new Sun(w, h, new Vector(0, 0));

    const bee = new Image();
    bee.src = Bee;

    let danceRight = true;
    let timeUntilFlip = 4000;
    let lastFlip = 0;

    const beeAgent = new BeeAgent(w, h, maxDistanceFromHive);

    let animationFrame = requestAnimationFrame(animate);
    function animate(t: number) {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
      canvas.width = w;
      const sizeScale = average([w, h]);
      const sunYOffset = h * 0.1;

      sun.drawOnDanceFloor(sunYOffset, ctx);

      const danceLineWidth = sizeScale * 0.02;

      const danceDistanceScale = scale({
        num: flowerDistance,
        inRange: [0, maxDistanceFromHive],
        outRange: [0.6, 1],
      });

      if (animateBee) {
        beeAgent.updateBeePosition({
          t,
          flowerDistance,
          waggleAngle: toRadians(2 + flowerAmount),
        });
      } else {
        beeAgent.resetBeePosition(t);
      }
      beeAgent.draw(angle, ctx);

      if (showAngle) {
        angleAgent.drawOnDanceFloor(angle, sunYOffset, flowerYOffset, ctx);
      }

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
