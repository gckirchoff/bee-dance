<script lang="ts">
  import Canvas from './components/Canvas.svelte';
  import Dance from './components/Dance.svelte';
  import Field from './components/Field.svelte';
  import Range from './components/Range.svelte';
  import type { Vector } from './utils/draw/agents/Vector';
  import { minsToTime } from './utils/general';

  let timeInMins = 720;

  let sunPosition: Vector;
  let hivePosition: Vector;
  let flowerPosition: Vector;

  const updateSunPosition = (position: Vector): void => {
    sunPosition = position;
  };
  const updateHivePosition = (position: Vector): void => {
    hivePosition = position;
  };
  const updateFlowerPosition = (position: Vector): void => {
    flowerPosition = position;
  };

  const updateTime = ({ detail: { value } }) => {
    timeInMins = value;
  };
</script>

<main>
  <section class="upper">
    <div class="canvas-container left">
      <Field
        {timeInMins}
        {updateSunPosition}
        {updateHivePosition}
        {updateFlowerPosition}
      />
    </div>
    <div class="canvas-container right">
      {#if flowerPosition && hivePosition && sunPosition}
        <Dance {sunPosition} {hivePosition} {flowerPosition} />
      {/if}
    </div>
  </section>
  <section class="lower">
    <div class="inputs-container">
      <div class="time-input-container">
        <label for="time-input">Time: {minsToTime(timeInMins)}</label>
        <Range
          on:change={updateTime}
          initialValue={timeInMins}
          min={360}
          max={1080}
          showTooltip={false}
          id="time-input"
        />
      </div>
    </div>
  </section>
</main>

<style>
  main {
    min-height: 100vh;
    background-color: rgb(60, 64, 67);
  }

  .upper {
    height: 80vh;
    display: flex;
    align-items: stretch;
  }

  .lower {
    background-color: green;
    height: 20vh;
  }

  .inputs-container {
    display: flex;
  }

  .time-input-container {
    display: flex;
    flex: 0 1 50%;
  }

  .canvas-container {
    flex: 1 1 0;
  }

  .left {
  }

  .right {
  }
</style>
