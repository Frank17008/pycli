/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './index.module.scss';
import { chineseMatch } from './chineseMatch';
import IconFont from '../IconFont';
import { size } from 'lodash-es';
import moment from 'moment';

const InfoWindow = ({ viewer, position, info }: { viewer: any; position?: any; info?: any }, ref) => {
  const containerRef = useRef<any>();
  const infoWindowRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({ closeWindow }));
  const closeWindow = () => {
    infoWindowRef.current?.closeWindow();
  };
  useEffect(() => {
    if (containerRef.current && viewer && size(viewer) > 0 && position && size(position) > 0) {
      const { lng, lat, alt } = position;
      infoWindowRef.current = new TMap3D.InfoWindow(
        viewer,
        Cesium.Cartesian3.fromDegrees(lng, lat, alt),
        containerRef.current,
        {
          showMode: 'Center',
        },
      );
    }
    return () => {
      closeWindow();
    };
  }, [viewer, position, info]);

  return (
    <div ref={containerRef} className={`${styles['info-window']} ${styles[info ? '' : 'no-data']}`}>
      {info && size(info) > 0 && (
        <div className={styles['info-container']}>
          <div className={styles.title}>
            {info.name ? info.name : '暂无名称'}
            <IconFont type="icon-guanbi" onClick={closeWindow} />
          </div>
          <div className={styles['info-content']}>
            {Object.keys(info).map(
              (item) =>
                chineseMatch[item] && (
                  <div className={styles.item} key={item}>
                    <div className={styles['item-label']}>{chineseMatch[item]}:</div>
                    <div className={`${styles['item-value']}`}>
                      {['coversArea', 'architectureArea', 'area'].includes(item)
                        ? `${info[item]}㎡`
                        : item === 'houseCreateTime'
                        ? info[item]
                          ? moment(info[item]).format('YYYY年MM月')
                          : ''
                        : info[item]}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default forwardRef(InfoWindow);
