<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import { Field } from '../utils/draw/agents/Field';
  import { Beehive } from '../utils/draw/agents/Beehive';
  import { Sun } from '../utils/draw/agents/Sun';
  import { Vector } from '../utils/draw/agents/Vector';
  import {
    toRadians,
    scale,
    average,
    findAngle,
    toDegrees,
    getAngleWedge,
    getDistance,
  } from '../utils/general';
  import { Angle } from '../utils/draw/agents/Angle';

  export let timeInMins: number;
  export let flowerAmount = 1;
  export let showAngle = false;

  export let updateSunPosition: (position: Vector) => void;
  export let updateHivePosition: (position: Vector) => void;
  export let updateFlowerPosition: (position: Vector) => void;
  export let updateMaxDistanceFromHive: (distance: number) => void;

  let w: number;
  let h: number;

  let canvas: HTMLCanvasElement;

  let sunPosition: Vector;
  let hivePosition: Vector;
  let flowerLocation: Vector;

  let handleCanvasClick: (e: MouseEvent) => void;

  onMount(() => {
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    const dimensionScale = average([w, h]);
    const field = new Field(w, h);
    const beehive = new Beehive(w, h);
    const angle = new Angle(w, h);
    hivePosition = beehive.getPosition();
    updateHivePosition(hivePosition);
    updateMaxDistanceFromHive(field.getMaxDistanceFromHive());

    const centerOfEarth = field.getCenterOfEarth();
    const sun = new Sun(w, h, centerOfEarth);

    let previousSunPosition: Vector;

    handleCanvasClick = (e) => {
      const clickLocation = new Vector(e.x, e.y);
      if (!field.isInField(clickLocation)) {
        return;
      }
      flowerLocation = clickLocation;
      updateFlowerPosition(flowerLocation);
    };

    let animationFrame = requestAnimationFrame(animate);
    function animate(t: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sun.draw(timeInMins, ctx);
      sunPosition = sun.getPosition();

      field.draw(ctx);
      if (flowerLocation) {
        field.drawFlower(flowerLocation, ctx, flowerAmount);
      }
      beehive.draw(ctx);

      if (showAngle && flowerLocation) {
        angle.drawOnField(sunPosition, hivePosition, flowerLocation, ctx);
      }

      if (
        !previousSunPosition ||
        previousSunPosition.x !== sunPosition.x ||
        previousSunPosition.y !== sunPosition.y
      ) {
        updateSunPosition(sunPosition);
        previousSunPosition = sunPosition;
      }

      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  });
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
  <canvas
    on:click={handleCanvasClick}
    bind:this={canvas}
    width={200}
    height={200}
  />
</div>

<style>
  div {
    height: 100%;
  }
  canvas {
    background-color: hsl(197, 71%, 73%);
  }
</style>
