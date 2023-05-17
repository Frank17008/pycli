window.constants = {
  system: {
    icon: '',
    title: '建筑施工安全监测平台',
    backgroundUrl: '/imageUrls/login/bg.png',
  },
  setSystemTitle: (titleText) => {
    const titleDom = document.getElementsByTagName('title')[0];
    titleDom.innerText = titleText;
  },
  menuIconEnum: [
    {
      path: '/screen',
      name: '大数据综合展示',
      icon: '',
    },
    {
      path: '/info',
      name: '施工信息管理',
      icon: '',
    },
    {
      path: '/status',
      name: '安全状态检查',
      icon: '',
    },
    {
      path: '/manager',
      name: '运维管理',
      icon: '',
    },
  ],
  baseMapImage: 'http://192.168.1.1:18888/tmap/arcgis/services/shanx/MapServer/tile/{z}/{y}/{x}',
  baseMap: 'http://192.168.1.1:18888/tmap/arcgis/services/dataTest/MapServer/tile/{z}/{y}/{x}',
  stationInfo: [
    { name: '建河站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/jianh/MapServer/tile/{z}/{y}/{x}' },
    { name: '凤阁岭站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/fenggl/MapServer/tile/{z}/{y}/{x}' },
    { name: '拓石站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/tuos/MapServer/tile/{z}/{y}/{x}' },
    { name: '东口站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/dongk/MapServer/tile/{z}/{y}/{x}' },
    { name: '兴平站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/xingp/MapServer/tile/{z}/{y}/{x}' },
    { name: '坪头站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/pingt/MapServer/tile/{z}/{y}/{x}' },
    { name: '阳平站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/yangp/MapServer/tile/{z}/{y}/{x}' },
    { name: '石家滩站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/shijt/MapServer/tile/{z}/{y}/{x}' },
    { name: '晁峪站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/chaoy/MapServer/tile/{z}/{y}/{x}' },
    { name: '武功站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/wug/MapServer/tile/{z}/{y}/{x}' },
    { name: '固川站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/guc/MapServer/tile/{z}/{y}/{x}' },
    { name: '蔡家坡站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/caojp/MapServer/tile/{z}/{y}/{x}' },
    { name: '茂陵站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/maol/MapServer/tile/{z}/{y}/{x}' },
    { name: '杨陵站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/yangl/MapServer/tile/{z}/{y}/{x}' },
    { name: '绛帐站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/jiangz/MapServer/tile/{z}/{y}/{x}' },
    {
      name: '坊塘铺所站',
      imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/fangtp/MapServer/tile/{z}/{y}/{x}',
    },
    { name: '卧龙寺站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/wols/MapServer/tile/{z}/{y}/{x}' },
    { name: '眉县东站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/meixd/MapServer/tile/{z}/{y}/{x}' },
    { name: '颜家河站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/yanjh/MapServer/tile/{z}/{y}/{x}' },
    { name: '福临堡站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/fulb/MapServer/tile/{z}/{y}/{x}' },
    { name: '马嵬坡站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/mawp/MapServer/tile/{z}/{y}/{x}' },
    { name: '社棠站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/shet/MapServer/tile/{z}/{y}/{x}' },
    {
      name: '宝鸡东站',
      imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/baojd/MapServer/tile/{z}/{y}/{x}',
    },
    { name: '宝鸡站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/baoj/MapServer/tile/{z}/{y}/{x}' },
    { name: '眉县站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/meix/MapServer/tile/{z}/{y}/{x}' },
    { name: '虢镇站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/yaoz/MapServer/tile/{z}/{y}/{x}' },
    { name: '马家湾站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/majw/MapServer/tile/{z}/{y}/{x}' },
    { name: '元龙站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/yuanl/MapServer/tile/{z}/{y}/{x}' },
    { name: '伯阳站', imageUrl: 'http://192.168.1.1:18888/tmap/arcgis/services/boy/MapServer/tile/{z}/{y}/{x}' },
  ],
};

// 初始化时设置系统标题
window.constants.setSystemTitle(window.constants.system.title);
