import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { title: 'Iniciar sesión' },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/crear-cuenta',
    name: 'Register',
    meta: { title: 'Crear Cuenta' },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requireAuth: true }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if ( to.meta.requireAuth ){
    if (localStorage.token) {// Obtenga si el token actual existe
      console.log("token existe");
      next();
    }else {
      console.log("el token no existe");
      next({
        path: '/', // Tome la ruta de la ruta redirigida como parámetro y salte a la ruta después de iniciar sesión correctamente
        //query: {redirect: to.fullPath}
      })
    }
  }else{
    next();
  }

  //document.title = to.meta.title;
  //next();
});

export default router
