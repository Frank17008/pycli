import Loading from './loading';

let loadingInstance: any = null;
const getLoadingInstance = (tip) => {
  loadingInstance = loadingInstance || Loading.newInstance({ tip });
  return loadingInstance;
};
export default {
  open(tip?) {
    getLoadingInstance(tip);
  },
  close() {
    if (loadingInstance) {
      loadingInstance?.destroy();
      loadingInstance = null;
    }
  },
};

export { Loading };
