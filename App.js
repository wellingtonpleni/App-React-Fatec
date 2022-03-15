import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator} from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'

import InicioScreen from './src/screens/Inicio'
import ConfiguracoesScreen from './src/screens/Configuracoes'
import FotoScreen from './src/screens/Foto'

const Drawer = createDrawerNavigator()

export default function App(){
  const [iconePadrao, setIconePadrao] = useState('md')

  useEffect(()=> {
    switch(Platform.OS){
      case 'ios':
        setIconePadrao('ios')
        break
      case 'android':
        setIconePadrao('md')  
        break
    }
  },[])

  return(
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Início'
        screenOptions={{
          drawerStyle: {backgroundColor: '#FFF', width: 280}
        }}>
          <Drawer.Screen name='Início'
          component={InicioScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <Ionicons name={`${iconePadrao}-home`}
              size={32}
              color={focused ? '#7CC' : '#CCC'} />)
          }}
          />

          <Drawer.Screen name='Configurações'
          component={ConfiguracoesScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <Ionicons name={`${iconePadrao}-cog`}
              size={32}
              color={focused ? '#7CC' : '#CCC'} />)
          }}
          />

          <Drawer.Screen name='Foto'
          component={FotoScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <Ionicons name={`${iconePadrao}-camera`}
              size={32}
              color={focused ? '#7CC' : '#CCC'} />)
          }}
          />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}