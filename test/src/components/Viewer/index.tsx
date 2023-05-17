import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { size } from 'lodash-es';
import styles from './index.module.scss';
import { useGlobalViewState } from './viewerState';

const { baseMapImage } = constants;
function Viewer(props, ref) {
  const containerRef = useRef(null);
  const [viewer, setViewer] = useGlobalViewState<any>('viewer');

  useImperativeHandle(
    ref,
    () => ({
      viewer,
    }),
    [viewer],
  );

  useEffect(() => {
    if (size(viewer) > 0) {
      viewer.scene.globe.depthTestAgainstTerrain = true;
      // 是否开启抗锯齿
      viewer.scene.fxaa = true;
      viewer.scene.postProcessStages.fxaa.enabled = true;

      window.viewer = viewer;
      const layers = viewer.scene.imageryLayers;

      /* layers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: 'http://192.168.1.200:18888/tmap/arcgis/services/railway/MapServer/tile/{z}/{y}/{x}',
          // rectangle: Cesium.Rectangle.fromDegrees(105.2732276, 31.475658, 111.458873, 39.7160911),
        }),
      ); */
      /* layers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: 'http://192.168.1.200:18888/tmap/arcgis/services/baojd/MapServer/tile/{z}/{y}/{x}',
          // rectangle: Cesium.Rectangle.fromDegrees(105.2732276, 31.475658, 111.458873, 39.7160911),
        }),
      ); */
    }
    /* viewer?.camera?.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(107.180249454328, 34.3717470843984, 1000),
      orientation: {
        heading: Cesium.Math.toRadians(175.0),
        pitch: Cesium.Math.toRadians(-35.0),
        roll: 0.0,
      },
    }); */
  }, [viewer]);
  useEffect(() => {
    Cesium.Ion.defaultAccessToken =
      // eslint-disable-next-line max-len
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMThiZmVjZS1hYWJkLTRkY2MtOGE1Ni03YTUzMjJjOGJlMzAiLCJpZCI6ODgwMzAsImlhdCI6MTY0ODg2MTc0N30.F0ltOiQpHxZ4n05JGlTFJbEBJCmuJqxSoW7NZeq07pU';

    if (containerRef.current && Cesium && size(viewer) === 0) {
      setViewer(
        new Cesium.Viewer(containerRef.current, {
          infoBox: false,
          selectionIndicator: false,
          navigation: false,
          animation: false,
          shouldAnimate: false,
          timeline: false,
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          fullscreenButton: !1,
          /* terrainProvider: Cesium.createWorldTerrain({
            // required for water effects
            requestWaterMask: true,
            // required for terrain lighting
            requestVertexNormals: true,
          }), */
          imageryProvider: new Cesium.UrlTemplateImageryProvider({
            url: baseMapImage,
            maximumLevel: 16,
            rectangle: Cesium.Rectangle.fromDegrees(105.2732276, 31.475658, 111.458873, 39.7160911),
          }),
        }),
      );
    }

    return () => {
      if (size(viewer) > 0) {
        viewer?.destroy();
        setViewer({});
      }
    };
  }, []);

  return (
    <div className={styles['scene-container']}>
      <div className={styles['map-container']} ref={containerRef} />
      <div className={styles['content-container']}>{props.children}</div>
    </div>
  );
}

export default forwardRef(Viewer);
