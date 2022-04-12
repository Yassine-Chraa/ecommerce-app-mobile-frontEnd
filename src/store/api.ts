import {apiCallBegan} from './apiActions';
import {createSlice} from '@reduxjs/toolkit';
export const MyStoreSlice = createSlice({
  name: 'myStore',
  initialState: {
    categories: Array(),
    products: Array(),
    cartItems: Array(),
    loading: false,
  },
  reducers: {
    requested: myStore => {
      console.log('Requested');
      myStore.loading = true;
    },

    received: (myStore, action) => {
      const {apiType, data} = action.payload;
      console.log('Received');

      if (apiType == 'products') {
        myStore['products'] = data.map((item: any) => {
          return {...item, orderQuantity: 0};
        });
      } else {
        //@ts-ignore
        myStore[apiType] = data;
      }
      myStore.loading = false;
    },
    requestFailed: myStore => {
      console.log('Failed');
      myStore.loading = false;
    },
    incrementQuantity: (myStore, action) => {
      //@ts-ignore
      myStore.products[action.payload].orderQuantity++;
    },
    decrementQuantity: (myStore, action) => {
      //@ts-ignore
      if (myStore.products[action.payload].quantity > 0) myStore.products[action.payload].orderQuantity--;
    },
  },
});

export default MyStoreSlice.reducer;

const {requested, received, requestFailed} = MyStoreSlice.actions;
export const load = (apiType: string) => (dispatch: any) => {
  return dispatch(
    //@ts-ignore
    apiCallBegan({
      apiType,
      onStart: requested.type,
      onSuccess: received.type,
      onError: requestFailed.type,
    }),
  );
};
export const {incrementQuantity, decrementQuantity} = MyStoreSlice.actions;

//export const {getTrending} = MyStoreSlice.actions;
