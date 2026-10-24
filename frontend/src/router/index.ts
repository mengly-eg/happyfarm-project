import { createRouter, createWebHistory } from 'vue-router'
import BatchListView    from '../views/BatchListView.vue'
import BatchDetailView  from '../views/BatchDetailView.vue'
import EquipmentListView from '../views/EquipmentListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'batch-list',
      component: BatchListView,
    },
    {
      path: '/batches/:id',
      name: 'batch-detail',
      component: BatchDetailView,
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: EquipmentListView,
    },
  ],
})

export default router
