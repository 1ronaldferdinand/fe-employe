<template>
    <div class="container my-2">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4 class="m-4">Form Edit Posisi</h4>
                        <hr>
                        <form @submit.prevent="submitForm">
                            <div style="margin-left: 4rem;">
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="name"><strong style="color: red;">*</strong> Nama</label>
                                    <input class="form-control" style="width: 70% !important" type="text" id="name" v-model="position.name" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="code"><strong style="color: red;">*</strong> Deskripsi</label>
                                    <input class="form-control" style="width: 70% !important" type="text" id="code" v-model="position.description" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="position">Status</label>
                                    <select class="form-control" style="width: 70% !important" id="position" v-model="position.status" required>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                    </select>
                                </div>       
                                <span style="font-size: small;">Kolom dengan tanda <strong style="color: red; font-size: medium;">*</strong> berarti<strong> Wajib diisi.</strong></span>
                            </div>
                            <hr>
                            <div class="d-flex align-items-center justify-content-end m-4">
                                <button type="submit" class="btn btn-md btn-success">SIMPAN</button>
                                <router-link :to="{ name: 'positions.index' }" class="btn btn-md btn-warning mx-4">
                                    KEMBALI
                                </router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            id: null,
            position: {
                name: '',
                description: '',
                status: '',
            },
            errors: null,
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        this.fetchPosition();
    },
    methods: {
        fetchPosition() {
            axios.get(`http://127.0.0.1:8000/api/position/detail/${this.id}`)
                .then(response => {
                    this.position = response.data.original.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
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
        submitForm() {
            const formData = new FormData();
            formData.append('name', this.position.name);
            formData.append('description', this.position.description);
            formData.append('status', this.position.status);
            axios.post(`http://127.0.0.1:8000/api/position/update/${this.id}`, formData)
                .then(response => {
                    if(response.data.original.code == '200'){
                        this.position = {
                            name: '',
                            description: '',
                            status: '',
                        };
                        this.showSuccessToast(response.data.original.message)
                        this.$router.push({ name: 'positions.index' });
                    } else {
                        this.errors = response.data.original.message;
                        this.showErrorToast(this.errors)
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>

<style>
.form-group {
  margin-bottom: 20px;
}

label {
  font-size: large;
  font-weight: 600;
}
</style>