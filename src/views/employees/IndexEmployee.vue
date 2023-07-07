<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA KARYAWAN</h4>
                        <hr>
                        <router-link :to="{name: 'employees.create'}" class="btn btn-md btn-success float-end mb-3">
                            TAMBAH KARYAWAN
                        </router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col" class="text-center">NAME</th>
                                    <th scope="col" class="text-center">CODE</th>
                                    <th scope="col" class="text-center">POSITION</th>
                                    <th scope="col" class="text-center">DIVISION</th>
                                    <th scope="col" class="text-center">PHONE</th>
                                    <th scope="col" class="text-center">EMAIL</th>
                                    <th scope="col" class="text-center">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(employee, index) in employees" :key="index">
                                    <td>{{ employee.name }}</td>
                                    <td class="text-center">{{ employee.code }}</td>
                                    <td>{{ employee.position.name }}</td>
                                    <td>{{ employee.division.name }}</td>
                                    <td>{{ employee.phone }}</td>
                                    <td>{{ employee.email }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'employees.detail', params:{id: employee.id }}">
                                            <svg-icon type="mdi" class="icon" :path="mdi_eye"></svg-icon>
                                        </router-link>
                                        <router-link :to="{name: 'employees.edit', params:{id: employee.id }}" class="mx-2">
                                            <svg-icon type="mdi" class="icon" :path="mdi_pencil"></svg-icon>
                                        </router-link>
                                        <button class="plain" @click.prevent="deleteEmployee(employee.id)">
                                            <svg-icon type="mdi" class="icon" :path="mdi_delete"></svg-icon>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SvgIcon from '@jamescoyle/vue-icon'
import { onMounted, ref } from 'vue'
import { mdiPencil, mdiEye, mdiDelete } from '@mdi/js'

export default {
    components: {
        SvgIcon
    },
    setup() {
        let employees = ref([])
        
        onMounted(() => {
            axios.get('http://localhost:8000/api/employees')
                .then(response => {
                console.log(response.data.original.data)
                    employees.value = response.data.original.data
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        })

        function deleteEmployee(id) {
            axios.post(`http://localhost:8000/api/employee/delete/${id}`)
                .then(() => {
                }).catch(error => {
                    console.log(error.response.data);
                })
        }
            
        return {
            employees,
            deleteEmployee
        }
    },
    data() {
        return {
            mdi_eye: mdiEye,
            mdi_pencil: mdiPencil,
            mdi_delete: mdiDelete,
        }
    }
}
</script>

<style>
    body{
        background: lightgray;
    }

    .plain{
        border: none;
        background: transparent;
        margin: 0;
        padding: 0;
    }

    .icon{
        color: black;
    }
</style>