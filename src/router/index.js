import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'employees.index',
        component: () => import('@/views/employees/IndexEmployee.vue')
    },
    {
        path: '/employees/create',
        name: 'employees.create',
        component: () => import('@/views/employees/CreateEmployee.vue')
    },
    {
        path: '/employees/:id/edit',
        name: 'employees.edit',
        component: () => import('@/views/employees/EditEmployee.vue')
    },
    {
        path: '/employees/:id/detail',
        name: 'employees.detail',
        component: () => import('@/views/employees/DetailEmployee.vue')
    },
    {
        path: '/positions',
        name: 'positions.index',
        component: () => import('@/views/positions/IndexPosition.vue')
    },
    {
        path: '/positions/create',
        name: 'positions.create',
        component: () => import('@/views/positions/CreatePosition.vue')
    },
    {
        path: '/positions/:id/edit',
        name: 'positions.edit',
        component: () => import('@/views/positions/EditPosition.vue')
    },
    {
        path: '/divisions',
        name: 'divisions.index',
        component: () => import('@/views/divisions/IndexDivision.vue')
    },
    {
        path: '/divisions/create',
        name: 'divisions.create',
        component: () => import('@/views/divisions/CreateDivision.vue')
    },
    {
        path: '/divisions/:id/edit',
        name: 'divisions.edit',
        component: () => import('@/views/divisions/EditDivision.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router