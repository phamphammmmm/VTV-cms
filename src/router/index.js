import { createRouter, createWebHistory } from 'vue-router'; // Sử dụng cú pháp mới của Vue Router 4
import Dashboard from '@/views/DashBoard.vue';
import HomePage from '@/views/dashboard/HomePage.vue';
import AboutPage from '@/views/dashboard/AboutPage.vue';
import AgencyPage from '@/views/Agency/AgencyPage.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'home',
                    name: 'HomePage',
                    component: HomePage
                },
                {
                    path: 'about',
                    name: 'AboutPage',
                    component: AboutPage
                },
                {
                    path: 'data',
                    name: 'AgencyPage',
                    component: AgencyPage
                },
            ]
        }
    ]
});

export default router;
