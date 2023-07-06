<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH POST</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="name" class="font-weight-bold">NAME</label>
                                <input type="text" class="form-control" v-model="employee.name" placeholder="Masukkan Nama Karyawan">
                                <!-- validation -->
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{ validation.name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="code" class="font-weight-bold">KODE</label>
                                <input type="text" class="form-control" v-model="employee.code" placeholder="Masukkan Kode Karyawan">
                                <!-- validation -->
                                <div v-if="validation.code" class="mt-2 alert alert-danger">
                                    {{ validation.code[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="font-weight-bold">NOMOR TELEPON</label>
                                <input type="text" class="form-control" v-model="employee.phone" placeholder="Masukkan Kode Karyawan">
                                <!-- validation -->
                                <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                    {{ validation.phone[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">EMAIL</label>
                                <input type="text" class="form-control" v-model="employee.email" placeholder="Masukkan Kode Karyawan">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="birthdate" class="font-weight-bold">TANGGAL LAHIR</label>
                                <input type="text" class="form-control" v-model="employee.birthdate" placeholder="Masukkan Kode Karyawan">
                                <!-- validation -->
                                <div v-if="validation.birthdate" class="mt-2 alert alert-danger">
                                    {{ validation.birthdate[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="division" class="font-weight-bold">DIVISION</label>
                                <input type="text" class="form-control" v-model="employee.division" placeholder="Masukkan Kode Karyawan">
                                <!-- validation -->
                                <div v-if="validation.division" class="mt-2 alert alert-danger">
                                    {{ validation.division[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="position" class="font-weight-bold">POSITION</label>
                                <input type="text" class="form-control" v-model="employee.position" placeholder="Masukkan Kode Karyawan">
                                <!-- validation -->
                                <div v-if="validation.position" class="mt-2 alert alert-danger">
                                    {{ validation.position[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const employee = reactive({
            name: '',
            code: '',
            birthdate: '',
            phone: '',
            email: '',
            division_id: '',
            position_id: '',
        })
        
        const validation = ref([])
        const router = useRouter()
        
        function store() {
            let name        = employee.name
            let code        = employee.code
            let birthdate   = employee.birthdate
            let phone       = employee.phone
            let email       = employee.email
            let division    = employee.division_id
            let position    = employee.position_id

            axios.post('http://localhost:8000/api/employee/create', {
                name        : name,
                code        : code,
                birthdate   : birthdate,
                phone       : phone,
                email       : email,
                division_id : division,
                position_id : position,
            }).then(() => {
                console.log(employee)
                router.push({
                    name: 'employees.index'
                })
            }).catch(error => {
                console.log(error)
                validation.value = error.response.data
            })
        }

        return {
            employee,
            validation,
            router,
            store
        }
    }
}
</script>

<style>
    body{
        background: lightgray;
    }
</style>