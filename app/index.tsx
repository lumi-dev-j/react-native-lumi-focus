import { ScrollView, Text, View } from "react-native";

const primarySwatches = [
  { name: "Lavender", className: "bg-primary-lavender" },
  { name: "Peach", className: "bg-primary-peach" },
  { name: "Sage", className: "bg-primary-sage" },
  { name: "Gold", className: "bg-primary-gold" },
];

const semanticSwatches = [
  { name: "Success", className: "bg-success" },
  { name: "Warning", className: "bg-warning" },
  { name: "Streak", className: "bg-streak" },
  { name: "Error", className: "bg-error" },
  { name: "Info", className: "bg-info" },
];

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <View className="items-center gap-2">
      <View className={`h-14 w-14 rounded-2xl ${className}`} />
      <Text className="text-caption text-muted-foreground">{name}</Text>
    </View>
  );
}

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="gap-8 px-6 py-16">
        <View className="gap-1">
          <Text className="text-h1 text-foreground">Lumi Focus</Text>
          <Text className="text-body-lg text-muted-foreground">
            Cozy Companion
          </Text>
        </View>

        <View className="gap-3">
          <Text className="text-h3 text-foreground">Primary</Text>
          <View className="flex-row gap-4">
            {primarySwatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-h3 text-foreground">Semantic</Text>
          <View className="flex-row gap-4">
            {semanticSwatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </View>
        </View>

        <View className="gap-3 rounded-2xl border border-border bg-surface p-4">
          <Text className="text-h2 text-foreground">H2 Section Title</Text>
          <Text className="text-h4 text-foreground">H4 Subheading</Text>
          <Text className="text-body-lg text-foreground">
            Body Large — important content
          </Text>
          <Text className="text-body-md text-muted-foreground">
            Body Medium — body text
          </Text>
          <Text className="text-body-sm text-muted-foreground">
            Body Small — supporting text
          </Text>
          <Text className="text-caption text-muted-foreground">
            CAPTION — LABELS, META TEXT
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
