<template>
    <div class="dashboard-layout">
        <div class="dashboard-body">
            <NavbarPage />
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarPage from '@/components/NavbarPage.vue';
export default {
    components: {
        NavbarPage
    }
}
</script>

<style scoped>
.dashboard-body {
    height: 100vh;
    display: flex;
}

.content {
    flex: 1;
    width: 80%;
    padding: 0 30px;
}
</style>./DashBoard.vue