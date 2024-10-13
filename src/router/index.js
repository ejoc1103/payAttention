import { createRouter as _createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import EditTasksList from '../components/EditTasksList.vue';

const routes = [
    { path: '/', name: "home", component: Home },
    { path: '/editTasks/:subjectId', name: "editTasks", component: EditTasksList },
]

export function createRouter() {
    return _createRouter({
        history: createWebHistory(),
        routes: routes
    })
}