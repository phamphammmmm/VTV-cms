<template>
    <div id="app">
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

.report-data td {
    text-align: center;
}

.report-total td {
    color: white;
    padding: 10px;
    text-align: center;
}

/* Styles for the report table */
#app {
    font-family: Arial, sans-serif;
    margin: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    /* border: 1px solid #dddddd; */
    padding: 8px;
}

.report-title {
    background-color: #f2f2f2;
}

/* Styles for the data rows */
.report-data:nth-child(odd) {
    background-color: #f2f2f2;
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
