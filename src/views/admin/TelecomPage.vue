<template>
    <div class="telecom">
        <div class="telecom-body">
            <div class="telecom-header">
                <span>Team Telecom</span>
            </div>
            <div class="space-line"></div>
            <div class="telecom-search">
                <div class="menu-search">
                    <div class="search-filter">
                        <i class="pi pi-filter" style="font-size: 1rem"></i>
                        <span>Filter</span>
                    </div>
                    <div class="search-filter">
                        <i class="pi pi-sort-alt" style="font-size: 1rem"></i>
                        <span>Sort</span>
                    </div>
                </div>
                <button class="btn-search-primary">
                    <i class="pi pi-search" style="font-size: 1rem"></i>
                </button>
            </div>
        </div>
        <div class="telecom-container">
            <div class="list-telecom">
                <table>
                    <thead>
                        <tr class="report-title">
                            <th>
                                <i class="pi pi-align-justify"></i>
                            </th>
                            <th>ID</th>
                            <th>Telecom</th>
                            <th>SMS To</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody class="telecom-info">
                        <tr v-for="(row, index) in paginatedData" :key="index" class="report-data">
                            <td><input type="checkbox"></td>
                            <td>{{ row.ID }}</td>
                            <td>{{ row.Telecom }}</td>
                            <td>{{ row.Sms_To }}</td>
                            <td>{{ row.Phone }}</td>
                            <td>{{ row.Status }}</td>
                            <td>{{ row.Date }}</td>
                        </tr>
                    </tbody>
                </table>
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @nextPage="nextPage"
                    @prevPage="prevPage" @goToPage="goToPage" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import 'primeicons/primeicons.css';
import Pagination from '@/components/PaginationPage.vue';

export default {
    name: 'TelecomPage',
    components: {
        Pagination,
    },
    data() {
        return {
            Telecom: [],
            currentPage: 1,
            pageSize: 4,
            totalItems: 0,
            paginatedData: [],
            totalPages: 0,
        };
    },
    mounted() {
        this.fetchTelecom(1);
    },
    methods: {
        async fetchTelecom() {
            axios.get(`http://localhost:4002/backend/telecom?page=${this.currentPage}&pageSize=${this.pageSize}`)
                .then(response => {
                    this.Telecom = response.data.telecom;
                    console.log(response.data);
                    this.totalItems = response.data.pagination.totalCount;
                    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
                    this.paginatedData = this.Telecom;
                }).catch(error => {
                    console.error('Error fetching telecom data:', error);
                });
        },
        nextPage() {
            if (this.currentPage < Math.ceil(this.totalItems / this.pageSize)) {
                this.currentPage++;
                this.fetchTelecom();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchTelecom();
            }
        },
        goToPage(page) {
            this.currentPage = page;
            this.fetchTelecom();
        },
    }
};
</script>

<style>
/* body */
.telecom {
    gap: 30px;
    display: flex;
    flex-direction: column;
}

/* header */
.telecom-body {
    padding: 0px 15px;
    display: flex;
    height: 140px;
    background: #fff;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-evenly;
}

.telecom-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.telecom-search {
    display: flex;
    justify-content: space-between;
}

.menu-search {
    display: flex;
    gap: 10px;
    align-items: center;
}

.search-filter {
    gap: 5px;
    display: flex;
    align-items: center;
}

.space-line {
    border: 1px solid #e2e8f0;
}

.btn-search-primary {
    border: none;
    background: none;
}

.telecom-search {
    display: flex;
    justify-content: space-between;
}

.menu-search {
    display: flex;
    gap: 10px;
    align-items: center;
}

.primary-icon {
    width: 24px;
    height: 24px;
}

/* data-table */
.telecom-container {
    padding: 15px;
    border-radius: 10px;
    background: #fff;
}

.list-telecom table {
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
}

.list-telecom tr {
    text-align: left;
    padding: 0.75rem 1rem;
    border-width: 0 0 1px 0;
    color: #334155;
    background: #ffffff;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, outline-color 0.2s;
}

.list-telecom tr:hover {
    margin-bottom: 3px;
    transform: translateY(-4px);
    transition: all 0.3s ease;
}

.list-telecom th,
.list-telecom td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.list-telecom th {

    font-size: 14px;
    font-family: "Inter var", sans-serif;
    color: #334155;
    text-align: left;
}
</style>
