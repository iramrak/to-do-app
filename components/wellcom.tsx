import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeIn , FadeInDown , FadeInRight , FadeInLeft } from 'react-native-reanimated';
import getDate from '@/constants';

export default function Wellcom() {
  return (
    <View className='mt-[67px] mx-5'>
        <Animated.Text entering={FadeInLeft.delay(150).springify()} className='font-bold text-3xl text-priamary tracking-[2.2%]'>Привет,Мариям!</Animated.Text>
        <Animated.Text entering={FadeInLeft.delay(250).springify()} className='text-[#8A8A8A] text-lg'>Сегодня: {getDate()}</Animated.Text>
  </View>
  )
}