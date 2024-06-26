import { Button } from "@/components/Button";
import {  Alert, Text, View } from "react-native";


export function Test(){
    return (
        <View className="flex-1 justify-center items-center bg-black">
            <Text className="text-dark-green">Test</Text>
            <Button
                label="Button"
                onPress={() => Alert.alert("dale")}
            />
        </View>
    )
}