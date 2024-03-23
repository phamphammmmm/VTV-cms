<template>
    <div v-if="!formSubmitted" class="popup-content">
        <h2>Add Partner</h2>
        <form enctype="multipart/form-data" @submit.prevent="submitForm" id="add-partner-form">
            <label for="postbackagency">Agency :</label>
            <input type="text" v-model="formData.postbackagency" name="agency">

            <label for="PostbackAgencyUrl">Postback_Url:</label>
            <textarea type="text" v-model="formData.PostbackAgencyUrl" name="postback_url" placeholder="postback_url">
                </textarea>

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
    name: 'AddPartner',
    data() {
        return {
            formData: {
                postbackagency: '',
                PostbackAgencyUrl: '',
                PostbackValidUrl: '',
                PostbackReplaceId: ''
            },
            partners: [],
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
    methods: {
        submitForm() {
            console.log('Form data:', this.formData);

            axios.post('http://localhost:4002/backend/partner/create', this.formData)
                .then(response => {
                    console.log('Form submitted successfully');
                    this.resetForm();
                    this.partners.push(response.data);
                    this.success()
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                });
        },
        resetForm() {
            for (let key in this.formData) {
                this.formData[key] = '';
            }
        },
        // resetForm() {
        //     this.formData.postbackagency = '';
        //     this.formData.PostbackAgencyUrl = '';
        //     this.formData.PostbackValidUrl = '';
        //     this.formData.PostbackReplaceId = '';
        // },
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

#add-partner-form {
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
