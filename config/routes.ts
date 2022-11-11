export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/accountcenter/rolemanagement',
  },
  // {
  //   path: '/welcome',
  //   name: '欢迎',
  //   access: 'a',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  {
    path: '/TableList',
    name: 'TAB',
    icon: 'BarChartOutlined',
    access: '0',
    component: './TableList',
  },
  {
    path: '/accountcenter',
    name: '账号中心',
    access: '0',
    icon: 'crown',
    routes: [
      {
        path: '/accountcenter/management',
        name: '账号管理',
        access: '1',
        icon: 'BarChartOutlined',
        component: './AccountCenter/Management',
      },
      {
        path: '/accountcenter/rolemanagement',
        name: '角色管理',
        icon: 'BarChartOutlined',
        access: '2',
        component: './AccountCenter/RoleManagement',
      },
      {
        path: '/accountcenter/personalcenter',
        name: '个人中心',
        icon: 'BarChartOutlined',
        access: '3',
        component: './AccountCenter/PersonalCenter',
      },
    ]
  },
  {
    component: './404',
  },
];
