import { Card, View, WingBlank } from "@ant-design/react-native";
import { Text } from "react-native";

interface IProp {
    title: string;
    subtitle: string;
    type: string;
}

export default function DrawerForm({
    title,
    subtitle,
    type
}: IProp) {
  return (
    <WingBlank size="lg">
      <Card>
        <Card.Header
          title={title}
          extra={type}
          style={{minWidth: 100}}
        />
        <Card.Body>
          <View style={{ height: 42 }}>
            <Text style={{ marginLeft: 16 }}>{subtitle}</Text>
          </View>
        </Card.Body>
      </Card>
    </WingBlank>
  );
}
