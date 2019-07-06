import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Index from '@/pages/productManagement/index'
import ProductList from '@/pages/productManagement/productList'
import ProductType from '@/pages/productManagement/ProductType'
import OrderList from '@/pages/orderManagement/orderList'
import UserList from '@/pages/userManagement/userList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/product-list',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/product-type',
      name: 'ProductType',
      component: ProductType
    },
    {
      path: '/order-list',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/user-list',
      name: 'UserList',
      component: UserList
    }
  ]
})
