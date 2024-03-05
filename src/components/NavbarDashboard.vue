<template>
    <div class="navbar">
        <ul class="menu-page">
            <li><router-link class="nav-link" to="/dashboard/home">Trang Chủ</router-link></li>
            <li><router-link class="nav-link" to="/dashboard/about">Giới Thiệu</router-link></li>
            <li>
                <div @click="toggleSubMenu('data')">Data</div>
                <ul v-if="isSubMenuOpen.data">
                    <li><router-link class="nav-link" to="/dashboard/data">Agency</router-link></li>
                    <li>Filterable Table</li>
                    <li>Paginated Table</li>
                </ul>
            </li>
            <li>
                <div @click="toggleSubMenu('chart')">Chart</div>
                <ul v-if="isSubMenuOpen.chart">
                    <li>Bar Chart</li>
                    <li>Line Chart</li>
                    <li>Pie Chart</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NavbarDashboard',
    data() {
        return {
            isSubMenuOpen: {
                chart: false,
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
    width: 100%;
    height: 100vh;
}

/* menu-page */
.menu-page {
    list-style-type: none;
}

.menu-page li {
    margin: 20px 0px;
    cursor: pointer;
    color: #9DA5B1;
}

.menu-page .nav-link {
    text-decoration: none;
    /* Loại bỏ gạch chân */
    color: inherit;
    /* Sử dụng màu chữ mặc định của thẻ */
}
</style>