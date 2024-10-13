<template>
    <h1>Edit</h1>
    <form v-on:submit.prevent="addTask">
        <label for="taskName">Task Name:</label>
        <input v-model="task.name">
        <label for="taskPriority">Priority Level:</label>
        <select v-model="task.priority">
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
        </select>
        <input type="submit">
        <!-- <Tasks /> Include tasks on editTaskList only when on not on home route v-if -->
    </form>
</template>
<!-- You just changed the name of this from Task.vue to EditTasksList.vue so it may cause some errors -->
<script>
// import Tasks from './Tasks.vue';
export default {
    // components: {
    //     Tasks
    // },
    data() {
        return {
            // timeSpent is time on specific task, priority will help order the list
            task: {
                id: this.$store.state.nextTaskId,
                name: "",
                timeSpent: 0,
                isComplete: false,
                isArchive: false,
                priority: 1
            }
        }
    },
    methods: {
        addTask() {
            let hasTasks = this.$store.state.subjects[this.$store.state.highLightedSubjectId].hasTasks;


            let payload = {
                id: this.$store.state.highLightedSubjectId,
                newTask: this.task,
                hasTasks: hasTasks
            }

            this.$store.commit("ADD_TASK", payload);
            this.$store.commit("INCREMENT_TASK_ID");
            this.resetForm();
            this.$router.push({ name: 'home' });
        },
        resetForm() {
            this.task = {
                id: -1,
                name: "",
                timeSpent: 0,
                isComplete: false,
                priority: 1
            }
        },
    }
}
</script>

<style></style>