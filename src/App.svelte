<script>
  import Navbar from "./layout/Navbar.svelte";
  import Chart from "./layout/Chart.svelte";
  import Dropdown from "./layout/Dropdown.svelte";
  import { csv } from "d3";

  let name;
  let getCSV = async () =>
    csv(
      "https://raw.githubusercontent.com/WorldHealthOrganization/xform-covid-casecount-who/master/output/global.csv"
    );
  let promise = getCSV();
</script>

<main>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"></script>

  <Navbar active="home" />

  <section class="bg-dark px-md-5 py-5 text-light text-center">
    <div class="container-fluid">
      <h5 class="display-5 mb-4">Global Coronavirus Cases</h5>
      <h6 class="display-6 mb-3 text-cases">
        <strong>236,511,950 Cases</strong>
      </h6>
      <h6 class="display-6 mb-3 text-deaths">
        <strong>4,850,000 Deaths</strong>
      </h6>

      {#await promise}
        <div class="spinner-grow" role="status" />
      {:then data}
        <div class="d-md-flex d-none justify-content-center row">
          <div class="col-lg-9 col-11">
            <Dropdown items={['Cumulative', 'New']} id="who-dropdown" />
            <Chart
              {data}
              x="date"
              y="deaths"
              duration="30"
              id="who-graph-cases"
            />
          </div>
        </div>
      {:catch err}
        <p class="text-danger">
          Could not load data. Please check connection or try again later.
        </p>
      {/await}
    </div>
  </section>
</main>
