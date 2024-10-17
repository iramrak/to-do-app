import { View, Text, TextInput, TouchableOpacityComponent, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, { FadeIn , FadeInDown , FadeInRight , FadeInLeft } from 'react-native-reanimated';
import getDate from '@/constants';
import Wellcom from '@/components/wellcom';
import { LinearGradient } from 'expo-linear-gradient';

export default function index() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editKey, setEditKey] = useState(null);

  const addTask = () =>{
    if(task.trim()){
      if(editKey !== null){
        setTasks(tasks.map(item => (item.key === editKey ? {key:item.key , value:task}:item)))
        setEditKey(null)
      }else{
    setTasks([...tasks,{key:tasks.length.toString(),value:task}])
      }
    setTask('')
    }
  }

  const delTask = (key) => {
    setTasks(tasks.filter(item=>item.key !== key))
  }

  const editTask = (key , value)=>{
    setTask(value)
    setEditKey(key)
  }

  return (
    <View className='flex-1 bg-black'>
    {/*Приветствие*/}
    <Wellcom />

    <Animated.View className='pt-4 mx-5' entering={FadeInRight.delay(250).springify()}>
      <LinearGradient
      colors={['#FF00B8', '#B60083', '#C0008A']}
      className='h-[150px] w-[100%] rounded-lg border-[2px] border-[#222222]'
      >
        <Animated.Text entering={FadeIn.delay(350).springify()} className='font-bold text-xl my-auto text-center text-white'>
          "Запланировал — выполнил. Каждый шаг приближает тебя к цели!"
        </Animated.Text>
      </LinearGradient>
    </Animated.View>

      <Animated.View entering={FadeInLeft.delay(350).springify()} className='mx-5 pt-5 flex-row'>
        <TextInput placeholder='Добавить задачу!' onChangeText={setTask} value={task} className='p-4 w-[83%] rounded-l-md border-[#222222] border-[1px] text-white'/>
        <TouchableOpacity className='p-4 bg-priamary rounded-r-md' onPress={addTask}>
          {editKey !== null ? <Feather name="edit" size={20} color="white" /> : <AntDesign name="plus" size={24} color="white"/>}
        </TouchableOpacity>
      </Animated.View>

       {/*Палоска! -->*/}<View className='h-[1px] w-full bg-[#222222] my-5'></View>

      {/*Список дел*/}
      <View className='mx-5'>
        <Animated.Text entering={FadeInLeft.delay(450).springify()} className='font-bold text-xl text-priamary mb-4'>Ваши задачи</Animated.Text>
      </View>

    <FlatList className='w-full h-full mx-3' showsHorizontalScrollIndicator={false} data={tasks} renderItem={({item})=> (
        <Animated.View entering={FadeInDown.delay(250).springify()} className='flex m-2 justify-between p-3 w-[150px] h-[250px] rounded-lg border-[1px] border-[#222222]'>
          <View key={item.key}>
            <Text className='text-white text-xl'>{item.value}</Text>
            <Text className='text-[#8A8A8A] text-sm'>{getDate()}</Text>
          </View>

            {/*Кнопки*/}
            <View className='flex-row gap-2 items-center'>
              <TouchableOpacity className='flex-1 h-9 items-center justify-center bg-priamary rounded-lg' onPress={() => editTask(item.key,item.value)}>
                <Feather name="edit" size={20} color="white" />
              </TouchableOpacity>
  
              <TouchableOpacity className='flex-1 h-9 items-center justify-center bg-priamary rounded-lg' onPress={() => delTask(item.key)}>
                <MaterialIcons name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>
        </Animated.View>
    )}
    horizontal
    />
      
    </View>
  )
}