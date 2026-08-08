import { Text, View } from "react-native";

export default function TimerScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-h1 text-foreground">Timer</Text>
      <Text className="text-body-lg text-muted-foreground mt-1">
        Your focus session starts here
      </Text>
    </View>
  );
}
