<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import { Field } from '../utils/draw/agents/Field';
  import { Beehive } from '../utils/draw/agents/Beehive';
  import { Sun } from '../utils/draw/agents/Sun';
  import { Vector } from '../utils/draw/agents/Vector';

  export let timeInMins: number;

  export let updateSunPosition: (position: Vector) => void;
  export let updateHivePosition: (position: Vector) => void;
  export let updateFlowerPosition: (position: Vector) => void;

  let w: number;
  let h: number;

  let canvas: HTMLCanvasElement;

  let flowerLocation: Vector;

  let handleCanvasClick: (e: Event) => void;

  onMount(() => {
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    const field = new Field(w, h);
    const beehive = new Beehive(w, h);
    updateHivePosition(beehive.getPosition());

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

      field.draw(ctx);
      if (flowerLocation) {
        field.drawFlower(flowerLocation, ctx);
      }
      beehive.draw(ctx);
      sun.draw(timeInMins, ctx);

      const sunPosition = sun.getPosition();
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
