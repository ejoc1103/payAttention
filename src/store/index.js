import { createStore as _createStore } from 'vuex';

export function createStore() {
    return _createStore({
        state: {
            subjects: [],
            currentSubjectId: -1,
            currentTaskId: -1,
            highLightedSubjectId: -1,
            showTimer: false,
            runTimer: false,
            totalTime: 0,
            displayTime: '00:00:00',
            taskDisplayTime: '00:00:00',
            nextSubjectId: 0,
            nextTaskId: 0,
            howMuch: 20,
        },
        mutations: {
            ADD_SUBJECT(state, subject) {
                state.subjects.push(subject);
            },
            CHANGE_SUBJECT(state, id) {
                state.currentSubjectId = id;
            },
            CHANGE_HIGHLIGHTED_SUBJECT(state, id) {
                state.highLightedSubjectId = id;
            },
            UPDATE_SUBJECT(state, subject) {
                state.subjects[subject.id] = subject;
            },
            ADD_TIME(state, id) {
                state.subjects[id].timeSpent += 10;
                state.totalTime += 10;
            },
            ADD_TASK_TIME(state, id) {
                state.subjects[id].tasks[state.currentTaskId].timeSpent += 10;
            },
            UPDATE_TIMER(state) {
                state.runTimer = !state.runTimer;
            },
            SHOW_TIMER(state) {
                state.showTimer = true;
            },
            UPDATE_DISPLAY(state, newTime) {
                state.displayTime = newTime;
            },
            UPDATE_TASK_DISPLAY(state, newTime) {
                state.taskDisplayTime = newTime;
            },
            ADD_TASK(state, payLoad) {
                if (payLoad.hasTasks) {
                    state.subjects[payLoad.id].tasks.push(payLoad.newTask);
                } else {
                    state.subjects[payLoad.id].hasTasks = true;
                    state.subjects[payLoad.id].tasks = [payLoad.newTask];
                }
            },
            HIGHLIGHT_TASK(state, id) {
                state.currentTaskId = id;
            },
            UPDATE_TASK(state, task) {
                console.log(state.currentSubjectId);
                console.log(task.id);
                state.subjects[state.currentSubjectId].tasks[task.id] = task;
            },
            SET_HOW_MUCH(state, howMuch) {
                state.howMuch = howMuch;
            },
            INCREMENT_SUBJECT_ID(state) {
                state.nextSubjectId++;
            },
            INCREMENT_TASK_ID(state) {
                state.nextTaskId++;
            }
        },
    })
}