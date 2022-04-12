import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import store from '../store';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {load} from '../store/api';
import {Avatar, Text, Rating, SearchBar} from 'react-native-elements';
import MyColors from '../colors';
import {Card, Title} from 'react-native-paper';

/***** Added To Solve Redux Issus*****/
function HomeWrapper({navigation}:any) {
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
          ref={search => console.log('ok')}
          platform="android"
          inputContainerStyle={{
            height: 25,
          }}
          containerStyle={{
            borderRadius: 8,
          }}
        />
      </View>
      <Home navigation={navigation} />
    </Provider>
  );
}
function Home({navigation}:any) {
  /***** State *****/
  const products = useSelector((state: {products: any}) => state.products);
  const categories = useSelector(
    (state: {categories: any}) => state.categories,
  );
  const dispatch = useDispatch();

  /***** Get Data When Component Updated *****/
  useEffect(() => {
    dispatch(load('categories'));
    dispatch(load('products'));
  }, [dispatch]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/***** Header *****/}
      <View>
        <Image
          source={require('../images/ecommerce-2140603__340.webp')}
          resizeMode="stretch"
          style={{width: '100%', height: 250}}
        />
      </View>
      {/***** Categories Section *****/}
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {categories.map((item: any) => {
          let colors = [MyColors.red, MyColors.grey, MyColors.yellow];
          return (
            <TouchableOpacity onPress={()=>navigation.navigate('Categorie', {id: item.id})}  key={item.id} >
              <View style={{alignItems: 'center'}}>
              <Avatar
                icon={{
                  name: item.icon,
                  type: 'font-awesome',
                  size: 35,
                  color: '#444',
                }}
                size={60}
                containerStyle={{backgroundColor: colors[item.id - 1]}}
                rounded
              />
              <Text style={{textAlign: 'center', fontSize: 16}}>
                {item.name}
              </Text>
            </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {/***** Products Section *****/}
      <View style={{paddingTop: 20, paddingBottom: 40}}>
        <View
          style={{
            marginLeft: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 12,
          }}>
          <Text style={{marginBottom: 12}}>Recommended Products</Text>
          <TouchableOpacity>
            <Text>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={({item, index}) => {
            return (
              <Card style={{marginLeft: index == 0?12:6, marginRight: index == item.length-1?12:6, width: 150}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Product', {product: item})
                  }>
                  <Card.Cover
                    source={require('../images/pexels-lisa-fotios-1006293.jpg')}
                    style={{
                      height: 150,
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    }}
                    resizeMode="stretch"
                  />

                  <Card.Content
                    style={{paddingLeft: 10, alignItems: 'flex-start',paddingBottom:15}}>
                    <Title
                      style={{fontSize: 14, marginLeft: 0, paddingLeft: 0}}>
                      {item.name}
                    </Title>
                    <Rating imageSize={14} readonly startingValue={4.5} />
                    <View
                      style={{
                        backgroundColor: MyColors.red,
                        paddingHorizontal: 12,
                        paddingVertical: 2,
                        position: 'absolute',
                        top: -140,
                        right: 0,
                        elevation: 3,
                        shadowOffset: {
                          width: 40,
                          height: 40,
                        },
                        shadowOpacity: 0.6,
                        shadowColor: '#000',
                      }}>
                      <Text style={{fontSize: 16}}>{'$ ' + item.price}</Text>
                    </View>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{paddingBottom: 40}}>
        <View
          style={{
            marginLeft: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 12,
          }}>
          <Text style={{marginBottom: 12}}>Newest Products</Text>
          <TouchableOpacity>
            <Text>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={({item, index}) => {
            return (
              <Card style={{marginLeft: 12, width: 150}}>
                <Card.Cover
                  source={require('../images/pexels-lisa-fotios-1006293.jpg')}
                  style={{height: 150, borderRadius: 6}}
                  resizeMode="stretch"
                />
                <Card.Content
                  style={{paddingLeft: 10, alignItems: 'flex-start'}}>
                  <Title style={{fontSize: 14, marginLeft: 0, paddingLeft: 0}}>
                    {item.name}
                  </Title>
                  <Rating imageSize={14} readonly startingValue={4.5} />
                  <View
                    style={{
                      backgroundColor: MyColors.red,
                      paddingHorizontal: 12,
                      paddingVertical: 2,
                      position: 'absolute',
                      top: -140,
                      right: 0,
                      elevation: 3,
                      shadowOffset: {
                        width: 40,
                        height: 40,
                      },
                      shadowOpacity: 0.6,
                      shadowColor: '#000',
                    }}>
                    <Text style={{fontSize: 16}}>{'$ ' + item.price}</Text>
                  </View>
                </Card.Content>
              </Card>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{paddingBottom: 20}}>
        <View
          style={{
            marginLeft: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 12,
          }}>
          <Text style={{marginBottom: 12}}>Popular Products</Text>
          <TouchableOpacity>
            <Text>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={({item, index}) => {
            return (
              <Card style={{marginLeft: 12, width: 150}}>
                <Card.Cover
                  source={require('../images/pexels-lisa-fotios-1006293.jpg')}
                  style={{height: 150, borderRadius: 6}}
                  resizeMode="stretch"
                />
                <Card.Content
                  style={{paddingLeft: 10, alignItems: 'flex-start'}}>
                  <Title style={{fontSize: 14, marginLeft: 0, paddingLeft: 0}}>
                    {item.name}
                  </Title>
                  <Rating imageSize={14} readonly startingValue={4.5} />
                  <View
                    style={{
                      backgroundColor: MyColors.red,
                      paddingHorizontal: 12,
                      paddingVertical: 2,
                      position: 'absolute',
                      top: -140,
                      right: 0,
                      elevation: 3,
                      shadowOffset: {
                        width: 40,
                        height: 40,
                      },
                      shadowOpacity: 0.6,
                      shadowColor: '#000',
                    }}>
                    <Text style={{fontSize: 16}}>{'$ ' + item.price}</Text>
                  </View>
                </Card.Content>
              </Card>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}

export default HomeWrapper;
