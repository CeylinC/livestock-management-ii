import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
});