<template>
    <div class="container my-2">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4 class="m-4">DATA DIVISI</h4>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center m-4">
                            <div class="input-search">
                                <svg-icon type="mdi" class="icon" :path="mdi_search"></svg-icon>
                                <input v-model="searchQuery" placeholder="Cari divisi">
                            </div>
                            <router-link :to="{name: 'divisions.create'}" class="btn btn-md btn-success">
                                TAMBAH DIVISI
                            </router-link>
                        </div>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col" class="text-center">NAMA</th>
                                    <th scope="col" class="text-center">DESKRIPSI</th>
                                    <th scope="col" class="text-center">STATUS</th>
                                </tr>
                            </thead>
                            <tbody v-if="paginatedData.length != 0">
                                <tr v-for="division in paginatedData" :key="division.id">
                                    <td>{{ division.name }}</td>
                                    <td>{{ division.description }}</td>
                                    <td class="text-center">
                                        <span v-if="division.status == 1">Aktif</span>
                                        <span v-else>Tidak Aktif</span>
                                    </td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'divisions.edit', params:{id: division.id }}" class="mx-2">
                                            <svg-icon type="mdi" class="icon" :path="mdi_pencil"></svg-icon>
                                        </router-link>
                                        <button class="plain" @click.prevent="deleteDivision(division.id)">
                                            <svg-icon type="mdi" class="icon" :path="mdi_delete"></svg-icon>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td :colspan="7">
                                        <span class="d-flex flex-column justify-content-center align-items-center">
                                            <svg-icon type="mdi" class="icon" :path="mdi_question"></svg-icon>
                                            Data is empty
                                        </span>
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
import CustomPagination from '../../components/CustomPagination.vue';
import SvgIcon from '@jamescoyle/vue-icon'
import { onMounted, ref } from 'vue'
import { mdiPencil, mdiDelete, mdiMagnify, mdiFileQuestion } from '@mdi/js'

export default {
    components: {
        SvgIcon,
        CustomPagination
    },
    setup() {
        let divisions = ref([])
        
        onMounted(() => {
            axios.get('http://localhost:8000/api/divisions')
                .then(response => {
                    divisions.value = response.data.original.data
                    const code      = response.data.original.code
                    const message   = response.data.original.message
                    const res       = {'code': code, 'message': message}
                    console.log(res)
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        })

        function deleteDivision(id) {
            axios.post(`http://localhost:8000/api/division/delete/${id}`)
                .then(response => {
                    const code      = response.data.original.code
                    const message   = response.data.original.message
                    const res       = {'code': code, 'message': message}
                    console.log(res)
                    window.location.reload();
                }).catch(error => {
                    console.log(error.response.data);
                })
        }
            
        return {
            divisions,
            deleteDivision
        }
    },
    data() {
        return {
            mdi_pencil     : mdiPencil,
            mdi_delete     : mdiDelete,
            mdi_search     : mdiMagnify,
            mdi_question   : mdiFileQuestion,
            perPage        : 10,
            currentPage    : 1,
            searchQuery    : '',
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.divisions.length / this.perPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end   = start + this.perPage;
            return this.filteredData.slice(start, end);
        },
        filteredData() {
            let filtered = this.divisions
            if(this.divisions.length != 0){
                filtered = this.divisions.filter(division => {
                    const divisionName     = (division.name ?? '').toLowerCase();
                    const query            = this.searchQuery.toLowerCase();
                    return (
                        divisionName.includes(query)
                    );
                });
            }
            return filtered;
        },
    },
    methods: {
        handlePageChanged(currentPage) {
            this.currentPage = currentPage;
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