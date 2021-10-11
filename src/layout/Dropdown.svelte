<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let items, id;
  $: current = items[0];

  const handleClick = (e) => {
    const idx = parseInt(e.target.id);
    [items[0], items[idx]] = [items[idx], items[0]];
    dispatch("select", {
      text: e.target.innerHTML,
    });
  };
</script>

<div class="dropdown">
  <button
    class="btn btn-secondary dropdown-toggle"
    type="button"
    {id}
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    {current}
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby={id}>
    <li><button class="dropdown-item active">{current}</button></li>
    {#each items.slice(1) as item, idx}
      <li>
        <button class="dropdown-item" id={idx + 1} on:click={handleClick}
          >{item}</button
        >
      </li>
    {/each}
  </ul>
</div>
