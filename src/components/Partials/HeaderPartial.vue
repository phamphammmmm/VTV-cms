<template>
    <header>
        <div class="logo">
            <router-link to="/"><img src="@/assets/auth/login.jpg" alt="logo"></router-link>
            <h3>Jobored</h3>
        </div>
        <div class="main-title">
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/job">Jobs</router-link></li>
                <li><router-link to="/category">Category</router-link></li>
                <li><router-link to="/company">Company</router-link></li>
                <li><router-link to="/candidate">Candidate</router-link></li>
                <li><router-link to="/feedback">About us</router-link></li>
            </ul>
        </div>
        <div class="notify">
            <ul>
                <li id="notification-icon">
                    <a href="">
                        <ion-icon name="notifications-outline"></ion-icon>
                    </a>
                </li>
                <li>
                    <router-link to="/favorite">
                        <ion-icon name="bookmark-outline"></ion-icon>
                    </router-link>
                </li>
                <li>
                    <router-link to="/profile">
                        <ion-icon name="person-outline"></ion-icon>
                    </router-link>
                </li>
                <li id="avatar-container" @click="togglePopup">
                    <img src="@/assets/auth/login.jpg" alt="Avatar" id="avatar" v-if="loggedIn">
                    <div id="popup" :class="{ hidden: !showPopup }">
                        <button v-if="isAdminOrModerator" @click="goToDashboard">Dashboard</button>
                        <button v-if="isRecruiter" @click="goToRecruiter">Recruiter</button>
                        <form v-if="loggedIn" @submit.prevent="logout">
                            <button type="submit" class="logout-btn">Logout</button>
                        </form>
                    </div>
                </li>
            </ul>
        </div>
        <div class="popup-notification" :data-receiver-id="userId">
            <div id="popup-notification-content">
                <ul class="notification-list">
                    <li></li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderPartial',
    data() {
        return {
            showPopup: false
        }
    },
    computed: {

    }
}
</script>
<style scoped>
@import '@/styles/partials/header.css';
</style>
