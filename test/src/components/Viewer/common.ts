/**
 * 调整倾斜模型高度
 * @param e
 * @param height
 */
export const adjustHeight = (e, height) => {
  const heightOffset = height; // 高度
  const { boundingSphere } = e;
  const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
  const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
  const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
  const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
  e.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
};
/**
 * 实例化
 * @param features
 * @returns geometry实例
 */
export const getGeometryInstance = ({
  features,
  color,
  type,
  table,
}: {
  features: any;
  color?: string;
  type: string;
  table?: string;
}) => {
  const instances: any = [];
  features.forEach((feature) => {
    const polygonArr = feature.geom.coordinates.join().split(',');
    const polygon = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(polygonArr)),
      // perPositionHeight: true,
      height: 0.5,
    });
    const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
    instances.push(
      new Cesium.GeometryInstance({
        geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString(color || '#0BFF0D')),
          // show: new Cesium.ShowGeometryInstanceAttribute(true),
        },
        id: feature.id,
      }),
    );
  });
  const primitive = new Cesium.Primitive({
    geometryInstances: instances,

    /* appearance: new Cesium.EllipsoidSurfaceAppearance({
      aboveGround: true,
    }), */
    appearance: new Cesium.PerInstanceColorAppearance({
      // 为每个instance着色
      flat: true,
      faceForward: true,
    }),

    // classificationType: Cesium.ClassificationType.BOTH,
  });
  primitive.type = type;
  primitive.table = table;
  return primitive;
};
/**
 * 将实例化后features添加到场景
 * @param scene
 * @param instances
 */
export const addPrimitiveToViewer = (scene, primitive) => {
  scene.primitives.add(primitive);
};
/**
 * 将实例化后features从场景中删除
 * @param scene
 * @param instances
 */
export const removePrimitiveToViewer = (scene, primitive) => {
  scene.primitives.remove(primitive);
};
/**
 *动态围墙
 * @param viewer
 * @param features
 */
const addFence = (viewer, features) => {
  viewer.entities.add({
    name: 'PolylineTrail',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(features),
      width: 5,
      material: new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.fromCssColorString('#0BFF0D'), 3000),
    },
  });
};

// 坐标转换
export const coordinateToPositions = (coordinates) => {
  if (!Array.isArray(coordinates)) {
    return [];
  }
  const lonLatArray: any = [];
  coordinates.forEach((coor) => {
    coor.forEach((c) => lonLatArray.push(Cesium.Cartesian3.fromDegrees(c[0], c[1], 0)));
  });
  return lonLatArray;
};

/**
 * 移动数组某个元素到指定位置
 * @param arr
 * @param a
 * @param b
 */
export const moveInArray = (arr, from, to) => {
  // 确保是有效数组
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    throw new Error('Please provide a valid array');
  }

  // 删除当前的位置
  const item = arr.splice(from, 1);

  // 确保还剩有元素移动
  if (!item.length) {
    throw new Error('There is no item in the array at index ' + from);
  }

  // 移动元素到指定位置
  arr.splice(to, 0, item[0]);
  return arr;
};

const eventMatch = {
  click: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  rightClick: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  wheel: Cesium.ScreenSpaceEventType.WHEEL,
};
/**
 * 事件监听
 * @param param0
 */
export const handleEvent = ({
  viewer,
  callBack,
  type = 'click',
}: {
  viewer: any;
  callBack: Function;
  type?: string;
}) => {
  if (viewer) {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas); // 获取地图对象
    handler.setInputAction((event) => {
      const pickObj = viewer.scene.pick(event.position);
      const lonlat = cartesian2ToWgs84(viewer, event.position);
      callBack && callBack({ pickObj, lonlat });
    }, eventMatch[type]);
  }
};
/**
 * 移除事件监听
 * @param param0
 */
export const handleRemoveEvent = ({ viewer, type = 'click' }) => {
  if (viewer) {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas); // 获取地图对象
    handler.removeInputAction(eventMatch[type]);
  }
};
/**
 * 屏幕坐标转经纬度
 * @param viewer
 * @param pt
 * @returns
 */
export const cartesian2ToWgs84 = (viewer, pt) => {
  const cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pt), viewer.scene);
  const { ellipsoid } = viewer.scene.globe;
  const cartographic = ellipsoid.cartesianToCartographic(cartesian);
  const lat = Cesium.Math.toDegrees(cartographic.latitude);
  const lon = Cesium.Math.toDegrees(cartographic.longitude);
  return [lon, lat];
};
/**
 * 世界坐标转化为经纬度
 */
export const cartesian3ToWGS84 = (point) => {
  const cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
  const lat = Cesium.Math.toDegrees(cartographic.latitude);
  const lng = Cesium.Math.toDegrees(cartographic.longitude);
  const alt = cartographic.height;
  return { lng, lat, alt };
};
/**
 * 加载3dtiles
 * @param param0
 */
export const add3dTiles = ({ viewer, urls }) => {
  if (viewer) {
    const modelArray: any = [];
    urls.forEach((url, i) => {
      modelArray.push(
        new Cesium.Cesium3DTileset({
          url,
          maximumMemoryUsage: 4096,
          skipLevelOfDetail: true,
          skipScreenSpaceErrorFactor: 16,
          immediatelyLoadDesiredLevelOfDetail: false,
          loadSiblings: false,
          cullWithChildrenBounds: true,
        }),
      );
    });
    modelArray.forEach((model) => {
      viewer.scene.primitives.add(model);
    });
    modelArray[0].readyPromise.then((e) => {
      // adjustHeight(e, -373);
      viewer.camera.flyToBoundingSphere(e.boundingSphere);
    });
  }
};
/**
 * 定位
 * @param param0
 */
export const flyToPolygon = ({ viewer, x, y, z = 1000 }) => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(x, y, z),
    orientation: {
      heading: 0,
      /*  pitch: -0.6991817544299588,
      roll: 6.283185307178684, */
    },
  });
};

// 绘制几何要素
export const drawGemotry = ({ viewer, type, callBack }) => {
  if (!viewer || !TMap3D) return;
  viewer?.entities?.removeAll();
  const plotLayer = new TMap3D.Layers.MilitaryPlotLayer(viewer);
  const drawHandle = new TMap3D.Tools.MilitaryPlotDraw(viewer);
  drawHandle.PlotDrawEndEvent.addEventListener((plot) => {
    plotLayer.addPlot(plot.toGeoJson());
    plot.remove();
    // 取出polygon的第一个点坐标
    const firstPoint = plot.toGeoJson().geometry.coordinates[0][0];
    // 构造完全闭合的polygon坐标数据
    plot.toGeoJson().geometry.coordinates[0].push(firstPoint);
    // 构造伪geojson
    const multiPolygon = {
      type: 'Polygon',
      coordinates: plot.toGeoJson().geometry.coordinates,
    };
    callBack && callBack(JSON.stringify(multiPolygon));
  });
  drawHandle.activate(type);
  return { layer: plotLayer, drawHandle };
};

export const clearDraw = ({ layer, drawHandle }, viewer) => {
  viewer && viewer?.entities?.removeAll();
  layer && layer.clear();
  drawHandle && drawHandle.deactivate();
};

export const addGeoJsonPlots = (layer, data) => {
  if (!layer || !data?.length) return;
  const plots = data.map((p) => {
    return {
      type: 'Feature',
      properties: {
        plotBase: 'GeoPlot',
        plotCode: p.id,
        plotName: '面',
        plotType: 'polygon',
        style: undefined,
      },
      geometry: { type: 'Polygon', coordinates: p.geometry.coordinates[0] },
    };
  });
  plots.forEach((feature) => {
    layer.addPlot(feature);
  });
};

interface optionsInterface {
  fixedHeight?: boolean;
  showBorder?: boolean;
  borderWidth?: number;
  borderColor?: string;
  isLocation?: boolean | true;
  onClick?: Function;
  scale?: number;
}

export const bindEvents = (viewer, type, cb) => {
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas); // 获取地图对象
  handler.setInputAction((e) => {
    const pickObj = viewer.scene.pick(e.position);
    if (!pickObj || !pickObj.id) return;
    const lonlat = cartesian2ToWgs84(viewer, e.position);
    cb && cb({ id: pickObj.id?.id, position: { lng: lonlat[0], lat: lonlat[1] } });
  }, eventMatch[type]);
};

export const addMultiPolygon = (
  viewer,
  { id, geom, properties }: { id: any; geom: any; properties?: any },
  options?: optionsInterface,
) => {
  if (!viewer || !TMap3D) return;
  const { fixedHeight = true, showBorder, borderWidth, borderColor, isLocation = true, onClick, scale }: any = options;
  if (geom?.type === 'MultiPolygon') {
    const position = geom.coordinates[0][0].map((item) => Cesium.Cartesian3.fromDegrees(item[0], item[1], 0.1));
    const entity = viewer.entities.add({
      id,
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(position),
        material: Cesium.Color.YELLOW.withAlpha(0.5),
        perPositionHeight: fixedHeight,
      },
      properties,
    });
    if (showBorder) {
      entity.polygon.outlineWidth = borderWidth || 5;
      entity.polygon.fill = false;
      entity.polyline = {
        positions: entity.polygon.hierarchy._value.positions,
        width: entity.polygon.outlineWidth,
        material: Cesium.Color.fromCssColorString(borderColor || '#ff0000'),
        clampToGround: true,
      };
    }
    onClick && bindEvents(viewer, 'click', onClick);
    // isLocation && viewer.zoomTo(entity);
    isLocation && flyToRectangle(viewer, position, 0, -90, scale);
  }
};

// 通过id设置entity高亮闪烁
export const setEntityActiveById = (viewer, id) => {
  if (!viewer || !id) return;
  let x = 1;
  let flog = true;
  const entity = viewer.entities.getById(id);
  if (entity) {
    entity.polygon.material.color = Cesium.Color.YELLOW.withAlpha(0.5);
    entity.polygon.show = new Cesium.CallbackProperty(() => {
      if (flog) {
        x -= 0.05;
        if (x <= 0) {
          flog = false;
        }
      } else {
        x += 0.05;
        if (x >= 1) {
          flog = true;
        }
      }
      return x >= 0.5;
    }, false);
    setTimeout(() => {
      entity.polygon.show = true;
    }, 3000);
    return true;
  }
  return false;
};
export const removeEntityByIds = (viewer, ids) => {
  if (!viewer || !Array.isArray(ids)) return;
  ids.forEach((id) => viewer.entities.removeById(id));
};
/**
 * 添加影像到场景中
 * @param viewer
 * @param data
 * @returns
 */
export const addImageToViewer = (viewer, url) => {
  if (!viewer || !TMap3D) return;
  const layer = viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url,
      maximumLevel: 22,
      // rectangle: Cesium.Rectangle.fromDegrees(105.2732276, 31.475658, 111.458873, 39.7160911),
    }),
  );
  return layer;
};
/**
 * 从场景中删除影像
 * @param viewer
 * @param imageLayer
 */
export const removeImageToViewer = (viewer, imageLayer) => {
  if (!viewer || !TMap3D) return;
  viewer.imageryLayers.remove(imageLayer);
};

/**
 * @description: 飞行定位到一个视锥体(矩形)
 * @param {Array.<Cartesian3>} cartesians 笛卡尔坐标数组 Array.<Cartesian3>
 * @param {Number} heading  =0.0   偏航角 正北,由正北向东偏向为正
 * @param {*} pitch  =-90     俯仰角  =-90 ENU局部坐标系，XY平面的旋转角度，平面下为负，上为正，
 * @param {*} scale    =1.0   范围缩放倍率
 * @param {*} duration =3   持续时间
 * @param {*} callBack =null   回调函数，定位完成后执行
 * @return {*}
 */
export const flyToRectangle = (viewer, cartesians, heading = 0, pitch = -90, scale = 1, duration?, callBack?) => {
  if (!viewer || !Array.isArray(cartesians)) return;
  // if (scale < 0.1) scale = 1.0;
  const rec = Cesium.Rectangle.fromCartesianArray(cartesians);
  const boundingSphere = Cesium.BoundingSphere.fromRectangle3D(rec);
  boundingSphere.radius *= scale;
  viewer.camera.flyToBoundingSphere(boundingSphere, {
    duration: duration || 2,
    maximumHeight: undefined,
    complete() {
      callBack && callBack();
    },
    cancel() {
      console.log('定位取消！');
    },
    offset: {
      heading: Cesium.Math.toRadians(heading),
      pitch: Cesium.Math.toRadians(pitch),
      range: 0.0,
    },
  });
};

// 添加动态围栏
export const addStripWall = (viewer, geom) => {
  if (!viewer || !TMap3D) return;
  if (geom?.type === 'MultiPolygon') {
    const position = geom.coordinates[0][0].map((item) => Cesium.Cartesian3.fromDegrees(item[0], item[1], 0));
    const stripWall = new TMap3D.Effects.StripeAnimateWall(viewer, position, 50, Cesium.Color.RED, 1000);
    flyToRectangle(viewer, position);
    return stripWall;
  }
};
