<template>
    <div class="dashboard-layout">
        <!-- <AppTopbar /> -->
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
// import AppTopbar from '@/components/layout/AppTopbar.vue';
export default {
    components: {
        NavbarPage,
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
    margin-left: 350px;
}
</style>./DashBoard.vue