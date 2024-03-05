<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <ul>
                <li v-for="item in items" :key="item.id">{{ item.id }}</li>
            </ul>
            <div v-if="items.length > 0">
                <h2>Data from API:</h2>
                <ul>
                    <li v-for="item in items" :key="item.id">
                        {{ item.name }} - {{ item.email }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loading: true,
            items: []
        };
    },
    mounted() {
        this.fetchAgency();
    },
    methods: {
        fetchAgency() {
            axios.get('http://localhost:5213/api/users/index')
                .then(response => {
                    this.loading = false;
                    this.items = response.data;
                    console.log(response.data);
                    console.log("connection rồi đó");
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }
};
</script>
