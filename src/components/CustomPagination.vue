<template>
    <ul class="pagination d-flex justify-content-between align-items-center">
        <li :class="{ 'disabled': currentPage === 1 }">
            <a @click="goToPage(currentPage - 1)" class="page-link btn-nav">Previous</a>
        </li>
        <div class="number">
            <li v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
                <a @click="goToPage(page)" class="page-link">{{ page }}</a>
            </li>
        </div>
        <li :class="{ 'disabled': currentPage === totalPages }">
            <a @click="goToPage(currentPage + 1)" class="page-link btn-nav">Next</a>
        </li>
    </ul>
</template>
  
<script>
    export default {
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            totalPages: {
                type: Number,
                required: true
            }
        },
        methods: {
            goToPage(page) {
                console.log(page, this.currentPage)
                if (page >= 1 && page <= this.totalPages) {
                    this.$emit('page-changed', page);
                }
            }
        }
    };
</script>

<style>
    .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 20px 4rem;
        border-radius: 4px;
    }
  
    .pagination li {
        display: inline;
        border-color: #198754;
    }

    .pagination li a:hover {
        display: inline;
        background-color: #198754;
        border-color: #198754;
        color: #fff;
        cursor: pointer;
    }

    .pagination .number li a {
        margin: 0 0.2rem;
    }
  
    .pagination li a {
        background-color: #fff;
        border: 1px solid gray;
        border-radius: 8px;
        color: black;
        float: left;
        line-height: 1.42857143;
        margin-left: -1px;
        padding: 6px 12px;
        position: relative;
        text-decoration: none;
    }
  
    .pagination li.disabled a {
        color: #777;
        cursor: not-allowed;
    }
  
    .pagination .number li.active a {
        z-index: 2;
        color: #fff;
        background-color: #198754;
        border-color: #198754;
        cursor: default;
    }
</style>
  