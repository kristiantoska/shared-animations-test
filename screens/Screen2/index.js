import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { SharedElement } from "react-navigation-shared-element";

const SHARED_KEY = "thisKey";

const Stack = createSharedElementStackNavigator();

const Screen2 = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        presentation: "card",
        animationEnabled: true,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={() => {
          return [SHARED_KEY];
        }}
      />
    </Stack.Navigator>
  );
};

const Container = ({ ...p }) => (
  <View
    {...p}
    style={[
      p.style,
      { flex: 1, alignItems: "center", justifyContent: "center" },
    ]}
  />
);

const RedBox = ({ style, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ height: 30, width: 30, backgroundColor: "red" }, style]}
      activeOpacity={1}>
      <Text>Here</Text>
    </TouchableOpacity>
  );
};

const ListScreen = ({ navigation }) => {
  return (
    <Container key="a" style={{ backgroundColor: "blue" }}>
      <SharedElement id={SHARED_KEY}>
        <RedBox
          style={{ transform: [{ rotate: "0deg" }] }}
          onPress={() => navigation.push("Detail")}
        />
      </SharedElement>
    </Container>
  );
};

const DetailScreen = ({ navigation }) => {
  return (
    <Container key="b" style={{ backgroundColor: "white" }}>
      <SharedElement id={SHARED_KEY}>
        <RedBox
          style={{
            transform: [{ translateY: -100 }, { scale: 4 }],
          }}
          onPress={() => navigation.goBack()}
        />
      </SharedElement>
    </Container>
  );
};

export default Screen2;
