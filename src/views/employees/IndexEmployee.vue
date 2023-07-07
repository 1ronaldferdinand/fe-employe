<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4 class="m-4">DATA KARYAWAN</h4>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center m-4">
                            <div class="input-search">
                                <svg-icon type="mdi" class="icon" :path="mdi_search"></svg-icon>
                                <input v-model="searchQuery" placeholder="Cari karyawan">
                            </div>
                            <div class="d-flex align-items-center">
                                <label for="division" style="margin-right: 1rem;">Divisi :</label>
                                <select v-model="searchDivision" class="select-search" id="division">
                                    <option value="">Semua Divisi</option>
                                    <option v-for="division in divisions" :key="division.name" :value="division.name">{{ division.name }}</option>
                                </select>
                            </div>
                            <div class="d-flex align-items-center">
                                <label for="position" style="margin-right: 1rem;">Posisi :</label>
                                <select v-model="searchPosition" class="select-search" id="position">
                                    <option value="">Semua Posisi</option>
                                    <option v-for="position in positions" :key="position.name" :value="position.name">{{ position.name }}</option>
                                </select>
                            </div>
                            <router-link :to="{name: 'employees.create'}" class="btn btn-md btn-success">
                                TAMBAH KARYAWAN
                            </router-link>
                        </div>

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
                                <tr v-for="employee in paginatedData" :key="employee.id">
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
                        <CustomPagination :current-page="currentPage" :total-pages="totalPages" @page-changed="handlePageChanged" />
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
import { mdiPencil, mdiEye, mdiDelete, mdiMagnify } from '@mdi/js'
import CustomPagination from '../../components/CustomPagination.vue';

export default {
    components: {
        SvgIcon,
        CustomPagination
    },
    setup() {
        let employees = ref([])
        
        onMounted(() => {
            axios.get('http://localhost:8000/api/employees')
                .then(response => {
                    employees.value = response.data.original.data
                    const code      = response.data.original.code
                    const message   = response.data.original.message
                    const res       = {'code': code, 'message': message}
                    console.log(res)
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        })

        function deleteEmployee(id) {
            axios.post(`http://localhost:8000/api/employee/delete/${id}`)
                .then(response => {
                    const code      = response.data.original.code
                    const message   = response.data.original.message
                    const res       = {'code': code, 'message': message}
                    console.log(res)
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
            mdi_eye        : mdiEye,
            mdi_pencil     : mdiPencil,
            mdi_delete     : mdiDelete,
            mdi_search     : mdiMagnify,
            perPage        : 10,
            currentPage    : 1,
            searchQuery    : '',
            searchDivision : '',
            searchPosition : '',
            divisions      : [],
            positions      : []
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.employees.length / this.perPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end   = start + this.perPage;
            return this.filteredData.slice(start, end);
        },
        filteredData() {
            let filtered = this.employees
            if(this.employees.length != 0){
                filtered = this.employees.filter(employee => {
                    const employeeName     = (employee.name ?? '').toLowerCase();
                    const divisionName     = (employee.division.name ?? '').toLowerCase();
                    const positionName     = (employee.position.name ?? '').toLowerCase();
                    const query            = this.searchQuery.toLowerCase();
                    const selectedDivision = this.searchDivision ? this.searchDivision.toLowerCase() : '';
                    const selectedPosition = this.searchPosition ? this.searchPosition.toLowerCase() : '';
                    return (
                        (employeeName.includes(query) || divisionName.includes(query) || positionName.includes(query)) &&
                        (selectedDivision === '' || divisionName === selectedDivision) &&
                        (selectedPosition === '' || positionName === selectedPosition)
                    );
                });
            }
            return filtered;
        },
    },
    mounted() {
        this.fetchDivisions();
        this.fetchPositions();    
    },
    methods: {
        handlePageChanged(currentPage) {
            this.currentPage = currentPage;
        },
        fetchDivisions() {
            axios.get('http://127.0.0.1:8000/api/divisions')
                .then(response => {
                    this.divisions = response.data.original.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchPositions() {
            axios.get('http://127.0.0.1:8000/api/positions')
                .then(response => {
                    this.positions = response.data.original.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
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

    .input-search{
        border: 1px solid black;
        border-radius: 8px;
        padding: 0.3rem 0.5rem;
    }

    .input-search input{
        border: none !important;
        margin-left: 0.5rem;
    }

    .input-search input:focus{
        border: none !important;
        outline: none !important;
    }

    .select-search{
        border: 1px solid black;
        border-radius: 8px;
        width: 12rem;
        padding: 0.5rem 0.5rem;
    }
</style>