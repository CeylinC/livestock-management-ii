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
import { styles } from "@/assets/style/tabs";

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
      <Text style={styles.title}>Ayarlar</Text>
      <ScrollView>
        <List renderHeader="Kullanıcı Adı">
          <List.Item
            extra={
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
            }
          >
            <Input
              defaultValue={fullName}
              onChangeText={(event) => setFullName(event)}
            />
          </List.Item>
        </List>
        <Button onPress={_logout} type="warning">
          <Text>Çıkış Yap</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
