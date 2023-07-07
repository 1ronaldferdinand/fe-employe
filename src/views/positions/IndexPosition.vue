<template>
    <div class="container my-2">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4 class="m-4">DATA POSISI</h4>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center m-4">
                            <div class="input-search">
                                <svg-icon type="mdi" class="icon" :path="mdi_search"></svg-icon>
                                <input v-model="searchQuery" placeholder="Cari posisi">
                            </div>
                            <router-link :to="{name: 'positions.create'}" class="btn btn-md btn-success">
                                TAMBAH POSISI
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
                                <tr v-for="position in paginatedData" :key="position.id">
                                    <td>{{ position.name }}</td>
                                    <td>{{ position.description }}</td>
                                    <td class="text-center">
                                        <span v-if="position.status == 1">Aktif</span>
                                        <span v-else>Tidak Aktif</span>
                                    </td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'positions.edit', params:{id: position.id }}" class="mx-2">
                                            <svg-icon type="mdi" class="icon" :path="mdi_pencil"></svg-icon>
                                        </router-link>
                                        <button class="plain" @click.prevent="deletePosition(position.id)">
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
        let positions = ref([])
        
        const fetchData = () => {
            axios.get('http://localhost:8000/api/positions')
                .then(response => {
                    positions.value = response.data.original.data
                })
                .catch(error => {
                    console.log(error)
                })
        }

        onMounted(() => {
            fetchData()
            setInterval(fetchData, 1000)
        })
            
        return {
            positions
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
            return Math.ceil(this.positions.length / this.perPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end   = start + this.perPage;
            return this.filteredData.slice(start, end);
        },
        filteredData() {
            let filtered = this.positions
            if(this.positions.length != 0){
                filtered = this.positions.filter(position => {
                    const positionName     = (position.name ?? '').toLowerCase();
                    const query            = this.searchQuery.toLowerCase();
                    return (
                        positionName.includes(query)
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
        deletePosition(id) {
            axios.post(`http://localhost:8000/api/position/delete/${id}`)
                .then(response => {
                    const message   = response.data.original.message
                    this.showSuccessToast(message)
                }).catch(error => {
                    console.log(error);
                })
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