<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);


export default {
    components: { Pie },

    computed: {
        chartData() {
            let charData = {
                datasets: [
                    {
                        backgroundColor: [
                        ],
                        data: [],
                    }
                ],

            };
            let newData = [];
            let newColors = [];
            if (this.$store.state.subjects.length > 0) {

                for (let i = 0; i < this.$store.state.subjects.length; i++) {
                    newData.push(this.$store.state.subjects[i].timeSpent/1000/60);
                    newColors.push(this.$store.state.subjects[i].subjectColor);
                }
                charData.datasets[0].data = newData;
                charData.datasets[0].backgroundColor = newColors;

            }


            return charData;
            /* mutable chart data */
        },
        chartOptions() { return { responsive: true }/* mutable chart options */ }
    }
}
</script>