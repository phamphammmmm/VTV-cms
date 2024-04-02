<template>
    <div class="navbar">
        <ul class="menu-page">
            <li>
                <div class="layout-menuitem-root-text">Home</div>
                <router-link class="nav-link" to="/dashboard">
                    <div class="item-content">
                        <squares-2X2-icon class="primary-icon" />
                        <span>Dashboard</span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link class="nav-link" to="/dashboard/report">
                    <div class="item-content">
                        <wallet-icon class="primary-icon" />
                        <span>Report</span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link class="nav-link" to="/dashboard/manage">
                    <div class="item-content">
                        <user-icon class="primary-icon" />
                        <span>Manage</span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link class="nav-link" to="/dashboard/partner">
                    <div class="item-content">
                        <user-icon class="primary-icon" />
                        <span>Partner</span>
                    </div>
                </router-link>
            </li>
            <li><router-link class="nav-link" to="/dashboard/telecom">
                    <div class="item-content">
                        <circle-stack-icon class="primary-icon" />
                        <span>Telecom</span>
                    </div>
                </router-link>
            </li>
            <li><router-link class="nav-link" to="/dashboard/dataPartner">
                    <div class="item-content">
                        <circle-stack-icon class="primary-icon" />
                        <span>Data_Partner</span>
                    </div>
                </router-link>
            </li>
            <!-- <li>
                    <div @click="toggleSubMenu('data')" class="item-content">
                        <circle-stack-icon class="primary-icon" />
                        <span>Data</span>
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
                        <adjustments-horizontal-icon class="primary-icon" />
                        <span>More</span>
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
    position: fixed;
    width: 300px;
    height: calc(115vh - 9rem);
    z-index: 999;
    overflow-y: auto;
    user-select: none;
    top: 1rem;
    left: 1rem;
    transition: transform .2s, left .2s;
    background-color: #ffffff;
    border-radius: 12px;
    padding: .5rem 1.5rem;
    box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;
}

/* menu-page */
.menu-page {
    list-style-type: none;
    padding: 0;
}

.menu-page li {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: 20px 0px;
    cursor: pointer;
    color: white;
}

.layout-menuitem-root-text {
    font-size: .857rem;
    text-transform: uppercase;
    font-weight: 700;
    color: #0f172a;
    margin: .75rem 0;
}

.menu-page li a.active-route {
    font-weight: 700;
    color: #10b981;
}

.menu-page .nav-link {
    text-decoration: none;
    color: inherit;
}

span {
    font-size: 14px;
    font-family: "Inter var", sans-serif;
    color: #334155;
}

.item-content {
    gap: 10px;
    display: flex;
    align-items: center;
}

.primary-icon {
    width: 24px;
    height: 24px;
    color: #334155;
    margin-left: 12px;
}
</style>