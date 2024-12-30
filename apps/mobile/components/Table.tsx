import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, GestureResponderEvent } from 'react-native';

interface IProp<T> {
  handleSelectRow: (item: T) => void;
  data: T[];
  columns: string[];
}

export default function Table<T extends { [key: string]: any }>({ handleSelectRow, data, columns }: IProp<T>) {

  const renderItem = ({ item }: {
    item: T
  }) => {
    return (
      <TouchableOpacity onPress={() => handleSelectRow(item)}>
        <View style={styles.row}>
          {Object.entries(item).map(([key, value], index) => {
            if (key === 'id') return;
            else if (typeof value === "object") {
              return <Text key={index} style={styles.CellText}>{value.format("DD/MM/YYYY")}</Text>
            } else {
              return <Text key={index} style={styles.CellText}>{value}</Text>
            }
          })}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.listContainer}>
          <View style={styles.header}>
            {columns.map((col, index) => <Text style={{ ...styles.headerText, borderRightWidth: index + 1 !== columns.length ? 1 : 0 }} key={index}>{col}</Text>)}
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FAFAFA",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  headerText: {
    flex: 1,
    width: 100,
    paddingHorizontal: 10,
    borderRightColor: "#F0F0F0",
    fontWeight: "bold"
  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginVertical: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingHorizontal: 3,
  },
  CellText: {
    flex: 1,
    width: 100,
    paddingHorizontal: 10
  },
});

