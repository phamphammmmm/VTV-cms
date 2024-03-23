<template>
    <div class="partner">
        <div class="partner-body">
            <div class="partner-header">
                <h3>Team partner</h3>
                <PopupWrapper>
                    <template #header>
                        <div class="popover">Add new +</div>
                    </template>
                    <template #content>
                        <div class="popover-content">
                            <AddPartner />
                        </div>
                    </template>
                </PopupWrapper>
            </div>
            <div class="space-line"></div>
            <div class="partner-search">
                <div class="menu-search">
                    <div class="search-filter">
                        <funnel-icon class="partner-icon" />
                        <h3>Filter</h3>
                    </div>
                    <div class="search-filter">
                        <bars-3-bottom-right-icon class="partner-icon" />
                        <h3>Sort</h3>
                    </div>
                </div>
                <button class="btn-search-primary">
                    <magnifying-glass-icon class="partner-icon" />
                </button>
            </div>
        </div>
        <div class="partner-container" v-if="items.length > 0">
            <div class="list-partner">
                <table>
                    <thead>
                        <tr>
                            <th><bars-2-icon class="partner-icon" /></th>
                            <th>Agency</th>
                            <th>Postback_Url</th>
                            <th>Pb_Valid_Url</th>
                            <th>Pb_Replace_Id</th>
                            <th class="partner-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="partner-info">
                        <tr v-for="item in items" :key="item.id" class="partner-information">
                            <td><input type="checkbox"></td>
                            <td>
                                <div class="item" data-id="{{item.id}}">{{ item.PostbackAgency }}</div>
                            </td>
                            <td>
                                <div class="item" data-id="{{item.id}}">{{ item.PostbackAgencyUrl }}</div>
                            </td>
                            <td>
                                <div class="item" data-id="{{item.id}}">
                                    {{ item.PostbackValidUrl }}
                                </div>
                            </td>
                            <td>
                                <div class="item" data-id="{{item.id}}">
                                    {{ item.PostbackReplaceId }}
                                </div>
                            </td>
                            <td class="action-buttons">
                                <PopupWrapper>
                                    <template #header>
                                        <div class="popover">
                                            <pencil-square-icon class="partner-icon"
                                                @click="openEditPartner(item.ID)" />
                                        </div>
                                    </template>
                                    <template #content>
                                        <div class="popover-content">
                                            <EditPartner :partnerId="selectedPartnerId" />
                                        </div>
                                    </template>
                                </PopupWrapper>
                                <button @click="deleteItem(item.Id)" class="btn-delete-primary">
                                    <trash-icon class="partner-icon" />
                                </button>
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
import { PencilSquareIcon, MagnifyingGlassIcon, Bars2Icon, FunnelIcon, Bars3BottomRightIcon, TrashIcon } from '@heroicons/vue/24/solid';
import PopupWrapper from '@/components/PopupWrapper.vue';
import AddPartner from '@/views/admin/partner/AddPartner.vue';
import EditPartner from '@/views/admin/partner/EditPartner.vue';
import Pagination from '@/components/PaginationPage.vue';

export default {
    name: 'PartnerPage',
    components: {
        PencilSquareIcon, PopupWrapper, Pagination, TrashIcon,
        MagnifyingGlassIcon, Bars2Icon, FunnelIcon,
        Bars3BottomRightIcon, AddPartner, EditPartner,
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 6,
            totalItems: 0,
            items: [],
            selectedPartnerId: '',
            showModalStatus: false
        };
    },
    mounted() {
        this.fetchPartner(1);
    },
    methods: {
        fetchPartner() {
            axios.get(`http://localhost:4002/backend/partner?page=${this.currentPage}&pageSize=${this.pageSize}`)
                .then(response => {
                    this.items = response.data.partner;
                    console.log(this.items);
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
                axios.delete(`http://localhost:4002/backend/partner/delete/${item}`)
                    .then(() => {
                        this.success()
                        this.$emit('deleted');
                    })
                    .catch(error => {
                        console.error('There was a problem with the delete operation:', error);
                    });
            }
        },

        openEditPartner(PartnerID) {
            this.selectedPartnerId = PartnerID;
            console.log("dây là id: " + this.selectedPartnerId)
        },

        nextPage() {
            if (this.currentPage < Math.ceil(this.totalItems / this.pageSize)) {
                this.currentPage++;
                this.fetchPartner();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchPartner();
            }
        },
        goToPage(page) {
            this.currentPage = page;
            this.fetchPartner();
        },
    }
}
</script>

<style scoped>
.partner {
    gap: 30px;
    display: flex;
    flex-direction: column;
}

.partner-body {
    padding: 0px 15px;
    display: flex;
    height: 140px;
    background: #fff;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-around;
}

.partner-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.partner-search {
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

.btn-search-primary {
    border: none;
    background: none;
}

/* partner-container */
.partner-container {
    padding: 15px;
    border-radius: 10px;
    background: #fff;
}

.list-partner table {
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
}

.list-partner th,
.list-partner td {
    padding: 10px;
    border-bottom: 2px solid #ddd;
}

.list-partner th {
    background-color: #f2f2f2;
    text-align: left;
}

.list-partner tr:nth-child(even) {
    background-color: #f2f2f2;
}

.list-partner tr:hover {
    background-color: #ddd;
}

.partner-icon {
    width: 24px;
    height: 24px;
    color: #222;
    margin-left: 12px;
}

.action-buttons {
    display: flex;
    justify-content: space-evenly;
}

.btn-delete-primary {
    border: none;
    background: none;
}
</style>