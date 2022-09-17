<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
  
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
      let animationFrame = requestAnimationFrame(loop);
  
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const r = 30;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'pink';
        ctx.fill();
        if (x > w - r) {
          xIncrement = Math.abs(xIncrement) * -1;
        } else if (x < r) {
          xIncrement = Math.abs(xIncrement);
        }
        if (y > h - r) {
          yIncrement = Math.abs(yIncrement) * -1;
        } else if (y < r) {
          yIncrement = Math.abs(yIncrement);
        }
        x += xIncrement;
        y += yIncrement;
      };
  
      function loop(t: number) {
        frame++;
        if (frame % frameLimit === 0) {
          animate();
        }
        animationFrame = requestAnimationFrame(loop);
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
      background-color: rgb(255, 255, 255);
    }
  </style>
  