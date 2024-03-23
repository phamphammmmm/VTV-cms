<template>
    <div class="signup">
        <div class="signup-image">
        </div>
        <div class="signup-form">
            <h2>Sign up</h2>
            <form enctype="multipart/form-data" @submit.prevent="submitForm">
                <label for="username">UserName:</label>
                <input type="text" v-model="formData.username" name="username" placeholder="Your name">

                <label for="email">Email:</label>
                <input type="text" v-model="formData.email" name="email" placeholder="user@gmail.com">

                <label for="password">Password:</label>
                <input type="password" v-model="formData.password" name="password" placeholder="Your password">

                <button type="submit" class="btn-register-primary">Save</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import '@/styles/auth/register.css'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from '@/router';

export default {
    name: 'RegisterPage',
    data() {
        return {
            formData: {
                username: '',
                email: '',
                password: '',
            },
        };
    },
    setup() {
        const success = () => {
            toast("Add account successfully !", {
                autoClose: 3000,
                type: "success"
            });
        }
        return { success };
    },
    methods: {
        submitForm() {
            console.log('Form data:', this.formData);

            axios.post('http://localhost:4002/backend/user/create', this.formData)
                .then(() => {
                    this.resetForm();
                    this.success();
                    router.push('/login');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        resetForm() {
            for (let key in this.formData) {
                this.formData[key] = '';
            }
        },
    },
}
</script>
<style scoped></style>
