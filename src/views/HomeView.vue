<script setup>
import Subjects from '../components/Subjects.vue';
import Timer from '../components/Timer.vue';
import Chart from '../components/Chart.vue';
import Tasks from '../components/Tasks.vue';
</script>

<template>
    <div class="board">
        <div id="subjects">
            <Subjects />
        </div>
        <div id="chart">
            <Chart />
        </div>
        <div id="timer">
            <Timer />
        </div>
        <div id="subtasks">
            <Tasks />
        </div>
    </div>
</template>

<style>
body {
    background-color: lightgray;
}

.board {
    display: grid;
    width: 90vw;
    height: 90vh;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 2fr 1fr;
    justify-content: center;
    grid-template-areas:
        'subjects timer subtasks'
        'subjects chart subtasks'
        'subjects chart subtasks';
}

#subjects {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    grid-area: subjects;
    background-color: navy;
}

#chart {
    display: flex;
    justify-content: center;
    grid-area: chart;
    background-color: lightblue;

}

#timer {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-area: timer;
}

#subtasks {
    display: grid;
    justify-items: center;
    text-align: center;
    grid-area: subtasks;
}
</style>
