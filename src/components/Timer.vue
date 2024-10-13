<template>
    <div v-if="$store.state.currentSubjectId !== -1"
        :style="{ backgroundColor: $store.state.subjects[$store.state.currentSubjectId].subjectColor }"
        class="fullTimerPage">
        <div>
            <h1>{{ $store.state.subjects[$store.state.currentSubjectId].name }}</h1>
            <h1>{{ $store.state.displayTime }}</h1>
        </div>

        <div v-if="$store.state.currentTaskId !== -1">
            <h1>{{ $store.state.subjects[$store.state.currentSubjectId].tasks[$store.state.currentTaskId].name }}</h1>
            <h1>{{ $store.state.taskDisplayTime }}</h1>
        </div>
        <div v-else>
            <h2> No Task Selected </h2>
        </div>
    </div>
    <div v-else :style="{ backgroundColor: 'orange' }" class="fullTimerPage">
        <h2> Add a subject and start a timer to get started!</h2>
    </div>
    <div>
        <label for="value">How Much Is Your Time Worth???</label>
        <select v-model="value">
            <option v-for="num in amounts" :value="num" v-bind:key="num">{{ num }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: 20
        }
    },
    computed: {
        amounts() {
            let amounts = [];
            for (let i = 10; i < 301; i += 5) {
                amounts.push(i);
            }

            return amounts;
        }
    },
    methods: {
        setHowMuch() {

        }
    }
}
</script>

<style>
.fullTimerPage {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
}
</style>