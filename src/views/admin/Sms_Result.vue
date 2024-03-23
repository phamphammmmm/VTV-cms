<template>
    <div class="sms">
        <div class="sms-search">
            <div class="menu-search">
                <div class="search-filter">
                    <funnel-icon class="sms-icon" />
                    <h3>Filter</h3>
                </div>
                <div class="search-filter">
                    <bars-3-bottom-right-icon class="sms-icon" />
                    <h3>Sort</h3>
                </div>
            </div>
            <button class="btn-search-primary">
                <magnifying-glass-icon class="sms-icon" />
            </button>
        </div>
        <table>
            <thead>
                <tr class="report-title">
                    <th>ID</th>
                    <th>Created_at</th>
                    <th>SMS To</th> 
                    <th>SMS Body</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in paginatedData" :key="index" class="report-data">
                    <td>{{ row.ID }}</td>
                    <td>{{ row.CreatedAt }}</td>
                    <td>{{ row.SmsTo }}</td>
                    <td>{{ row.SmsBody }}</td>
                    <td>{{ row.Phone }}</td>
                    <td>{{ row.Status }}</td>
                    <td>{{ row.Amount }}</td>
                </tr>
            </tbody>
        </table>
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @nextPage="nextPage" @prevPage="prevPage"
            @goToPage="goToPage" />
    </div>
</template>

<script>
import axios from 'axios';
import { FunnelIcon, Bars3BottomRightIcon } from '@heroicons/vue/24/solid';
import Pagination from '@/components/PaginationPage.vue';

export default {
    components: {
        FunnelIcon, Pagination, Bars3BottomRightIcon,
    },
    data() {
        return {
            Sms_ResultData: [],
            currentPage: 1,
            pageSize: 15,
            totalItems: 0,
            paginatedData: [],
            totalPages: 0,
        };
    },
    mounted() {
        this.fetchSms_ResultData(1);
    },
    methods: {
        async fetchSms_ResultData() {
            axios.get(`http://localhost:4002/backend/sms_result?page=${this.currentPage}&pageSize=${this.pageSize}`)
                .then(response => {
                    this.Sms_ResultData = response.data.sms_result;
                    this.totalItems = response.data.pagination.totalCount;
                    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
                    this.paginatedData = this.Sms_ResultData;
                }).catch(error => {
                    console.error('Error fetching sms_result data:', error);
                });
        },
        nextPage() {
            if (this.currentPage < Math.ceil(this.totalItems / this.pageSize)) {
                this.currentPage++;
                this.fetchSms_ResultData();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchSms_ResultData();
            }
        },
        goToPage(page) {
            this.currentPage = page;
            this.fetchSms_ResultData();
        },
    }
};
</script>

<style>
.sms-search {
    display: flex;
    justify-content: space-between;
}

.menu-search {
    display: flex;
    gap: 10px;
    align-items: center;
}

.sms-icon {
    width: 24px;
    height: 24px;
}

table {
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 10px;
    border-bottom: 2px solid #ddd;
}

th {
    background-color: #f2f2f2;
    text-align: left;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #ddd;
}
</style>
