<template>
    <div class="report">
        <div class="report-body">
            <div class="report-header">
                <span>Team report</span>
            </div>
            <div class="space-line"></div>
            <div class="report-search">
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
        <div class="report-container">
            <div class="list-report">
                <table>
                    <tr class="report-title">
                        <th class="date-time">Date</th>
                        <th>Total subs</th>
                        <th>Active</th>
                        <th>Register</th>
                        <th>Cancel</th>
                        <th>% Cancel</th>
                        <th>REG revenue($)</th>
                    </tr>
                    <tr v-for="(row, index) in reportData" :key="index" class="report-data">
                        <td>{{ row.Date }}</td>
                        <td>{{ row.TotalSubs }}</td>
                        <td>{{ row.Active }}</td>
                        <td>{{ row.Register }}</td>
                        <td>{{ row.Cancel }}</td>
                        <td>{{ row.Cancel_Percentage }}</td>
                        <td>{{ row.Reg_Revenue }}</td>
                    </tr>

                    <tr class="report-total">
                        <td>Total </td>
                        <td>{{ total.TotalSubs }}</td>
                        <td>{{ total.Active }}</td>
                        <td>{{ total.Register }}</td>
                        <td>{{ total.Cancel }}</td>
                        <td>{{ total.Cancel_Percentage }}%</td>
                        <td>{{ total.Reg_Revenue }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            revenueData: [],
            total: {
                TotalSubs: 0,
                Active: 0,
                Register: 0,
                Cancel: 0,
                Cancel_Percentage: 0,
                Reg_Revenue: 0
            },
        };
    },
    created() {
        this.fetchReportData();
    },
    methods: {
        async fetchReportData() {
            try {
                const response = await axios.get('http://localhost:4002/backend/report');
                this.reportData = response.data;
                this.calculateTotal();
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        },
        calculateTotal() {
            this.reportData.forEach(row => {
                this.total.TotalSubs += row.TotalSubs;
                this.total.Active += row.Active;
                this.total.Register += row.Register;
                this.total.Cancel += row.Cancel;
                this.total.Cancel_Percentage += row.Cancel_Percentage;
                this.total.Reg_Revenue += row.Reg_Revenue;
            });
        }
    }
};
</script>

<style scoped>
.date-time {
    padding: 0px 10px;
}

.report-title {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

.report-title th {
    padding: 5px 30px;
    color: #394b59;
}

/* Styles for the report table */
.report {
    gap: 30px;
    display: flex;
    flex-direction: column;
}

.report-body {
    padding: 0px 15px;
    display: flex;
    height: 140px;
    background: #fff;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-evenly;
}

.report-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.report-search {
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

.report-search {
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
.report-container {
    padding: 15px;
    border-radius: 10px;
    background: #fff;
}

.list-report {
    padding: 0px 40px;
}

.list-report table {
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
}

.list-report tr {
    text-align: left;
    padding: 0.75rem 1rem;
    border-width: 0 0 1px 0;
    color: #334155;
    background: #ffffff;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, outline-color 0.2s;
}

.list-report tr:hover {
    margin-bottom: 3px;
    transform: translateY(-4px);
    transition: all 0.3s ease;
}

.list-report th,
.list-report td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.list-report th {
    font-size: 14px;
    font-family: "Inter var", sans-serif;
    color: #334155;
    text-align: left;
}

/* Styles for the total row */
.report-total {
    background-color: #394b59;
    color: white;
}

/* Styles for the total row cells */
.report-total td {
    font-weight: bold;
}

/* Hover effect for rows */
.report-data:hover {
    background-color: #ddd;
}
</style>
