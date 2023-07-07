<template>
    <div class="container my-2">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="m-4">Detail Karyawan</h4>
                            <div>
                                <router-link :to="{ name: 'employees.edit' }" class="btn btn-md btn-warning mx-1">
                                    EDIT
                                </router-link>
                                <button class="btn btn-md btn-danger mx-1" @click.prevent="deleteEmployee(employee.id)">
                                    DELETE
                                </button>
                                <router-link :to="{ name: 'employees.index' }" class="btn btn-md btn-success mx-1">
                                    KEMBALI
                                </router-link>
                            </div>
                        </div>
                        <hr>
                        <div class="d-flex align-items-center m-4">
                            <div class="profile-picture" style="margin-right: 4rem;" v-if="employee.image">
                                <img :src="employee.image" alt="Profile Picture" />
                            </div>
                            <div class="profile-picture" style="margin-right: 4rem;" v-else>
                                <img src="@/assets/no_image.png" alt="Profile Picture Not Found">
                            </div>
                            <div class="d-flex flex-column align-items-start justify-content-center">
                                <span style="font-size: xx-large; font-weight: 600;">{{ employee.name }}</span>
                                <span style="font-size: large">{{ employee.code }}</span>
                            </div>
                        </div>
                        <hr>
                        <div style="margin-left: 4rem;">
                            <div class="form-group d-flex align-items-center justify-content-start my-4">
                                <label class="col-3" for="phone">Nomor Telepon</label>
                                <span class="col-1">:</span>
                                <span class="col-8">{{ employee.phone }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center justify-content-start my-4">
                                <label class="col-3" for="email">Email</label>
                                <span class="col-1">:</span>
                                <span class="col-8">{{ employee.email }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center justify-content-start my-4">
                                <label class="col-3" for="birthdate">Tanggal Lahir</label>
                                <span class="col-1">:</span>
                                <span class="col-8">{{ employee.birthdate }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center justify-content-start my-4">
                                <label class="col-3" for="division">Divisi</label>
                                <span class="col-1">:</span>
                                <span class="col-8">{{ division_name }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center justify-content-start my-4">
                                <label class="col-3" for="position">Posisi</label>
                                <span class="col-1">:</span>
                                <span class="col-8">{{ position_name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    
    export default {    
        data() {
            return {
                employee: {},
                division_name: '',
                position_name: '',
                router: useRouter(),
            };
        },
        mounted() {
            const id = this.$route.params.id;
            axios.get(`http://localhost:8000/api/employee/detail/${id}`)
                .then(response => {
                    this.employee       = response.data.original.data;
                    this.division_name  = this.employee.division.name;
                    this.position_name  = this.employee.position.name;
                })
                .catch(error => {
                    console.error(error);
                });
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
            deleteEmployee(id) {
                axios.post(`http://localhost:8000/api/employee/delete/${id}`)
                    .then(response => {
                        const message   = response.data.original.message
                        this.showSuccessToast(message)
                        this.router.push({ name: 'employees.index' });
                    }).catch(error => {
                        console.log(error);
                    })
            }
        }
    };
</script>
  
<style>
    .profile-picture {
        width: 200px;
        height: 200px;
        margin-bottom: 20px;
    }

    .profile-picture img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .form-group span{
        font-weight: 600;
    }
</style>