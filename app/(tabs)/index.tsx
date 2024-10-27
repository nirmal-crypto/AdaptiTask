import {
  StyleSheet,
  useColorScheme,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button } from "@rneui/base";
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
} from "react-native-calendars";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";

export default function HomeScreen() {
  const [selected, setSelected] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [items, setItem] = useState<AgendaSchedule>({});
  const colorTheme = useColorScheme() || "light";
  var backgroundColor;
  useEffect(() => {
    backgroundColor = colorTheme === "light" ? "#fff" : "#151718";
  }, [colorTheme]);

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  const loadItems = (day: DateData) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItem(newItems);
    }, 1000);
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <TouchableOpacity
        testID={"item"}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  function timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  return (
    <SafeAreaView style={{backgroundColor:"#2289dc" , flex: 1, paddingTop: StatusBar.currentHeight }}>
      <Button
        title={"Today"}
        onPress={() => {
          setSelected(new Date().toISOString().split("T")[0]);
        }}
      />
      <Agenda
        items={items}
        testID={"agenda"}
        chooseDay={selected}
        onDayChange={(day: any) => {
          setSelected(day.dateString);
        }}
        loadItemsForMonth={loadItems}
        selected={selected}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        onDayPress={(day: any) => {
          setSelected(day.dateString);
          // console.log("selected day", day);
        }}

        // showClosingKnob={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
