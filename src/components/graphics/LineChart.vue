<template>
  <div>
    <canvas ref="lineChartCanvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renderLineChart();
    });
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.renderLineChart();
        });
      },
    },
  },
  methods: {
    renderLineChart() {
      const ctx = this.$refs.lineChartCanvas.getContext("2d");

      Chart.register(...registerables);

      const sentencesByCountry = this.calculateSentencesByCountry();

      if (sentencesByCountry.length === 0) {
        return;
      }

      new Chart(ctx, {
        type: "line",
        data: {
          labels: sentencesByCountry.map((item) => item.country),
          datasets: [
            {
              label: "Number of Tweets",
              data: sentencesByCountry.map((item) => item.tweetLength),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    calculateSentencesByCountry() {
      const sentencesByCountry = {};

      this.data.forEach((user) => {
        const country = user.country;
        if (user.tweet && user.tweet.length > 0) {
          if (!sentencesByCountry[country]) {
            sentencesByCountry[country] = 0;
          }
          sentencesByCountry[country] += user.tweet.length;
        }
      });

      return Object.keys(sentencesByCountry).map((country) => ({
        country: country,
        tweetLength: sentencesByCountry[country],
      }));
    },
  },
};
</script>

<style>
canvas {
  max-width: 100%;
}

@media (min-width: 600px) {
  canvas {
    width: 600px;
  }
}
</style>
