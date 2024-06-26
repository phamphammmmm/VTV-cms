<template>
    <div class="manage">
        <div class="manage-body">
            <div class="manage-header">
                <span>Team members</span>
                <PopupWrapper>
                    <template #header>
                        <span class="popover">Add new +</span>
                    </template>
                    <template #content>
                        <div class="popover-content">
                            <AddUser />
                        </div>
                    </template>
                </PopupWrapper>
            </div>
            <div class="space-line"></div>
            <div class="manage-search">
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
        <div class="manage-container">
            <div class="list-user" v-if="items.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th><bars-2-icon class="manage-icon" /></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created_at</th>
                            <th>Updated_at</th>
                            <th>
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="manage-info">
                        <tr v-for="item in items" :key="item.id" class="user-information">
                            <td><input type="checkbox"></td>
                            <td>
                                <div class="item" data-id="{{item.id}}">{{ item.username }}</div>
                            </td>
                            <td>
                                <div class="item" data-id="{{item.id}}">{{ item.email }}</div>
                            </td>
                            <td>
                                <div class="item" data-id="{{item.id}}">
                                    {{ formatDate(item.CreatedAt) }}
                                </div>
                            </td>
                            <td>
                                <div class="item" data-id="{{item.id}}">
                                    {{ formatDate(item.UpdatedAt) }}
                                </div>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <PopupWrapper>
                                        <template #header>
                                            <div class="popover">
                                                <pencil-square-icon class="manage-icon"
                                                    @click="openEditUser(item.ID)" />
                                            </div>
                                        </template>
                                        <template #content>
                                            <div class="popover-content">
                                                <EditUser :userId="selectedUserId" />
                                            </div>
                                        </template>
                                    </PopupWrapper>
                                    <button @click="deleteItem(item.ID)" class="btn-delete-primary">
                                        <trash-icon class="manage-icon" />
                                    </button>
                                </div>
                            </td>
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
import { TrashIcon, PencilSquareIcon, Bars2Icon } from '@heroicons/vue/24/solid';
import PopupWrapper from '@/components/PopupWrapper.vue';
import AddUser from './AddUser.vue';
import EditUser from './EditUser.vue';
import Pagination from '@/components/PaginationPage.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'ManagePage',
    components: {
        PencilSquareIcon, PopupWrapper, Bars2Icon, TrashIcon,
        AddUser, EditUser,
        Pagination
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 7,
            totalItems: 0,
            items: [],
            showModalStatus: false,
            selectedUserId: ''
        };
    },
    setup() {
        const success = () => {
            toast("Add partner with postback successfully !", {
                autoClose: 1000,
                type: "success"
            });
        }
        return { success };
    },
    mounted() {
        this.fetchUser(1);
    },
    methods: {
        fetchUser() {
            axios.get(`http://localhost:4002/backend/user?page=${this.currentPage}&pageSize=${this.pageSize}`)
                .then(response => {
                    this.items = response.data.users;
                    this.totalItems = response.data.pagination.totalCount;
                    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        deleteItem(item) {
            console.log("item", item)
            if (confirm('Are you sure to delete?')) {
                axios.delete(`http://localhost:4002/backend/user/delete/${item}`)
                    .then(() => {
                        this.success()
                        this.$emit('deleted');
                    })
                    .catch(error => {
                        console.error('There was a problem with the delete operation:', error);
                    });
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const day = date.getDate();
            const monthIndex = date.getMonth();
            const year = date.getFullYear();

            return `${day} ${months[monthIndex]}, ${year}`;
        },
        openEditUser(userId) {
            this.selectedUserId = userId;
            console.log("dây là id: " + this.selectedUserId)
        },

        nextPage() {
            if (this.currentPage < Math.ceil(this.totalItems / this.pageSize)) {
                this.currentPage++;
                this.fetchUser();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchUser();
            }
        },
        goToPage(page) {
            this.currentPage = page;
            this.fetchUser();
        },
    }
}
</script>

<style scoped>
.manage-icon {
    width: 24px;
    height: 24px;
}

.manage {
    gap: 30px;
    display: flex;
    flex-direction: column;
}

.manage-body {
    padding: 0px 15px;
    display: flex;
    height: 140px;
    background: #fff;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-evenly;
}

.manage-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.manage-search {
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

/* manage-container */
.manage-container {
    padding: 15px;
    border-radius: 10px;
    background: #fff;
}

.list-user table {
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
}

.list-user th,
.list-user td {
    padding: 10px;
    border-bottom: 1px solid #e2e8f0;
}

.list-user th {
    text-align: left;
}


.action-buttons {
    display: flex;
    justify-content: center;
}

.btn-delete-primary {
    border: none;
    background: none;
}
</style>