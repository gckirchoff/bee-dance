<script lang="ts">
  import Canvas from './components/Canvas.svelte';
  import Field from './components/Field.svelte';
</script>

<main>
  <section class="upper">
    <div class="canvas-container left"><Field /></div>
    <div class="canvas-container right" />
  </section>
  <section class="lower">Section 2</section>
</main>

<style>
  main {
    min-height: 100vh;
  }

  .upper {
    background-color: red;
    height: 80vh;
    display: flex;
    align-items: stretch;
  }

  .lower {
    background-color: green;
    height: 20vh;
  }

  .canvas-container {
    flex: 1 1 0;
  }

  .left {
    background-color: blue;
  }

  .right {
    background-color: yellow;
  }
</style>
