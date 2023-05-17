import Service from '@/service';
import {
  getGeomByLineInterface,
  getListStationInterface,
  getStaticByParamsInterface,
  getStationListByLineNameInterface,
} from '@/service/bigscreen';
import { message } from 'antd';
import { createGlobalState } from 'react-hooks-global-state';
import { getGlobalViewState } from '@/components/Viewer/viewerState';
import { addMultiPolygon } from '@/components/Viewer/common';

export const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState({
  buttons: {
    lineSelectButton: true,
    overviewButton: true,
  },
  count: {
    lifeArea: 0,
    produceArea: 0,
    sumArea: 0,
    sumCount: 0,
  },
  pieData: [],
  lineData: [],
  currentLine: { id: 0, lineName: '全部' },
  stationList: [],
});
/**
 * 获的线路列表
 * @returns
 */
export const getLineInfo = () => {
  return Service.bigScreen
    .getLineInfo()
    .then((res) => {
      const data: any = [{ id: 0, lineName: '全部' }, ...res.data];
      setGlobalState('lineData', data);
    })
    .catch(() => message.error('查询线路列表失败'));
};
/**
 * 根据线路id获取geom
 * @param params
 * @returns
 */
export const getGeomByLine = (params: getGeomByLineInterface) => {
  return Service.bigScreen.getGeomByLine(params).then((res) => {
    if (res.data) {
      const viewer = getGlobalViewState('viewer');
      addMultiPolygon(viewer, { id: params.id, geom: JSON.parse(res.data) }, { fixedHeight: false, isLocation: true });
    }
  });
};
/**
 * 根据线路名称获取车站列表
 * @param params
 * @returns
 */
export const getStationListByLineName = (params: getStationListByLineNameInterface) => {
  return Service.bigScreen
    .getStationListByLineName(params)
    .then((res) => {
      if (res.data) {
        setGlobalState('count', res.data);
      }
    })
    .catch(() => message.error('查询车站列表失败'));
};
/**
 * 根据参数获取统计数据
 * @param params
 * @returns
 */
export const getStaticByParams = (params: getStaticByParamsInterface) => {
  return Service.bigScreen
    .getStaticByParams(params)
    .then((res) => {
      const filterData = res.data.map((_data) => {
        return { name: _data.category, value: _data.num };
      });
      setGlobalState('pieData', filterData);
    })
    .catch(() => message.error('查询统计数据失败'));
};

/**
 * 根据参数获取车站列表
 * @param params
 * @returns
 */
export const getStationList = (params: getListStationInterface) => {
  return Service.bigScreen
    .getListStation(params)
    .then((res) => setGlobalState('stationList', res.data))
    .catch(() => message.error('获取车站列表失败'));
};
