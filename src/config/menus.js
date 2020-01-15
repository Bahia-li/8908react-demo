import {
  duration
} from "moment";

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
    title: '首页',
    icon: 'home',
    path: '/'
  },
  {
    title: '商品',
    icon: 'appstore',
    path: '/products',
    children: [{
      title: '分类管理',
      icon: 'bars',
      path: '/category',
    }, {
      title: '商品管理',
      icon: 'tool',
      path: '/product',
    }]
  }, {
    title: '用户管理',
    icon: 'user',
    path: '/user'
  }, {
    title: '权限管理',
    icon: 'safety-certificate',
    path: '/role'
  }, {
    title: '图形列表',
    icon: 'area-chart',
    path: '/charts',
    children: [{
        title: '柱状图',
        icon: 'bar-chart',
        path: '/chart/bar',
      }, {
        title: '折线图',
        icon: 'line-chart',
        path: '/chart/line',
      },
      {
        title: '饼状图',
        icon: 'pie-chart',
        path: '/chart/pie',
      }
    ]
  }
]

//暴露
export default munes;