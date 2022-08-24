export default {
  title: '金成的个人网站',
  description: '金成的个人网站',

  themeConfig: {
    sidebar: {
      '/blog/': sidebarBlog()
    }
  }
}

function sidebarBlog() {
  return [
    {
      text: '',
      items: [
        { text: '欢迎', link: '/blog/welcome' }
      ],
    },
    {
      text: 'HTTP',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'HTTP 基础知识', link: '/blog/http/http_basic/' },
      ]
    },
    {
      text: 'BOM',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'AJAX', link: '/blog/bom/ajax/' },
        { text: 'CORS 跨域资源共享', link: '/blog/bom/cors/' },
        { text: 'JSONP', link: '/blog/bom/jsonp/' },
      ]
    },
    {
      text: 'DOM',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'DOM 事件标准与模型', link: '/blog/dom/dom_events/' },
      ]
    },
    {
      text: 'JavaScript',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'JS 中的数组', link: '/blog/js/array_in_js/' },
        { text: 'JS 实现深拷贝', link: '/blog/js/deep_clone/' },
        { text: 'JS 中的函数', link: '/blog/js/function_in_js/' },
        { text: 'JS 垃圾回收和内存泄漏', link: '/blog/js/garbage_collection_and_memory_leak/' },
        { text: 'JS 高阶函数', link: '/blog/js/higher_function/' },
        { text: 'JS 中的对象', link: '/blog/js/object_in_js/' },
        { text: 'Promise、微任务、宏任务', link: '/blog/js/promise/' },
        { text: 'JS 中的原型和原型链', link: '/blog/js/prototype/' },
        { text: 'JS 深浅拷贝', link: '/blog/js/shallow_and_deep_clone/' },
        { text: 'JS 栈内存和堆内存', link: '/blog/js/stack_and_heap/' },
        { text: 'JS 中的 this 和 arguments', link: '/blog/js/this_and_arguments/' },
      ]
    },
    {
      text: 'Vue',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Vue 数据响应式原理', link: '/blog/vue/vue_data_reactivity/' },
        { text: 'Vue 之 MVVM', link: '/blog/vue/vue_mvvm/' },
        { text: 'Vue 运行时+编译器 vs. 仅运行时', link: '/blog/vue/vue_runtime_runtime-only/' },
        { text: 'Vue2 data 选项存在的问题', link: '/blog/vue/vue2_data_problem/' },
        { text: 'Vue3 响应性原理之 Proxy & Reflect', link: '/blog/vue/vue3_reactivity_proxy_reflect/' },
        { text: 'Vue3 响应性原理之 track & trigger', link: '/blog/vue/vue3_reactivity_track_trigger/' },
      ]
    },
    {
      text: 'Ruby',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Ruby on rails 之创建项目', link: '/blog/ruby/ruby_on_rails_01_create/' },
        { text: 'Ruby on rails 之初体验', link: '/blog/ruby/ruby_on_rails_02_start/' },
        { text: 'Ruby on rails 之创建路由', link: '/blog/ruby/ruby_on_rails_03_routes/' },
        { text: 'Ruby on rails 之分页', link: '/blog/ruby/ruby_on_rails_04_pagination/' },
        { text: 'Ruby on rails 之单元测试', link: '/blog/ruby/ruby_on_rails_05_testing/' },
      ]
    },
    {
      text: 'Docker',
      collapsible: true,
      collapsed: true,
      items: [
        { text: '云服务器安装 Docker', link: '/blog/docker/ecs_docker/' },
      ]
    },
    {
      text: '算法',
      collapsible: true,
      collapsed: true,
      items: [
        { text: '排序算法', link: '/blog/algorithm/sort/' },
      ]
    },
    {
      text: '其它',
      collapsible: true,
      collapsed: true,
      items: [
        { text: '用 JS 理解函数柯里化', link: '/blog/misc/currying/' },
        { text: '用 TS 实现 EventHub（发布/订阅模式）', link: '/blog/misc/eventhub/' },
        { text: '到底什么是前端架构？', link: '/blog/misc/fe_arch/' },
        { text: '在 NPM 上发布一个命令行工具包', link: '/blog/misc/make_npm_package/' },
        { text: '用 JS 理解递归', link: '/blog/misc/recursion/' },
      ]
    },
  ]
}