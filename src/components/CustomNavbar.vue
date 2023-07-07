<template>
    <header class="navbar">
        <div class="logo">
            <h1>SIM KARYAWAN</h1>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'CustomNavbar'
    }
</script>

<style scoped>
    .navbar {
        background-color: #198754;
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .logo h1 {
        margin: 0;
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