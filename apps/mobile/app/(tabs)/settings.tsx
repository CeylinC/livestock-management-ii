import { Button, Input, List } from "@ant-design/react-native";
import { useUserStore } from "@packages/shared/stores";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { mobileAuth } from "../_layout";
import { useState } from "react";

export default function HomeScreen() {
  const { logout, user, saveUser } = useUserStore();
  const [fullName, setFullName] = useState<string>(user?.fullName ?? "");

  const _logout = async () => {
    if (await logout(mobileAuth)) {
      router.replace("(auth)/login" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <List renderHeader="Kullanıcı Adı">
          <List.Item>
            <Input
              defaultValue={fullName}
              onChangeText={(event) => setFullName(event)}
            />
          </List.Item>
          <List.Item>
            <Button
              type="primary"
              onPress={() => {
                if (user && fullName) {
                  saveUser({ ...user, fullName: fullName });
                }
              }}
            >
              Kaydet
            </Button>
          </List.Item>
        </List>
        <Button onPress={_logout}>
          <Text>Logout</Text>
        </Button>
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
