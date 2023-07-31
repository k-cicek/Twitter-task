<template>
  <div>
    <Navbar />
    <div class="chartContainer">
      <div class="chartCard">
        <h5 class="chartTitle">Total number of tweets by country</h5>
        <LineChart :data="users" :width="600" :height="400" />
      </div>
      <div class="chartCard">
        <h5 class="chartTitle">Female-Male ratio of all tweets pie</h5>
        <PieChart :users="users" :width="400" :height="400" />
      </div>
      <div class="chartCard">
        <h5 class="chartTitle">Tweet likes graph</h5>
        <BarChart :users="users" :width="400" :height="400" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PieChart from "@/components/graphics/PieChart.vue";
import Navbar from "@/components/AppNavbar.vue";
import LineChart from "@/components/graphics/LineChart.vue";
import BarChart from "@/components/graphics/BarChart.vue";

export default {
  components: {
    PieChart,
    Navbar,
    LineChart,
    BarChart,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("data.json")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style>
.chartContainer {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.chartCard {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 800px;
}

.chartTitle {
  margin-bottom: 10px;
}
</style>
