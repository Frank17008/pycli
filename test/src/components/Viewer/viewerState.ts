import { createGlobalState } from 'react-hooks-global-state';

export const {
  getGlobalState: getGlobalViewState,
  setGlobalState: setGlobalViewState,
  useGlobalState: useGlobalViewState,
} = createGlobalState({
  viewer: {},
  imageLayerCollection: new Cesium.ImageryLayerCollection(),
});
