<template>
    <div class="popup-content">
        <h2>Edit Partner</h2>
        <form enctype="multipart/form-data" @submit.prevent="submitForm" id="edit-partner-form">
            <label for="PostbackAgency">Agency :</label>
            <input type="text" v-model="formData.PostbackAgency" name="agency">

            <label for="PostbackAgencyUrl">Postback_Url*</label>
            <textarea type="text" v-model="formData.PostbackAgencyUrl" name="postback_url"
                placeholder="postback_url"></textarea>

            <label for="PostbackValidUrl">Postback_Valid_Url:</label>
            <input type="text" v-model="formData.PostbackValidUrl" name="postback_Valid_Url">

            <label for="PostbackReplaceId">Postback_Replace_Id:</label>
            <input type="text" v-model="formData.PostbackReplaceId" name="postback_Replace_Id">

            <button type="submit" class="btn-add-primary">Save</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    name: 'EditPartner',
    props: {
        partnerId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            formData: {
                postbackagency: '',
                PostbackAgencyUrl: '',
                passPostbackValidUrl: '',
                PostbackReplaceId: '',
            }
        };
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
    mounted() {
        this.fetchUser(this.partnerId);
    },
    methods: {
        submitForm() {
            axios.put(`http://localhost:4002/backend/partner/update/${this.partnerId}`, this.formData)
                .then(() => {
                    this.success();
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        },
        fetchUser(item) {
            console.log("heheh: " + item)
            axios.get(`http://localhost:4002/backend/partner/${item}`)
                .then(response => {
                    const responseData = response.data;
                    if (responseData) {
                        this.formData.PostbackAgency = responseData.PostbackAgency;
                        this.formData.PostbackAgencyUrl = responseData.PostbackAgencyUrl;
                        this.formData.PostbackValidUrl = responseData.PostbackValidUrl;
                        this.formData.PostbackReplaceId = responseData.PostbackReplaceId;
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }
}
</script>
<style scoped>
.popup-content {
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

#edit-partner-form {
    display: flex;
    flex-direction: column;
}

textarea,
input[type="text"] {
    border: 1px solid #e6eae9;
    margin: 10px 0px;
    border-radius: 5px;
    padding: 10px;
}

.btn-add-primary {
    background: black;
    border: none;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    padding: 15px;
}
</style>