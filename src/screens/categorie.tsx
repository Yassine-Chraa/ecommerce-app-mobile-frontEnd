import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, SearchBar, Image} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating-widget';
import {Provider, useDispatch, useSelector} from 'react-redux';
import MyColors from '../colors';
import store from '../store';
import {load} from '../store/api';

function CategorieWarraper({route, navigation}: any) {
  const categoriesId = route.params.id;
  return (
    <Provider store={store}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: MyColors.teal,
        }}>
        {/*@ts-ignore*/}
        <SearchBar
          platform="android"
          inputContainerStyle={{
            height: 25,
          }}
          containerStyle={{
            borderRadius: 8,
          }}
        />
      </View>
      <Categorie categoriesId={categoriesId} navigation={navigation} />
    </Provider>
  );
}
function Categorie({categoriesId, navigation}: any) {
  /***** State *****/
  const products = useSelector((state: {products: any}) => state.products);
  const dispatch = useDispatch();

  /***** Get Data When Component Updated *****/
  useEffect(() => {
    dispatch(load('products'));
  }, [dispatch]);
  return (
    <ScrollView
      style={{paddingHorizontal: 10, paddingVertical: 30}}
      showsVerticalScrollIndicator={false}>
      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: 20}}>Video Game</Text>
      </View>
      <View style={{paddingBottom: 40}}>
        {products.map((item: any, ind: number) => {
          return (
            <View
              style={{marginBottom: 15, flexDirection: 'row'}}
              key={item.id}>
              <View style={{flex: 0.4}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Product', {product: item})
                  }>
                  <Image
                    source={require('../images/pexels-lisa-fotios-1006293.jpg')}
                    style={{
                      height: 160,
                      width: 150,
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    }}
                    resizeMode="stretch"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  paddingVertical: 10,
                  flex: 0.6,
                  borderWidth: 0.5,
                  borderColor: MyColors.other,
                }}>
                <Text style={{width: '80%'}}>{item.name}</Text>
                <Text style={{width: '100%', marginTop: 8, fontSize: 13}}>
                  {item.description}
                </Text>
                <StarRating rating={3} onChange={(rating: number) => {}} />
                <Text style={{fontSize: 18, color: MyColors.orange}}>
                  {'$ ' + item.price}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default CategorieWarraper;
