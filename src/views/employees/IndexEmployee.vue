<template>
    <div class="container my-2">
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
                                    <th scope="col" class="text-center">STATUS</th>
                                    <th scope="col" class="text-center">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody v-if="employees.length != 0">
                                <tr v-for="employee in employees" :key="employee.id">
                                    <td>{{ employee.name }}</td>
                                    <td class="text-center">{{ employee.code }}</td>
                                    <td>{{ truncateText(employee.position ? employee.position.name : employee.position_name, 15) }}</td>
                                    <td>{{ truncateText(employee.division ? employee.division.name : employee.division_name, 15) }}</td>
                                    <td>{{ truncateText(employee.phone, 15) }}</td>
                                    <td>{{ truncateText(employee.email, 15) }}</td>
                                    <td class="text-center">
                                        <span v-if="employee.status == 1">Aktif</span>
                                        <span v-else>Tidak Aktif</span>
                                    </td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'employees.detail', params:{id: employee.id }}">
                                            <svg-icon type="mdi" class="icon" :path="mdi_eye"></svg-icon>
                                        </router-link>
                                        <router-link :to="{name: 'employees.edit', params:{id: employee.id }}" class="mx-2">
                                            <svg-icon type="mdi" class="icon" :path="mdi_pencil"></svg-icon>
                                        </router-link>
                                        <button class="plain" @click="showConfirmationPopup(employee.id)">
                                            <svg-icon type="mdi" class="icon" :path="mdi_delete"></svg-icon>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td :colspan="8">
                                        <span class="d-flex flex-column justify-content-center align-items-center">
                                            <svg-icon type="mdi" class="icon" :path="mdi_question"></svg-icon>
                                            Data is empty
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <CustomPagination :current-page="currentPage" :total-pages="totalPages" @page-changed="handlePageChanged" />
                        <DeletePopup :show="showPopup" :idtoDelete="idtoDelete" :url="url" :title="title" :subtitle="subtitle" @confirm="hidePopup" @cancel="hidePopup" @deletingEmployee="fetchData()"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CustomPagination from '../../components/CustomPagination.vue';
import DeletePopup from '../../components/DeletePopup.vue';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPencil, mdiEye, mdiDelete, mdiMagnify, mdiFileQuestion } from '@mdi/js'

export default {
    components: {
        SvgIcon,
        CustomPagination,
        DeletePopup
    },
    data() {
        return {
            url            : 'employee',
            urls           : 'employees',
            idtoDelete     : 0,
            showPopup      : false,
            mdi_eye        : mdiEye,
            mdi_pencil     : mdiPencil,
            mdi_delete     : mdiDelete,
            mdi_search     : mdiMagnify,
            mdi_question   : mdiFileQuestion,
            searchQuery    : '',
            searchDivision : '',
            searchPosition : '',
            title          : '',
            subtitle       : '',
            currentPage    : 1,
            perPage        : 10,
            totalPages     : 1,
            divisions      : [],
            positions      : [],
            employees      : [],
            loading        : true
        }
    },
    mounted() {
        this.fetchData();
        this.fetchDivisions();
        this.fetchPositions();    
    },
    watch: {
        searchQuery(newValue, oldValue) {
            if(newValue != oldValue){
                this.fetchData();
            }
        },
        searchDivision(newValue, oldValue) {
            if(newValue != oldValue){
                this.fetchData();
            }
        },
        searchPosition(newValue, oldValue) {
            if(newValue != oldValue){
                this.fetchData();
            }
        },
        currentPage(newValue, oldValue) {
            if(newValue != oldValue){
                this.fetchData();
            }
        },
        perPage(newValue, oldValue) {
            if(newValue != oldValue){
                this.fetchData();
            }
        },
    },
    methods: {
        fetchData(){
            axios.get('http://localhost:8000/api/employees', {
                params: {
                    searchQuery: this.searchQuery,
                    searchDivision: this.searchDivision,
                    searchPosition: this.searchPosition,
                    page: this.currentPage,
                    perPage: this.perPage
                }
            })
            .then(response => {
                this.employees = response.data.original.data.data // Assuming data is inside 'data'
                this.totalPages = response.data.original.data.last_page // Adjust based on actual response
            })
            .catch(error => {
                console.log(error)
            })
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
        showConfirmationPopup(employeeId) {
            this.title      = "Hapus Karyawan";
            this.subtitle   = "Apakah anda yakin untuk menghapus data ?";
            this.idtoDelete = employeeId;
            this.showPopup  = true;
        },
        hidePopup() {
            this.showPopup = false;
            this.idtoDelete = null;
        },
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
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            }
            return text;
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