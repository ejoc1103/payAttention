<template>
    <div v-if="$store.state.highLightedSubjectId !== -1" class="fullTaskPage"
        :style="{ backgroundColor: $store.state.subjects[$store.state.highLightedSubjectId].subjectColor }">
        <h1 id="tasks-headline">{{ $store.state.subjects[$store.state.highLightedSubjectId].name }}-Tasks:</h1>
        <EditTasksList />
        <div v-if="$store.state.subjects[$store.state.highLightedSubjectId].hasTasks">
            <ul class="task-list">
                <li v-for="task in $store.state.subjects[$store.state.highLightedSubjectId].tasks" v-bind:key="task.id"
                    class="list-single-task">
                    <div @dblclick="highlightTask(task.id)" class="single-task">
                        <h3 :style="{ textDecoration: task.isComplete ? 'line-through' : 'none' }">
                            {{ task.name }}
                        </h3>
                        <input type="checkbox" v-on:change="checkBox(task)" />
                        <button>Hide</button>
                        <button>X</button>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else>
            <h2>No Tasks Have Been Added Yet</h2>
        </div>
    </div>
    <div v-else class="fullTaskPage">
        <h2>Nothing Highlighted</h2>
    </div>


</template>
<!-- Work on a clearer layout to test adding task functionality -->
<script>
import EditTasksList from './EditTasksList.vue';
export default {
    components: {
        EditTasksList
    },
    methods: {
        highlightTask(id) {
            this.$store.commit('HIGHLIGHT_TASK', id);
            console.log("Task Highlighted");
        },
        checkBox(task) {
            let newTask = task;
            newTask.isComplete = !newTask.isComplete;
            this.$store.commit('UPDATE_TASK', newTask);
            console.log("Task Toggled");
        }
    }
}
</script>

<style>
.fullTaskPage {
    background-color: yellow;
}

.list-single-task {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.single-task {
    display: flex;
    flex-direction: row;
    border: 1px solid white;
    gap: 10px;
}

/* #tasks-headline {} */
</style>

<!-- //Get tasks to show up better on screen  -->