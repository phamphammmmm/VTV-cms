<template>
    <div class="navbar">
        <ul class="menu-page">
            <li>
                <router-link class="nav-link" to="/dashboard">
                    <div class="item-content">
                        <squares-2X2-icon class="navbar-icon" />
                        <h3>Dashboard</h3>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link class="nav-link" to="/dashboard/report">
                    <div class="item-content">
                        <wallet-icon class="navbar-icon" />
                        <h3>Report</h3>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link class="nav-link" to="/dashboard/manage">
                    <div class="item-content">
                        <user-icon class="navbar-icon" />
                        <h3>Manage</h3>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link class="nav-link" to="/dashboard/partner">
                    <div class="item-content">
                        <user-icon class="navbar-icon" />
                        <h3>Partner</h3>
                    </div>
                </router-link>
            </li>
            <li><router-link class="nav-link" to="/dashboard/sms_result">
                    <div class="item-content">
                        <circle-stack-icon class="navbar-icon" />
                        <h3>Sms_result</h3>
                    </div>
                </router-link></li>
            <!-- <li>
                    <div @click="toggleSubMenu('data')" class="item-content">
                        <circle-stack-icon class="navbar-icon" />
                        <h3>Data</h3>
                    </div>
                    <ul v-if="isSubMenuOpen.data">
                        <li><router-link class="nav-link" to="/dashboard/partner">Partner</router-link></li>
                        <li><router-link class="nav-link" to="/dashboard/sms_result">Sms_Result</router-link></li>
                        <li>Paginated Table</li>
                    </ul>
                </li> -->
            <li>
                <router-link class="nav-link" to="">
                    <div class="item-content">
                        <adjustments-horizontal-icon class="navbar-icon" />
                        <h3>More</h3>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { UserIcon, WalletIcon, AdjustmentsHorizontalIcon, CircleStackIcon, Squares2X2Icon } from '@heroicons/vue/24/solid';

export default {
    name: 'NavbarDashboard',
    components: {
        UserIcon, CircleStackIcon, AdjustmentsHorizontalIcon,
        Squares2X2Icon, WalletIcon
    },
    data() {
        return {
            isSubMenuOpen: {
                data: false
            }
        };
    },
    methods: {
        toggleSubMenu(subMenu) {
            this.isSubMenuOpen[subMenu] = !this.isSubMenuOpen[subMenu];
        }
    }
}
</script>

<style scoped>
.navbar {
    width: 20%;
    max-height: fit-content;
    display: flex;
    gap: 15px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border: 2px solid #e6eae9;
    flex-direction: column;
}

/* menu-page */
.menu-page {
    list-style-type: none;
}

.menu-page li {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: 20px 0px;
    cursor: pointer;
    color: black;
}

.menu-page .nav-link {
    text-decoration: none;
    color: inherit;
}

.item-content {
    gap: 10px;
    display: flex;
    align-items: center;
}

.navbar-icon {
    width: 24px;
    height: 24px;
    color: black;
    margin-left: 12px;
}
</style>