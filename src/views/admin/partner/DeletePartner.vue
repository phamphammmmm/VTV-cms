<template>
    <form @submit.prevent="deleteItem">
        <button type="submit">
            <trash-icon class="manage-icon" />
        </button>
    </form>
</template>

<script>
import { TrashIcon } from '@heroicons/vue/24/solid';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'DeleteButton',
    components: {
        TrashIcon,
    },
    props: {
        itemId: Number,
    },
    setup() {
        const success = () => {
            toast("Delete partner with postback successfully !", {
                autoClose: 300,
                type: "success"
            });
        }
        return { success };
    },
    methods: {
        deleteItem() {
            if (confirm('Are you sure to delete?')) {
                axios.delete(`http://localhost:4002/backend/partner/delete/${this.itemId}`)
                    .then(() => {
                        this.$emit('deleted');
                        this.success()
                    })
                    .catch(error => {
                        console.error('There was a problem with the delete operation:', error);
                    });
            }
        },
    },
};
</script>

<style scoped>
/* Định dạng CSS của button xóa */
</style>
