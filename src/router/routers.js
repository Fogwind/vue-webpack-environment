
let routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue'),
      meta:{
        // keepAlive:true,
        // title:"我的申报记录" 
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/About.vue'),
      meta:{
        // keepAlive:true,
        // title:"我的申报记录" 
      },
    },
    // {
    //   path: '/Skeleton',
    //   name: 'Skeleton',
    //   component: () => import('../Skeleton.vue'),
    //   meta:{
    //     // keepAlive:true,
    //     // title:"我的申报记录" 
    //   },
    // },
    
  ]
  export default routes