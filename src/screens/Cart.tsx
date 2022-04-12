import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Image} from 'react-native-elements';
import {Provider, useDispatch, useSelector} from 'react-redux';
import MyColors from '../colors';
import store from '../store';
import {incrementQuantity, decrementQuantity, load} from '../store/api';

function CartWarraper() {
  return (
    <Provider store={store}>
      <Cart />
    </Provider>
  );
}
function Cart() {
  const cartItems = useSelector((state: { products: any; }) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load('products'));
  }, [dispatch]);

  const total = cartItems
    .map((item: any) => item.orderQuantity * item.price)
    .reduce((prv: number, curr: number) => prv + curr);

  return (
    <View style={{ paddingHorizontal: 12, paddingVertical: 20, height: '100%' }}>
      <FlatList
        data={cartItems}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                backgroundColor: '#fff',
                borderRadius: 4,
                elevation: 3,
                shadowOffset: {
                  width: 40,
                  height: 40,
                },
                shadowOpacity: 0.6,
                shadowColor: '#000',
              }}>
              <Image
                source={require('../images/pexels-lisa-fotios-1006293.jpg')}
                style={{ height: 120, width: 130, borderRadius: 6 }}
                resizeMode="stretch" />
              <View style={{ paddingLeft: 8, paddingVertical: 8 }}>
                <Text style={{ fontSize: 18, color: '#000', width: '80%' }}>
                  {item.name}
                </Text>
                <Text>{' Blanc | 128Go | 4Go '}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 12,
                  }}>
                  <Avatar
                    icon={{ name: 'minus', type: 'font-awesome', size: 14 }}
                    size={30}
                    containerStyle={{ backgroundColor: MyColors.orange }}
                    rounded
                    onPress={() => dispatch(decrementQuantity(index))} />
                  <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: 30,
                      color: MyColors.orange,
                    }}>
                    {item.orderQuantity}
                  </Text>
                  <Avatar
                    icon={{ name: 'plus', type: 'font-awesome', size: 14 }}
                    size={30}
                    containerStyle={{ backgroundColor: MyColors.orange }}
                    rounded
                    onPress={() => dispatch(incrementQuantity(index))} />
                  <Text
                    style={{
                      marginLeft: 30,
                      fontSize: 16,
                      color: MyColors.orange,
                    }}>
                    {'$ ' + item.price}
                  </Text>
                </View>
              </View>
            </View>
          );
        } }
        showsVerticalScrollIndicator={false} />
      <Button
        title="Proceed to Checkout"
        buttonStyle={{ backgroundColor: MyColors.orange }}
        containerStyle={{ bottom: 0 }} />
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: 20,
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 18, color: '#000' }}>Total Price :</Text>
        <Text style={{ fontSize: 18, color: MyColors.orange }}>{'$ ' + total}</Text>
      </View>
    </View>
  );
}

export default CartWarraper;
