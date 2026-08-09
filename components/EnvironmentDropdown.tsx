import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { softShadow } from "@/constants/shadows";
import { colors } from "@/constants/theme";
import { EnvironmentTheme } from "@/types/theme";

type EnvironmentDropdownProps = {
  themes: EnvironmentTheme[];
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
};

// Top-center trigger + menu for switching the timer's background/illustration
// theme. Data-driven off `themes`, so adding an environment to data/themes.ts
// is all a new option needs.
export function EnvironmentDropdown({ themes, selectedThemeId, onSelectTheme }: EnvironmentDropdownProps) {
  const [open, setOpen] = useState(false);
  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId) ?? themes[0];

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={softShadow}
        className="flex-row items-center gap-2 px-4 h-11 rounded-full bg-timer-glass"
      >
        <Text className="text-h4 text-timer-ink">{selectedTheme.name}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.timer.ink} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1" onPress={() => setOpen(false)}>
          <View className="items-center pt-24">
            <View style={softShadow} className="w-52 rounded-3xl bg-timer-surface p-2">
              {themes.map((theme) => {
                const isSelected = theme.id === selectedTheme.id;
                return (
                  <Pressable
                    key={theme.id}
                    onPress={() => {
                      onSelectTheme(theme.id);
                      setOpen(false);
                    }}
                    className={`flex-row items-center justify-between px-4 py-3 rounded-2xl ${
                      isSelected ? "bg-timer-surface-selected" : ""
                    }`}
                  >
                    <Text
                      className="text-h4"
                      style={{ color: isSelected ? colors.timer.purple : colors.timer.ink }}
                    >
                      {theme.name}
                    </Text>
                    {isSelected && <Ionicons name="checkmark" size={16} color={colors.timer.purple} />}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
