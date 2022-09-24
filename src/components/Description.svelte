<script lang="ts"></script>

<div class="container">
  <h2>The Waggle Dance</h2>
  <p>
    The waggle dance is a form of social communication between foraging honey
    bees. It consists of a circuit of figure-eight motions in which the:
  </p>
  <ul>
    <li>
      Angle from the vertical in the hive indicates what angle the foraging
      patch is from the sun. Straight up means towards the sun.
    </li>
    <li>Duration of the waggle phase signifies distance to the target.</li>
    <li>
      Rapidity of the waggle indicates how excited the bee is about the foraging
      patch.
    </li>
  </ul>
  <h2>How to Use</h2>
  <p>
    Adjust the time of day with the slider. Toggle whether to show angles with
    the checbox. Click anywhere on the field to place a flower and begin. Have
    fun!
  </p>
</div>

<style>
  .container {
    padding: min(2rem, 3vw) 2.25rem;
  }

  .container > * {
    color: white;
  }
  h2 {
    text-align: center;
    margin-bottom: clamp(0.1vw, 3rem, 2vw);
  }
  p {
    font-size: clamp(1vw, 16px, 2vw);
    margin-bottom: clamp(0.5vw, 1rem, 2vw);
  }

  ul {
    list-style: circle inside;
    margin-bottom: clamp(0.25vw, 2.5rem, 5vw);
  }

  li {
    margin-bottom: 0.25rem;
    font-size: clamp(1vw, 16px, 2vw);
  }
</style>
