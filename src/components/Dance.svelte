<script lang="ts">
  import { onMount } from 'svelte';
  import Bee from '../assets/bee.svg';
  let w: number;
  let h: number;

  let canvas: HTMLCanvasElement;

  onMount(() => {
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    const bee = new Image();
    bee.src = Bee;
    // bee.onload = () => {
    //   ctx.drawImage(bee, 0, 0);
    // };

    let animationFrame = requestAnimationFrame(animate);
    function animate(t: number) {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);
      ctx.fillRect(0, 0, 10, 10);
      ctx.drawImage(bee, -180, -170);
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
