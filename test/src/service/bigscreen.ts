import { request } from 'ice';

import prefix from './prefix';

const { api } = prefix;

export interface getGeomByLineInterface {
  id: string;
}
export interface getStationListByLineNameInterface {
  lineName: string;
}
export interface getStaticByParamsInterface {
  lineName: string;
  category?: string;
}

export interface getListStationInterface {
  lineName: '';
}
export default {
  getLineInfo() {
    return request({
      url: `${api}/largeScreen/query/lineInfo`,
      method: 'get',
    });
  },
  getGeomByLine(params: getGeomByLineInterface) {
    return request({
      url: `${api}/largeScreen/query/lineGeom`,
      method: 'get',
      params,
    });
  },
  getStationListByLineName(params: getStationListByLineNameInterface) {
    return request({
      url: `${api}/largeScreen/query/stationInfo`,
      method: 'get',
      params,
    });
  },
  getStaticByParams(params: getStaticByParamsInterface) {
    return request({
      url: `${api}/largeScreen/query/usage`,
      method: 'get',
      params,
    });
  },
  getListStation(params: getListStationInterface) {
    return request({
      url: `${api}/stationOverview/list-station`,
      method: 'get',
      params,
    });
  },
};
