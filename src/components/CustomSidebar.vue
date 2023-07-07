<!-- Sidebar.vue -->
<template>
    <div class="sidebar">
        <ul>
            <li>
                <a href="/">
                    <svg-icon type="mdi" class="icon" :path="mdi_employee"></svg-icon>
                    Karyawan
                </a>
            </li>
            <li>
                <a href="/divisions">
                    <svg-icon type="mdi" class="icon" :path="mdi_division"></svg-icon>
                    Divisi
                </a>
            </li>
            <li>
                <a href="/positions">
                    <svg-icon type="mdi" class="icon" :path="mdi_position"></svg-icon>
                    Posisi
                </a>
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
    }  

    .sidebar li:hover{
        background-color: #21B26F;
    }

    .sidebar li:hover a{
        color: white;
    }

    .sidebar li:hover .icon{
        color: white;
    }

    .icon{
        margin-right: 10px;
    }

    .sidebar a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black;
        font-weight: 500;
    }
</style>
  