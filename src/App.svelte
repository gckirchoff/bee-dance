<script lang="ts">
  import Canvas from './components/Canvas.svelte';
  import Dance from './components/Dance.svelte';
  import Field from './components/Field.svelte';
  import Description from './components/Description.svelte';
  import Range from './components/Range.svelte';
  import type { Vector } from './utils/draw/agents/Vector';
  import { minsToTime } from './utils/general';

  let flowerAmount = 1;
  let timeInMins = 720;
  let showAngle = false;
  let animateBee = false;

  let sunPosition: Vector;
  let hivePosition: Vector;
  let flowerPosition: Vector;

  let maxDistanceFromHive: number;

  const updateSunPosition = (position: Vector): void => {
    sunPosition = position;
  };
  const updateHivePosition = (position: Vector): void => {
    hivePosition = position;
  };
  const updateFlowerPosition = (position: Vector): void => {
    flowerPosition = position;
  };

  const updateMaxDistanceFromHive = (distance: number): void => {
    maxDistanceFromHive = distance;
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
        {flowerAmount}
        {showAngle}
        {updateSunPosition}
        {updateHivePosition}
        {updateFlowerPosition}
        {updateMaxDistanceFromHive}
      />
    </div>
    <div class="canvas-container right">
      {#if flowerPosition && hivePosition && sunPosition}
        <Dance
          {sunPosition}
          {hivePosition}
          {flowerPosition}
          {maxDistanceFromHive}
          {flowerAmount}
          {showAngle}
          {animateBee}
        />
      {:else}
        <Description />
      {/if}
    </div>
  </section>
  <section class="lower">
    <div class="inputs-container">
      <div class="range-input-container">
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
      <div class="flower-amount-input-container">
        <label for="flower-amount">flowers</label>
        <input
          type="number"
          class="flower-amount-input"
          bind:value={flowerAmount}
          min={1}
          max={5}
        />
      </div>
      <div class="check-boxes-container">
        <div class="check-box-container">
          <label class="cursor-pointer" for="show-angle">Show angle</label>
          <input
            type="checkbox"
            class="cursor-pointer"
            id="show-angle"
            bind:checked={showAngle}
          />
        </div>
        <div class="check-box-container">
          <label class="cursor-pointer" for="animate-bee">Animate Bee</label>
          <input
            type="checkbox"
            class="cursor-pointer"
            id="animate-bee"
            bind:checked={animateBee}
          />
        </div>
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
    padding: 1% 1%;
  }

  .inputs-container {
    /* display: flex; */
  }

  label {
    color: rgb(230, 230, 230);
  }

  .range-input-container {
    display: flex;
    width: 50%;
    margin-bottom: 1rem;
  }

  .flower-amount-input-container {
    width: max(10%, 7rem);
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .flower-amount-input {
    width: 3rem;
  }

  .canvas-container {
    flex: 1 1 0;
  }

  .check-boxes-container {
    width: max(10%, 7rem);
  }

  .check-box-container {
    display: flex;
    justify-content: space-between;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .left {
  }

  .right {
  }
</style>
