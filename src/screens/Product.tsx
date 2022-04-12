import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import MyColors from '../colors';
import Warapper from './warapper';
import {Avatar, Button, Divider, Rating} from 'react-native-elements';

function Product({route}) {
  const product = route.params.product;
  return (
    <Warapper>
      {/***** Product Image *****/}
      <View
        style={{
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.9,
          elevation: 4,
        }}>
        <Image
          source={require('../images/ecommerce-2140603__340.webp')}
          resizeMode="stretch"
          style={{width: '100%', height: 250}}
        />
        <Avatar
          icon={{
            name: 'heart',
            type: 'font-awesome',
            size: 24,
            color: MyColors.orange,
          }}
          size={60}
          containerStyle={{
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: -20,
            right: 20,
          }}
          rounded
        />
      </View>
      <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
        <Text style={{fontSize: 20}}>{product.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            marginTop: 3,
          }}>
          <View>
            <Text style={{fontSize: 14, color: '#555'}}>
              {product.categorie}
            </Text>
          </View>
          <Text style={{fontSize: 18, color: MyColors.orange}}>
            {'$ ' + product.price}
          </Text>
        </View>
        <Divider />
        <View style={{marginTop: 16}}>
          <Text style={{fontSize: 20, marginBottom: 10}}>Description</Text>
          <Text>{product.description}</Text>
        </View>
        <View
          style={{
            marginTop: 32,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            title="SIZE"
            iconPosition="right"
            icon={{name: 'angle-right', type: 'font-awesome'}}
            containerStyle={{
              flex: 0.5,
              marginRight: 10,
              shadowColor: '#000',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.9,
              elevation: 3,
            }}
            buttonStyle={{
              backgroundColor: '#fff',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 12,
            }}
            titleStyle={{color: '#000'}}
          />
          <Button
            title="QUANTITY"
            iconPosition="right"
            icon={{name: 'angle-right', type: 'font-awesome'}}
            containerStyle={{
              flex: 0.5,
              marginRight: 10,
              shadowColor: '#000',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.9,
              elevation: 3,
            }}
            buttonStyle={{
              backgroundColor: '#fff',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 12,
            }}
            titleStyle={{color: '#000'}}
          />
        </View>
        <View style={{marginTop:150}}>
          <Button
            title="Proceed to Checkout"
            buttonStyle={{backgroundColor: MyColors.orange}}
          />
        </View>
      </View>
    </Warapper>
  );
}
const styles = StyleSheet.create({});

export default Product;
