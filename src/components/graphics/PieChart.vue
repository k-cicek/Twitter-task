<template>
  <div class="pieChartContainer">
    <canvas
      v-if="canvasRef"
      :ref="canvasRef"
      :width="width"
      :height="height"
    ></canvas>

    <div class="percentages">
      <div v-for="gender in genders" :key="gender.label">
        <div
          class="colorBox"
          :style="{ backgroundColor: gender.color, borderColor: gender.color }"
        ></div>
        {{ gender.label }}: <span>{{ gender.count }}</span> ({{
          gender.percentage
        }}%)
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      canvasRef: "pieChartCanvas",
    };
  },
  computed: {
    genders() {
      const genderCounts = this.calculateGenderCounts();
      const totalSentences = this.calculateTotalSentences();

      const colors = [
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
      ];

      return Object.keys(genderCounts).map((gender, index) => {
        const label = gender.charAt(0).toUpperCase() + gender.slice(1);
        const count = genderCounts[gender];
        const percentage = ((count / totalSentences) * 100).toFixed(1);
        return { label, count, percentage, color: colors[index] };
      });
    },
  },
  mounted() {
    this.renderPieChart();
  },
  methods: {
    renderPieChart() {
      const ctx = this.$refs[this.canvasRef].getContext("2d");

      Chart.register(...registerables);

      const storedData = localStorage.getItem("pieChartUserData");
      if (storedData) {
        const genderCounts = JSON.parse(storedData);
        this.createChart(ctx, genderCounts);
      } else {
        const genderCounts = this.calculateGenderCounts();
        this.createChart(ctx, genderCounts);
        localStorage.setItem("pieChartUserData", JSON.stringify(genderCounts));
      }
    },

    calculateGenderCounts() {
      let maleCount = 0;
      let femaleCount = 0;
      let genderfluidCount = 0;

      this.users.forEach((user) => {
        const gender = user.gender.toLowerCase();
        if (gender === "male") {
          maleCount += this.getSentenceCount(user);
        } else if (gender === "female") {
          femaleCount += this.getSentenceCount(user);
        } else if (gender === "genderfluid") {
          genderfluidCount += this.getSentenceCount(user);
        }
      });

      return {
        male: maleCount,
        female: femaleCount,
        genderfluid: genderfluidCount,
      };
    },

    calculateTotalSentences() {
      let totalSentences = 0;

      this.users.forEach((user) => {
        totalSentences += this.getSentenceCount(user);
      });

      return totalSentences;
    },

    getSentenceCount(user) {
      let sentenceCount = 0;
      if (user.tweet && Array.isArray(user.tweet)) {
        user.tweet.forEach((tweet) => {
          if (tweet.sentence) {
            const sentences = tweet.sentence.split(".");
            sentenceCount += sentences.length;
          }
        });
      }
      return sentenceCount;
    },

    createChart(ctx, genderCounts) {
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Male", "Female", "Genderfluid"],
          datasets: [
            {
              label: "",
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1,
              data: [
                genderCounts.male,
                genderCounts.female,
                genderCounts.genderfluid,
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: false,
            },
          },
        },
      });
    },
  },
};
</script>

<style>
.pieChartContainer {
  width: 300px;
  height: 300px;
  margin: 20px 10px;
}

.percentages {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.percentages div {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.colorBox {
  width: 20px;
  height: 10px;
  margin-right: 5px;
  border: 1px solid;
}
</style>
