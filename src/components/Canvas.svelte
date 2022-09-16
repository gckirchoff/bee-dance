<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';

  let w;
  let h;

  let canvas;
  let frame = 0;
  let frameLimit = 1;
  let x = 0;
  let y = 0;

  let xIncrement = 1;
  let yIncrement = 1;

  afterUpdate(() => console.log('updating'));

  onMount(() => {
    console.log('w', w);
    console.log('h', h);
    canvas.width = w;
    canvas.height = h;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    let animationFrame = requestAnimationFrame(loop);

    function loop(t) {
      frame++;
      if (frame % frameLimit === 0) {
        // make some changes then redraw animation
        draw();
      }
      animationFrame = requestAnimationFrame(loop);
    }

    const draw = () => {
      ctx.fillStyle = 'black';
      const r = 5;

      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      if (x < 0) {
        xIncrement = 1;
      } else if (x > w - 5) {
        xIncrement = -1;
      }
      if (y > h - 5) {
        yIncrement = -1;
      } else if (y < 0) {
        yIncrement = 1;
      }
      x += xIncrement;
      y += yIncrement;
    };

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
    /* width: 100%; */
    height: 100%;
  }
  canvas {
    background-color: rgb(255, 255, 255);
  }
</style>
