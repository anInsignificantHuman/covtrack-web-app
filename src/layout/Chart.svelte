<script>
  import { onMount } from "svelte";

  export let data, x, y, duration, id;
  export let type = "cases";
  export let increase = false;
  x = data.map((d) => d[x]);
  y = data.map((d) => d[y]);

  if (increase) {
    let temp = [];
    y.forEach((val, idx) => {
      if (idx !== y.length - 1) {
        temp[idx] = y[idx + 1] - y[idx];
      }
    });
    y = temp;
  }

  const getColor = () => {
    switch (type) {  
      case "cases":  
        return "rgb(166, 233, 213)";
      case "deaths":
        return "rgb(234, 134, 143)";
    }
  };

  onMount(() => {
    const lineColor = getColor(); 
    const graph = new Chart(id, {
      type: "line",
      data: {
        labels: x.slice(x.length - duration),
        datasets: [
          {
            data: y.slice(y.length - duration),
            borderColor: lineColor,
            backgroundColor: lineColor.replace(")", ",0.1)"),
            pointRadius: 0,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 16,
              },
              callback(val, idx) {
                return idx % 2 === 0 ? this.getLabelForValue(val) : "";
              },
            },
          },
          y: {
            ticks: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  });
</script>

<canvas class="d-inline" {id} />
