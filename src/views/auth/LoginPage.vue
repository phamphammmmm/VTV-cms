<template>
    <div class="login">
        <div class="login-form">
            <div class="login-title">
                <h2>Welcome, VTV Line!</h2>
                <span>Sign in to continue</span>
            </div>
            <form @submit.prevent="login" enctype="multipart/form-data">
                <div class="form-row">
                    <label for="email">Email</label>
                    <input type="email" v-model="formData.email" placeholder="Email address" />
                </div>

                <div class="form-row">
                    <label for="password">Password</label>
                    <input type="password" v-model="formData.password" placeholder="Password" />
                </div>
                <p class="text-center">
                    <span>
                        Forgot password?
                    </span>
                    <a href="#">Reset password</a>
                </p>
                <button type="submit" class="btn-login-primary">Login</button>
            </form>
            <!-- <p>
                Don't you have an account?
                <router-link to="/register">Register Now</router-link>
            </p> -->
        </div>
        <div class="login-image"></div>
    </div>
</template>

<script>
import axios from 'axios';
import '@/styles/auth/login.css'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from '@/router';

export default {
    name: 'LoginPage',
    data() {
        return {
            formData: {
                email: '',
                password: '',
            }
        }
    },
    setup() {
        const success = () => {
            toast("Update user successfully !", {
                autoClose: 3000,
                type: "success"
            });
        }
        return { success };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('localhost:4002/backend/sign-up', this.formData)
                    .then(response => {
                        this.success();
                        console.log('Response from backend:', response.data);
                        router.push('/dashboard');
                    })
                console.log('Response from backend:', response.data);
            } catch (error) {
                console.error('Error during login: ', error);
            }
        },
    },
}
</script>

<style scoped>
.login {
    box-shadow: -2px 1px 12px 4px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    margin-top: 15%;
    border-radius: 10px;
    background: white;
    display: flex;
    width: 800px;
    max-width: 1000px;
}

.login-image {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    flex: 1;
    background-image: url("~@/assets/auth/login.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

.login-form {
    flex: 1;
    padding: 20px;
}

p {
    text-align: center;
    /* Căn chỉnh nội dung văn bản ở giữa */
}

a {
    text-decoration: none;
    color: #321fdb;
}

.login-title {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-row {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

input[type="email"],
input[type="password"] {
    margin-top: 5px;
    width: 95%;
    border: 2px solid #dfe4e9;
    padding: 10px;
    border-radius: 5px;
}

.btn-login-primary {
    background: #321fdb;
    border: none;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    padding: 15px;
    margin-top: 10px;
    width: 100%;
    /* Đảm bảo nút login có kích thước 100% chiều rộng */
}

.text-center {
    display: flex;
    justify-content: space-between;
}
</style>
