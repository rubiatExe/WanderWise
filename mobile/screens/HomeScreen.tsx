import { View, Text } from 'react-native';
import React from 'react';

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold text-blue-600">WanderWise</Text>
            <Text className="text-gray-500 mt-2">Welcome to your new React Native app!</Text>
        </View>
    );
}
