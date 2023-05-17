import { request } from 'ice';

import prefix from './prefix';

const { api } = prefix;

export interface getStationListInterface {
  category: number;
  stationName?: string;
}
export interface getLayerGeomByParamsInterface {
  children: string;
  layer: string;
  station: string;
}

export interface getLayerSearchByNameInterface {
  keyWords: string;
  station: string;
  current?: number;
  size?: number;
}
export interface getGeomByLayerAndIdInterface {
  id: number;
  layer: string;
}
export default {
  getStationList(params: getStationListInterface) {
    return request({
      url: `${api}/stationOverview/query/station`,
      method: 'get',
      params,
    });
  },
  getLayerList() {
    return request({
      url: `${api}/stationOverview/query/layer`,
      method: 'get',
    });
  },
  getLayerGeomByParams(params: getLayerGeomByParamsInterface) {
    return request({
      url: `${api}/stationOverview/query/layerGeom`,
      method: 'get',
      params,
    });
  },
  getArchitectureListByParams(params) {
    const { current, ...otherParams } = params;
    return request({
      url: `${api}/stationOverview/list/architecture`,
      method: 'post',
      params: { current: current || 1, size: 20 },
      data: otherParams,
    });
  },
  getAreaListByParams(params) {
    const { current, ...otherParams } = params;

    return request({
      url: `${api}/stationOverview/list/area`,
      method: 'post',
      params: { current: current || 1, size: 20 },
      data: otherParams,
    });
  },
  getLayerSearchByName(params: getLayerSearchByNameInterface) {
    return request({
      url: `${api}/stationOverview/layer/search`,
      method: 'get',
      params: { ...params, size: 20, current: 1 },
    });
  },
  getGeomByLayerAndId(params: getGeomByLayerAndIdInterface) {
    return request({
      url: `${api}/stationOverview/geom-info`,
      method: 'get',
      params,
    });
  },
  getDataByLayerAndId(params: getGeomByLayerAndIdInterface) {
    return request({
      url: `${api}/stationOverview/data-info`,
      method: 'get',
      params,
    });
  },
};
