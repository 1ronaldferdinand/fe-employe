<template>
    <div class="container my-2">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4 class="m-4">Form Edit Divisi</h4>
                        <hr>
                        <form @submit.prevent="submitForm">
                            <div style="margin-left: 4rem;">
                                <div v-if="errors">
                                    <strong style="color: red;">{{ errors }}</strong>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="name"><strong style="color: red;">*</strong> Nama</label>
                                    <input class="form-control" style="width: 70% !important" type="text" id="name" v-model="division.name" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="code"><strong style="color: red;">*</strong> Deskripsi</label>
                                    <input class="form-control" style="width: 70% !important" type="text" id="code" v-model="division.description" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="position">Status</label>
                                    <select class="form-control" style="width: 70% !important" id="position" v-model="division.status" required>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                    </select>
                                </div>       
                                <span style="font-size: small;">Kolom dengan tanda <strong style="color: red; font-size: medium;">*</strong> berarti<strong> Wajib diisi.</strong></span>
                            </div>
                            <hr>
                            <div class="d-flex align-items-center justify-content-end m-4">
                                <button type="submit" class="btn btn-md btn-success">SIMPAN</button>
                                <router-link :to="{ name: 'divisions.index' }" class="btn btn-md btn-warning mx-4">
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
            division: {
                name: '',
                description: '',
                status: '',
            },
            errors: null,
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        this.fetchDivision();
    },
    methods: {
        fetchDivision() {
            axios.get(`http://127.0.0.1:8000/api/division/detail/${this.id}`)
                .then(response => {
                    this.division = response.data.original.data;
                })
                .catch(error => {
                    console.error(error);
                });
            },
        submitForm() {
            const formData = new FormData();
            formData.append('name', this.division.name);
            formData.append('description', this.division.description);
            formData.append('status', this.division.status);
            axios.post(`http://127.0.0.1:8000/api/division/update/${this.id}`, formData)
                .then(response => {
                    if(response.data.original.code == '200'){
                        this.division = {
                            name: '',
                            description: '',
                            status: '',
                        };
                        this.$router.push({ name: 'divisions.index' });
                    } else {
                        this.errors = response.data.original.message;
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
