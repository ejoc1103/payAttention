<template>
    <div class="subjects-section">
        <h1 class="headline">Pay Attention!!!</h1>
        <!-- 
        Description: Create Form For Adding Tasks to the list
        1. Need to clean up Css
        2. Add some warning's about number of subjects  
        -->
        <form v-on:submit.prevent="addSubject(subject)">
            <input v-model="subject.name" />
            <select v-model="subject.subjectColor">
                <option v-for="color in backgroundColor" :key="color.name" :value="color.value"
                    :style="{ backgroundColor: color.value }">
                    {{ color.name }}
                </option>
            </select>

            <label for="subjectType">Subject Type:</label>
            <select v-model="subject.type">
                <option value="1">Productive</option>
                <option value="2">Unproductive</option>
                <option value="3">Good for the Soul</option>
            </select>
            <input type="submit" value="Add" />

        </form>
        <!-- Description: Div for all subjects after they created
        1. Need to clean up CSS -->

        <div id="subjects-list">
            <div v-for="subject in totalSubjects " v-bind:key="subject.id" v-bind:subject="subject" :class="{
            'on': subject.isActive,
            'off': !subject.isActive
        }">
                <h3>{{ subject.name }}</h3>

                <button v-if="!subject.isActive" v-on:click="startTimer(subject.id)"
                    v-bind:style="{ backgroundColor: subject.subjectColor }">
                    Start Timer
                </button>

                <button v-else v-on:click="stopTimer(subject.id)"
                    v-bind:style="{ backgroundColor: subject.subjectColor }">
                    Stop Timer
                </button>

                <button v-on:click="editTasks(subject.id)">
                    Edit/Add Tasks
                </button>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            interval: null,
            subject: {
                id: this.$store.state.nextSubjectId,
                name: "",
                tasks: [],
                hasTasks: false,
                timeSpent: 0,
                isActive: false,
                isHighLight: false,
                type: 1,
                subjectColor: ''
            },
            backgroundColor: [
                { name: 'Soft Red', value: '#FF6384' },
                { name: 'Light Blue', value: '#36A2EB' },
                { name: 'Soft Yellow', value: '#FFCE56' },
                { name: 'Aqua', value: '#4BC0C0' },
                { name: 'Lavender', value: '#9966FF' },
                { name: 'Orange', value: '#FF9F40' },
                { name: 'Mustard', value: '#FFCD56' },
                { name: 'Light Gray', value: '#C9CBCF' },
                { name: 'Light Green', value: '#66FF66' },
                { name: 'Coral', value: '#FF6666' }
            ],
        }
    },
    computed: {
        totalSubjects() {
            return this.$store.state.subjects;
        }
    },
    methods: {
        addSubject(subject) {

            this.$store.commit("ADD_SUBJECT", subject);
            this.$store.commit("INCREMENT_SUBJECT_ID");
            this.$store.commit("CHANGE_HIGHLIGHTED_SUBJECT", subject.id);

            if (this.$store.state.subjects.length === 1) {
                this.$store.commit("CHANGE_SUBJECT", subject.id);
            }
            // created this in state but I don't need it now but I think it could come in handy
            // this.$store.commit("SHOW_TIMER");
            this.resetForm();
        },
        resetForm() {
            this.subject = {
                id: -1,
                name: "",
                tasks: [],
                timeSpent: 0
            }
        },
        startTimer(id) {
            //changes current subject id which is stored in state
            if (this.$store.state.runTimer) {
                this.$store.commit('UPDATE_TIMER');
                let currentSubject = this.$store.state.subjects[this.$store.state.currentSubjectId];
                currentSubject.isActive = false;
                this.$store.commit('UPDATE_SUBJECT', currentSubject);
                this.$store.commit('CHANGE_SUBJECT', id);
                this.$store.commit('CHANGE_HIGHLIGHTED_SUBJECT', id);
                clearInterval(this.interval);
            } else {
                this.$store.commit('CHANGE_SUBJECT', id);
                let currentSubject = this.$store.state.subjects[id];
                currentSubject.isActive = true;
                console.log(currentSubject);
                this.$store.commit('UPDATE_SUBJECT', currentSubject);
                this.$store.commit('CHANGE_HIGHLIGHTED_SUBJECT', id);
                this.$store.commit('UPDATE_TIMER');
                this.runTimer = true;

                this.interval = setInterval(() => {
                    this.addTime(id);
                }, 10);
            }

        },
        stopTimer(id) {
            let currentSubject = this.$store.state.subjects[id];
            currentSubject.isActive = false;
            this.$store.commit('UPDATE_SUBJECT', currentSubject);
            this.$store.commit('UPDATE_TIMER');
            this.runTimer = false;
            clearInterval(this.interval);
        },
        addTime(id) {
            this.$store.commit('ADD_TIME', id);

            let time = this.$store.state.subjects[id].timeSpent;

            let seconds = Math.floor((time / 1000) % 60);
            let minutes = Math.floor((time / (1000 * 60)) % 60);
            let hours = Math.floor((time / (1000 * 60 * 60)) % 3600)

            // Pad with zeroes for a cleaner display
            let s = seconds.toString().padStart(2, '0');
            let m = minutes.toString().padStart(2, '0');
            let h = hours.toString().padStart(2, '0');

            if (this.$store.state.currentTaskId !== -1) {
                this.$store.commit('ADD_TASK_TIME', this.$store.state.currentSubjectId);
                let taskTime = this.$store.state.subjects[id].tasks[this.$store.state.currentTaskId].timeSpent;

                let taskSeconds = Math.floor((taskTime / 1000) % 60);
                let taskMinutes = Math.floor((taskTime / (1000 * 60)) % 60);
                let taskHours = Math.floor((taskTime / (1000 * 60 * 60)) % 3600)

                // Pad with zeroes for a cleaner display
                let taskS = taskSeconds.toString().padStart(2, '0');
                let taskM = taskMinutes.toString().padStart(2, '0');
                let taskH = taskHours.toString().padStart(2, '0');
                this.$store.commit('UPDATE_TASK_DISPLAY', `${taskH}:${taskM}:${taskS}`);
            }

            this.$store.commit('UPDATE_DISPLAY', `${h}:${m}:${s}`);
        },
        editTasks(id) {
            this.stopTimer(id);
            this.$store.commit('CHANGE_HIGHLIGHTED_SUBJECT', id);
            this.$router.push({ name: 'editTasks', params: { subjectId: id } });
        }
    }
}
</script>

<style>
.headline {
    color: white;
    font-weight: bold;
    text-align: center;
}


.subjects-section {
    display: grid;
    justify-items: center;
    align-content: start;
}

#subjects-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-content: start;
}

.off {
    display: grid;
    justify-items: center;
    background-color: white;
    padding: 5px;
    margin: 5px;
}

.on {
    display: grid;
    justify-items: center;
    background-color: yellow;
    padding: 5px;
    margin: 5px;
}
</style>