<template>
    <div class="dashboard-layout">
        <HeaderPartial />
        <div class="body">
            <NavbarDashboard />
            <div class="content">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script>
import NavbarDashboard from '@/components/NavbarDashboard.vue';
import HeaderPartial from '@/components/Partials/HeaderPartial.vue';
export default {
    components: {
        NavbarDashboard,
        HeaderPartial
    }
}
</script>

<style scoped>
.body {
    height: 100vh;
    display: flex;
}

.content {
    flex: 1;
}


.navbar {
    width: 20%;
    background-color: #3C4B64;
    padding: 20px;
}

.content {
    width: 80%;
    padding: 20px;
}
</style>./DashBoard.vue