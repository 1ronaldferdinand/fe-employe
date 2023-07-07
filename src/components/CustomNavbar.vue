<template>
    <div class="navbar">
        <div class="logo">
            <svg-icon type="mdi" class="icon" :path="path" :size="32"></svg-icon>
            <h1>SIM KARYAWAN</h1>
        </div>
    </div>
</template>

<script>
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiFolderEditOutline } from '@mdi/js';

    export default {
        name: 'CustomNavbar',
        components: {
            SvgIcon
        },
        data() {
          return {
             path: mdiFolderEditOutline,
          }
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #198754;
        padding: 1rem 2rem;
        display: flex;
        align-items: center;
    }

    .logo {
        display: flex;
        align-items: center;
    }

    .logo .icon {
        color: white;
    }

    .logo h1 {
        margin: 0 0 0 1rem;
        font-size: 24px;
        color: #FFF;
    }

    .navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
    }

    .navbar li {
        margin-right: 10px;
    }

    .navbar a {
        text-decoration: none;
        color: #333;
    }
</style>