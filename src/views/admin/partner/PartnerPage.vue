<template>
    <div class="partner">
        <div class="partner-body">
            <div class="partner-header">
                <span>Team partner</span>
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
                            <td>
                                <div class="action-buttons">
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
import { PencilSquareIcon, Bars2Icon, TrashIcon } from '@heroicons/vue/24/solid';
import PopupWrapper from '@/components/PopupWrapper.vue';
import AddPartner from '@/views/admin/partner/AddPartner.vue';
import EditPartner from '@/views/admin/partner/EditPartner.vue';
import Pagination from '@/components/PaginationPage.vue';

export default {
    name: 'PartnerPage',
    components: {
        PencilSquareIcon, PopupWrapper, Pagination, TrashIcon,
        Bars2Icon,
        AddPartner, EditPartner,
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
    justify-content: space-evenly;
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
    min-width: 100%;
}

.list-partner tr {
    text-align: left;
    padding: 0.75rem 1rem;
    border-width: 0 0 1px 0;
    color: #334155;
    background: #ffffff;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, outline-color 0.2s;
}


.list-partner th,
.list-partner td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.list-partner th {

    font-size: 14px;
    font-family: "Inter var", sans-serif;
    color: #334155;
    text-align: left;
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