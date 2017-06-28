export default  [
  {
    path: '/',
    name: '',
    component: () => import(`components/demo/demo.vue`)
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import(`components/demo/demo.vue`)
  }
]
