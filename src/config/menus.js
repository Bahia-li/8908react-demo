/**
 * 定义导航列表数据及状态
 */

/**
 * munes 类型 Array
 * title 标题
 * icon 小图标
 * path 跳转路径
 * children 子选项 里面也是对象
 */
const munes = [{
    title: 'home',
    icon: 'home',
    path: '/'
  },
  {
    title: 'products',
    icon: 'appstore',
    path: '/products',
    children: [{
      title: 'category',
      icon: 'bars',
      path: '/category',
    }, {
      title: 'product',
      icon: 'tool',
      path: '/product',
    }]
  }, {
    title: 'user',
    icon: 'user',
    path: '/user'
  }, {
    title: 'role',
    icon: 'safety-certificate',
    path: '/role'
  }, {
    title: 'charts',
    icon: 'area-chart',
    path: '/charts',
    children: [{
        title: 'bar',
        icon: 'bar-chart',
        path: '/charts/bar',
      }, {
        title: 'line',
        icon: 'line-chart',
        path: '/charts/line',
      },
      {
        title: 'pie',
        icon: 'pie-chart',
        path: '/charts/pie',
      }
    ]
  }
]

//暴露
export default munes;