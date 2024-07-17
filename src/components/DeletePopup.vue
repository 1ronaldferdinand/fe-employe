<template>
    <div v-if="show" class="popup">
        <div class="popup-content">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <svg-icon type="mdi" class="icon-warning" :path="mdi_delete" :size="64"></svg-icon>
                <span class="popup-title">{{ title }}</span>
                <span class="popup-subtitle">{{ subtitle }}</span>
            </div>
            <div class="popup-buttons">
                <button class="btn btn-md btn-danger" @click="confirm">Ya</button>
                <button class="btn btn-md btn-light border" @click="cancel">Batal</button>
            </div>
        </div>
    </div>
</template>
  
<style>
    .popup {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        position: fixed;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .popup-title {
        margin-top: 1rem;
        font-weight: 600;
        font-size: x-large;
    }

    .popup-subtitle {
        font-weight: 400;
        font-size: medium;
    }
    
    .popup-content {
        display: flex;
        padding: 25px 35px;
        height: 256px;
        border-radius: 8px;
        flex-direction: column;
        background-color: white;
        justify-content: space-between;
    }
  
    .popup-buttons {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
  
    .popup-buttons button {
        width: 45%;
        margin: 0 1rem;
    }

    .icon-warning path{
        color: red;
    }
</style>
  
<script>
import axios from 'axios'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete } from '@mdi/js'

export default {
    components: {
        SvgIcon,
    },
    data() {
        return {
            mdi_delete     : mdiDelete,
        }
    },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        idtoDelete: {
            type: Number,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        subtitle: {
            type: String,
            required: false,
        }
    },
    methods: {
        showErrorToast(message) {
            this.$toast.error(message, {
                duration: 5000,
                position: 'top-right'
            })
        },
        showSuccessToast(message) {
            this.$toast.success(message, {
                duration: 5000,
                position: 'top-right'
            })
        },
        confirm() {
            this.delete(this.url, this.idtoDelete);
            this.$emit('confirm');
        },
        cancel() {
            this.$emit('cancel');
        },
        delete(url, id) {
            axios.post(`http://localhost:8000/api/${url}/delete/${id}`)
                .then(response => {
                    if(this.url == 'employee'){
                        this.$emit('deletingEmployee');
                    }

                    const message   = response.data.original.message;
                    this.showSuccessToast(message);
                }).catch(error => {
                    console.log(error)
                })
        }
    },
};
</script>
  