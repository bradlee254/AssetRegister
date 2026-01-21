import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Welcome from '../pages/auth/welcome.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue' 
//import Dashboard from '../pages/Dashboard.vue' 

import { AuthService } from '../services/auth.service'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  // 🔐 Example protected route
  {
    path: '/dashboard',
    component:() => import('../layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../pages/dashboard/Dashboard.vue')
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('../pages/categories/Categories.vue')
      },
      {
        path: '/assets',
        name: 'Assets',
        component: () => import('../pages/assets/Assets.vue')
      },{
        path: '/locations',
        name: 'Locations',
        component: () => import('../pages/assets/Location.vue')
      },
      {
        path: '/departments',
        name: 'Departments',
        component: () => import('../pages/assets/departments.vue')
      },
      {
        path: '/assignments',
        name: 'Assignments',
        component: () => import('../pages/assets/Assign.vue')
      },
      {
        path: '/licences',
        name: 'Licences',
        component: () => import('../pages/assets/License.vue')
      }
      // {
      //   path: '/reports',
      //   name: 'Reports',
      //   component: () => import('../pages/reports/Reports.vue')
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * Global Auth Guard
 */
router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated()
  const requiresAuth = to.matched.some(
    record => record.meta.requiresAuth
  )

  // 🔒 Not logged in → redirect to login
  if (requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // ✅ Otherwise allow navigation
  return next()
})

export default router
