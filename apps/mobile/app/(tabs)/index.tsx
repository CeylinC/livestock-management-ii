import { styles } from "@/assets/style/tabs";
import Card from "@/components/Card";
import { gender, saleCategory } from "@packages/shared/enums";
import {
  useAnimalStore,
  useBarnStore,
  useSaleStore,
  useStockStore,
  useUserStore,
} from "@packages/shared/stores";
import { toReadableSalesCategories } from "@packages/shared/utils";
import { useEffect, useState } from "react";
import { Text, SafeAreaView, ScrollView } from "react-native";

export default function HomeScreen() {
  const { user } = useUserStore();
  const {
    totalCount: totalAnimal,
    getTotalCount: getAnimalTotalCount,
    getCategorizedDataCount: getAnimalCategorizedDataCount,
  } = useAnimalStore();
  const {
    totalCount: totalBarn,
    getTotalCount: getBarnTotalCount,
    getCategorizedDataCount: getBarnCategorizedDataCount,
  } = useBarnStore();
  const {
    totalCount: totalSale,
    getTotalCount: getSaleTotalCount,
    getCategorizedDataCount: getSaleCategorizedDataCount,
  } = useSaleStore();
  const {
    totalCount: totalStock,
    getTotalCount: getStockTotalCount,
    getCategorizedDataCount: getStockCategorizedDataCount,
  } = useStockStore();

  const [animals, setAnimals] = useState({ female: 0, male: 0 });
  const [barns, setBarns] = useState({ female: 0, male: 0, karma: 0 });
  const [stocks, setStocks] = useState({
    agriculture: 0,
    animal: 0,
    animalProduct: 0,
    equipment: 0,
    feed: 0,
    fertilizer: 0,
    medicine: 0,
  });
  const [sales, setSales] = useState({
    agriculture: 0,
    animal: 0,
    animalProduct: 0,
    equipment: 0,
    feed: 0,
    fertilizer: 0,
    medicine: 0,
  });

  useEffect(() => {
    const getAnimals = async () => {
      if (user) {
        const isAnimalLoading = await getAnimalTotalCount(user?.id);
        const femaleData = await getAnimalCategorizedDataCount(
          user?.id,
          gender.female
        );
        femaleData && setAnimals((prev) => ({ ...prev, female: femaleData }));
        const maleData = await getAnimalCategorizedDataCount(
          user?.id,
          gender.male
        );
        maleData && setAnimals((prev) => ({ ...prev, male: maleData }));
      }
    };
    const getBarns = async () => {
      if (user) {
        const isBarnLoading = await getBarnTotalCount(user?.id);
        const femaleData = await getBarnCategorizedDataCount(
          user?.id,
          gender.female
        );
        femaleData && setBarns((prev) => ({ ...prev, female: femaleData }));
        const maleData = await getBarnCategorizedDataCount(
          user?.id,
          gender.male
        );
        maleData && setAnimals((prev) => ({ ...prev, male: maleData }));
        const karmaData = await getBarnCategorizedDataCount(
          user?.id,
          gender.karma
        );
        karmaData && setAnimals((prev) => ({ ...prev, karma: karmaData }));
      }
    };
    const getSales = async () => {
      if (user) {
        const isSaleLoading = await getSaleTotalCount(user?.id);

        const agricultureData = await getSaleCategorizedDataCount(
          user?.id,
          saleCategory.agriculture
        );
        agricultureData &&
          setSales((prev) => ({ ...prev, agriculture: agricultureData }));

        const animalData = await getSaleCategorizedDataCount(
          user?.id,
          saleCategory.animal
        );
        animalData && setSales((prev) => ({ ...prev, animal: animalData }));

        const animalProduct = await getSaleCategorizedDataCount(
          user?.id,
          saleCategory.animalProduct
        );
        animalProduct &&
          setSales((prev) => ({ ...prev, animalProduct: animalProduct }));

        const equipmentData = await getSaleCategorizedDataCount(
          user?.id,
          saleCategory.equipment
        );
        equipmentData &&
          setSales((prev) => ({ ...prev, equipment: equipmentData }));

        const feedData = await getSaleCategorizedDataCount(
          user?.id,
          saleCategory.feed
        );
        feedData && setSales((prev) => ({ ...prev, feed: feedData }));

        const fertilizerData = await getSaleCategorizedDataCount(
          user?.id,
          saleCategory.fertilizer
        );
        fertilizerData &&
          setSales((prev) => ({ ...prev, fertilizer: fertilizerData }));

        const medicineData = await getSaleCategorizedDataCount(
          user?.id,
          saleCategory.medicine
        );
        medicineData &&
          setSales((prev) => ({ ...prev, fertilizer: medicineData }));
      }
    };
    const getStocks = async () => {
      if (user) {
        const isSaleLoading = await getStockTotalCount(user?.id);

        const agricultureData = await getStockCategorizedDataCount(
          user?.id,
          saleCategory.agriculture
        );
        agricultureData &&
          setStocks((prev) => ({ ...prev, agriculture: agricultureData }));

        const animalData = await getStockCategorizedDataCount(
          user?.id,
          saleCategory.animal
        );
        animalData && setStocks((prev) => ({ ...prev, animal: animalData }));

        const animalProduct = await getStockCategorizedDataCount(
          user?.id,
          saleCategory.animalProduct
        );
        animalProduct &&
          setStocks((prev) => ({ ...prev, animalProduct: animalProduct }));

        const equipmentData = await getStockCategorizedDataCount(
          user?.id,
          saleCategory.equipment
        );
        equipmentData &&
          setStocks((prev) => ({ ...prev, equipment: equipmentData }));

        const feedData = await getStockCategorizedDataCount(
          user?.id,
          saleCategory.feed
        );
        feedData && setStocks((prev) => ({ ...prev, feed: feedData }));

        const fertilizerData = await getStockCategorizedDataCount(
          user?.id,
          saleCategory.fertilizer
        );
        fertilizerData &&
          setStocks((prev) => ({ ...prev, fertilizer: fertilizerData }));

        const medicineData = await getStockCategorizedDataCount(
          user?.id,
          saleCategory.medicine
        );
        medicineData &&
          setStocks((prev) => ({ ...prev, fertilizer: medicineData }));
      }
    };

    getAnimals();
    getBarns();
    getSales();
    getStocks();
  }, [user?.id]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={{ ...styles.title, marginBottom: 16 }}>
          Merhaba {user?.fullName}
        </Text>
        <Text style={{ ...styles.title, marginBottom: 12 }}>Hayvanlar</Text>
        <ScrollView
          horizontal
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#D8D9DA",
            padding: 4,
          }}
        >
          <Card title={totalAnimal.toString()} subtitle="Hayvan" type="Adet" />
          <Card title={animals.female.toString()} subtitle="Dişi" type="Adet" />
          <Card title={animals.male.toString()} subtitle="Erkek" type="Adet" />
        </ScrollView>
        <Text style={{ ...styles.title, marginVertical: 12 }}>Ağıllar</Text>
        <ScrollView
          horizontal
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#D8D9DA",
            padding: 4,
          }}
        >
          <Card title={totalBarn.toString()} subtitle="Ağıl" type="Adet" />
          <Card title={barns.female.toString()} subtitle="Dişi" type="Adet" />
          <Card title={barns.male.toString()} subtitle="Erkek" type="Adet" />
          <Card title={barns.karma.toString()} subtitle="Karma" type="Adet" />
        </ScrollView>
        <Text style={{ ...styles.title, marginVertical: 12 }}>Stoklar</Text>
        <ScrollView
          horizontal
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#D8D9DA",
            padding: 4,
          }}
        >
          <Card title={totalStock.toString()} subtitle="Stok" type="Adet" />
          <Card
            title={stocks.agriculture.toString()}
            subtitle={toReadableSalesCategories[saleCategory.agriculture]}
            type="KG"
          />
          <Card
            title={stocks.animal.toString()}
            subtitle={toReadableSalesCategories[saleCategory.animal]}
            type="Adet"
          />
          <Card
            title={stocks.animalProduct.toString()}
            subtitle={toReadableSalesCategories[saleCategory.animalProduct]}
            type="KG"
          />
          <Card
            title={stocks.equipment.toString()}
            subtitle={toReadableSalesCategories[saleCategory.equipment]}
            type="Adet"
          />
          <Card
            title={stocks.feed.toString()}
            subtitle={toReadableSalesCategories[saleCategory.feed]}
            type="KG"
          />
          <Card
            title={stocks.fertilizer.toString()}
            subtitle={toReadableSalesCategories[saleCategory.fertilizer]}
            type="KG"
          />
          <Card
            title={stocks.medicine.toString()}
            subtitle={toReadableSalesCategories[saleCategory.medicine]}
            type="KG"
          />
        </ScrollView>
        <Text style={{ ...styles.title, marginVertical: 12 }}>Satışlar</Text>
        <ScrollView
          horizontal
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#D8D9DA",
            padding: 4,
          }}
        >
          <Card title={totalSale.toString()} subtitle="Satış" type="Adet" />
          <Card
            title={sales.agriculture.toString()}
            subtitle={toReadableSalesCategories[saleCategory.agriculture]}
            type="KG"
          />
          <Card
            title={sales.animal.toString()}
            subtitle={toReadableSalesCategories[saleCategory.animal]}
            type="Adet"
          />
          <Card
            title={sales.animalProduct.toString()}
            subtitle={toReadableSalesCategories[saleCategory.animalProduct]}
            type="KG"
          />
          <Card
            title={sales.equipment.toString()}
            subtitle={toReadableSalesCategories[saleCategory.equipment]}
            type="Adet"
          />
          <Card
            title={sales.feed.toString()}
            subtitle={toReadableSalesCategories[saleCategory.feed]}
            type="KG"
          />
          <Card
            title={sales.fertilizer.toString()}
            subtitle={toReadableSalesCategories[saleCategory.fertilizer]}
            type="KG"
          />
          <Card
            title={sales.medicine.toString()}
            subtitle={toReadableSalesCategories[saleCategory.medicine]}
            type="KG"
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
