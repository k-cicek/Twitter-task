<template>
  <div>
    <canvas ref="barChartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";

export default {
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    await this.getData();
    this.renderBarChart();
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get("data.json");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    renderBarChart() {
      const tweets = this.users.flatMap((user) =>
        user.tweet.map((tweet) => tweet.like)
      );

      let count1to250 = tweets.filter(
        (likes) => likes >= 1 && likes <= 250
      ).length;
      let count250to500 = tweets.filter(
        (likes) => likes > 250 && likes <= 500
      ).length;
      let count500to1000 = tweets.filter(
        (likes) => likes > 500 && likes <= 1000
      ).length;

      const ctx = this.$refs.barChartCanvas.getContext("2d");

      Chart.register(...registerables);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["1-250", "250-500", "500-1000"],
          datasets: [
            {
              label: "Number of Tweets",
              data: [count1to250, count250to500, count500to1000],
              backgroundColor: ["#f87979", "#ffbb74", "#74b9ff"],
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
  },
};
</script>

<style></style>
