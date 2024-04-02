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
<style scoped>
.signup {
    box-shadow: -2px 1px 12px 4px rgba(0, 0, 0, 0.2);
    margin-top: 15%;
    border-radius: 10px;
    background: white;
    display: flex;
    width: 800px;
    max-width: 1000px;
}

.signup-image {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    flex: 1;
    background-image: url("~@/assets/auth/login.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

.signup-form {
    flex: 1;
    padding: 20px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    margin: 10px 0px;
    width: 95%;
    border: 2px solid #dfe4e9;
    padding: 10px;
    border-radius: 5px;
}

.btn-register-primary {
    background: #321fdb;
    border: none;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    padding: 15px;
    margin-top: 10px;
    width: 100%;
}
</style>
