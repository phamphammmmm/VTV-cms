import { createRouter, createWebHistory } from 'vue-router';
import ReportPage from '@/views/admin/ReportPage.vue'
import PartnerPage from '@/views/admin/partner/PartnerPage.vue';
import Dashboard from '@/views/admin/DashboardPage.vue';
import LoginPage from '@/views/auth/LoginPage.vue';
import RegisterPage from '@/views/auth/RegisterPage.vue';
import ManagePage from '@/views/admin/user/ManagePage.vue';
import TelecomPage from '@/views/admin/TelecomPage.vue';
import DataPartnerPage
    from '@/views/admin/DataPartnerPage.vue';
const routes = [
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'RgisterPage',
        component: RegisterPage
    },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            {
                path: 'report',
                name: 'ReportPage',
                component: ReportPage
            },
            {
                path: 'manage',
                name: 'ManagePage',
                component: ManagePage
            },
            {
                path: 'partner',
                name: 'PartnerPage',
                component: PartnerPage
            },
            {
                path: 'Telecom',
                name: 'TelecomPage',
                component: TelecomPage
            },
            {
                path: 'DataPartner',
                name: 'DataPartnerPage',
                component: DataPartnerPage
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
