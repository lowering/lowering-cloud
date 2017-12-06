import dynamic from 'dva/dynamic';
import Provider from './provider';

const mixin = (models,component) => {
    return dynamic({
        app: Provider.get(),
        models: () => models,
        component: () => component,
      });
}

export default mixin;