<!-- Sidebar.vue -->
<template>
    <div class="sidebar shadow">
        <ul>
            <li @click="move('/')">
                <div>
                    <svg-icon type="mdi" class="icon" :path="mdi_employee"></svg-icon>
                    Karyawan
                </div>
            </li>
            <li @click="move('/divisions')">
                <div>
                    <svg-icon type="mdi" class="icon" :path="mdi_division"></svg-icon>
                    Divisi
                </div>
            </li>
            <li @click="move('/positions')">
                <div>
                    <svg-icon type="mdi" class="icon" :path="mdi_position"></svg-icon>
                    Posisi
                </div>
            </li>
        </ul>
    </div>
</template>
  
<script>
    import SvgIcon from '@jamescoyle/vue-icon'
    import { mdiAccountGroup, mdiAccountMultiple, mdiAccount } from '@mdi/js'

    export default {
        components: {
            SvgIcon,
        },
        data() {
            return {
                mdi_employee : mdiAccountGroup,
                mdi_division : mdiAccountMultiple,
                mdi_position : mdiAccount,
            }
        },
        methods: {
            move(url){
                window.location.href = url;
            }
        },
        name: 'CustomSidebar'
    }
</script>
  
<style scoped>
    .sidebar {
        width: 200px;
        position: absolute;
        z-index: 9999;
        height: 100%;
        background-color: #FFF;
        padding: 0 !important;
        margin: 0 !important;
    }
  
    .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
  
    .sidebar li {
        display: flex;
        align-items: center;
        border: 1px solid #21B26F;
        border-radius: 32px;
        padding: 8px 16px;
        margin: 1rem 1rem;
        cursor: pointer;
    }  

    .sidebar li:hover{
        background-color: #21B26F;
    }

    .sidebar li:hover div{
        color: white;
    }

    .sidebar li:hover .icon{
        color: white;
    }

    .icon{
        margin-right: 10px;
    }

    .sidebar div {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black;
        font-weight: 500;
    }
</style>
  