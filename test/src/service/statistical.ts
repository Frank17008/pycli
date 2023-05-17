import { request } from 'ice';
import prefix from './prefix';

const { api } = prefix;

export default {
  getGeomByStationId(params) {
    return request({
      url: `${api}/statisticAnalysis/query/geom`,
      method: 'get',
      params,
    });
  },
  getBuildingList(data) {
    return request({
      url: `${api}/statisticAnalysis/list/architecture`,
      method: 'post',
      data,
    });
  },
  downloadBuildingData(data) {
    return request({
      url: `${api}/statisticAnalysis/download/architecture`,
      method: 'post',
      data,
      responseType: 'blob',
    });
  },
  getBuildingCharts(data) {
    return request({
      url: `${api}/statisticAnalysis/areaInfo/architecture`,
      method: 'post',
      data,
    });
  },
  getGeomByLayer(params: { id: number; layer: string }) {
    return request({
      url: `${api}/statisticAnalysis/geom/layer`,
      method: 'get',
      params,
    });
  },
};
