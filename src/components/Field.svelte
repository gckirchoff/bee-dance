<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import { Field } from '../utils/draw-agents/Field';

  let w: number;
  let h: number;

  let canvas: HTMLCanvasElement;
  let frame = 0;
  let frameLimit = 1;
  let x = 0;
  let y = 200;

  let xIncrement = 5;
  let yIncrement = 5;

  afterUpdate(() => console.log('updating'));

  onMount(() => {
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    let animationFrame = requestAnimationFrame(animate);

    function animate(t: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const field = new Field(w, h);
      field.draw(ctx);

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
    background-color: hsl(197, 71%, 73%);
  }
</style>
