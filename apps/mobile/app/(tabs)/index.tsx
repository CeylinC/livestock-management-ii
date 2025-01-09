import { Button } from '@ant-design/react-native';
import { useUserStore } from '@packages/shared/stores';
import { router } from 'expo-router';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';

export default function HomeScreen() {
    const { logoutMobile } = useUserStore();

    const logout = async () => {
            if (await logoutMobile()) {
              router.replace('(auth)/login' as any);
            }
          }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Button onPress={logout}><Text>Logout</Text></Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    padding: 12,
  },
});
