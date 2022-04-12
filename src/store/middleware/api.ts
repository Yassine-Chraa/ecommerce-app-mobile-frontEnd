import axios from 'axios';
import * as actions from '../apiActions';

const endpointList = {
  categories: '/categories',
  products: '/products',
};

const baseUrl = 'https://mesro-dashboard.000webhostapp.com/api';
const api =
  ({dispatch}: any) =>
  (next: any) =>
  async (action: any) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {apiType, onStart, onSuccess, onError} = action.payload;
    if (onStart) dispatch({type: onStart});

    next(action);

    try {
      //@ts-ignore
      let url = baseUrl + endpointList[apiType];
      let response = await axios.get(url);
      console.log(response.data);
      // Specific
      if (onSuccess)
        dispatch({
          type: onSuccess,
          payload: {data: response.data, apiType: apiType},
        });
    } catch (error) {
      // Specific
      //@ts-ignore
      if (onError) dispatch({type: onError, payload: error.message});
    }
  };

export default api;
