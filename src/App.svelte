<script lang="ts">
  import Canvas from './components/Canvas.svelte';
  import Field from './components/Field.svelte';
  import Range from './components/Range.svelte';
  import { minsToTime } from './utils/general';

  let timeInMins = 720;

  const updateTime = ({ detail: { value } }) => {
    timeInMins = value;
  };
</script>

<main>
  <section class="upper">
    <div class="canvas-container left"><Field {timeInMins} /></div>
    <div class="canvas-container right" />
  </section>
  <section class="lower">
    <label for="time-input">Time: {minsToTime(timeInMins)}</label>
    <Range
      on:change={updateTime}
      initialValue={timeInMins}
      min={360}
      max={1080}
      showTooltip={false}
      id="time-input"
    />
  </section>
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
