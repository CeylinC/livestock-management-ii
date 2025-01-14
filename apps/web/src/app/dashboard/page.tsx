"use client";

import StockCard from "@/components/StockCard";
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

export default function Dashboard() {
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

  const [loading, setLoading] = useState(true);
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
        isAnimalLoading && setLoading(false);
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
        isBarnLoading && setLoading(false);
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

        isSaleLoading && setLoading(false);
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

        isSaleLoading && setLoading(false);
      }
    };

    getAnimals();
    getBarns();
    getSales();
    getStocks();
  }, [user?.id]);

  return (
    <div className="w-full h-screen flex items-start flex-col gap-2">
      <div className="text-xl mb-4">
        Hoşgeldin <span className="font-bold">{user?.fullName}</span>!
      </div>
      <h1 className="text-lg text-blue-500">Hayvanlar</h1>
      <div className="flex flex-row gap-4 mb-4">
        <StockCard
          title={totalAnimal.toString()}
          subtitle="Hayvan"
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={animals.female.toString()}
          subtitle="Dişi"
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={animals.male.toString()}
          subtitle="Erkek"
          loading={loading}
          type="Adet"
        />
      </div>
      <h1 className="text-lg text-blue-500">Ağıllar</h1>
      <div className="flex flex-row gap-4 mb-4">
        <StockCard
          title={totalBarn.toString()}
          subtitle="Ağıl"
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={barns.female.toString()}
          subtitle="Dişi"
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={barns.male.toString()}
          subtitle="Erkek"
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={barns.karma.toString()}
          subtitle="Karma"
          loading={loading}
          type="Adet"
        />
      </div>
      <h1 className="text-lg text-blue-500">Stoklar</h1>
      <div className="flex flex-row gap-4 mb-4">
        <StockCard
          title={totalStock.toString()}
          subtitle="Stok"
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={stocks.agriculture.toString()}
          subtitle={toReadableSalesCategories[saleCategory.agriculture]}
          loading={loading}
          type="KG"
        />
        <StockCard
          title={stocks.animal.toString()}
          subtitle={toReadableSalesCategories[saleCategory.animal]}
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={stocks.animalProduct.toString()}
          subtitle={toReadableSalesCategories[saleCategory.animalProduct]}
          loading={loading}
          type="KG"
        />
        <StockCard
          title={stocks.equipment.toString()}
          subtitle={toReadableSalesCategories[saleCategory.equipment]}
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={stocks.feed.toString()}
          subtitle={toReadableSalesCategories[saleCategory.feed]}
          loading={loading}
          type="KG"
        />
        <StockCard
          title={stocks.fertilizer.toString()}
          subtitle={toReadableSalesCategories[saleCategory.fertilizer]}
          loading={loading}
          type="KG"
        />
        <StockCard
          title={stocks.medicine.toString()}
          subtitle={toReadableSalesCategories[saleCategory.medicine]}
          loading={loading}
          type="KG"
        />
      </div>
      <h1 className="text-lg text-blue-500">Satışlar</h1>
      <div className="flex flex-row gap-4 mb-4">
        <StockCard
          title={totalSale.toString()}
          subtitle="Satış"
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={sales.agriculture.toString()}
          subtitle={toReadableSalesCategories[saleCategory.agriculture]}
          loading={loading}
          type="KG"
        />
        <StockCard
          title={sales.animal.toString()}
          subtitle={toReadableSalesCategories[saleCategory.animal]}
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={sales.animalProduct.toString()}
          subtitle={toReadableSalesCategories[saleCategory.animalProduct]}
          loading={loading}
          type="KG"
        />
        <StockCard
          title={sales.equipment.toString()}
          subtitle={toReadableSalesCategories[saleCategory.equipment]}
          loading={loading}
          type="Adet"
        />
        <StockCard
          title={sales.feed.toString()}
          subtitle={toReadableSalesCategories[saleCategory.feed]}
          loading={loading}
          type="KG"
        />
        <StockCard
          title={sales.fertilizer.toString()}
          subtitle={toReadableSalesCategories[saleCategory.fertilizer]}
          loading={loading}
          type="KG"
        />
        <StockCard
          title={sales.medicine.toString()}
          subtitle={toReadableSalesCategories[saleCategory.medicine]}
          loading={loading}
          type="KG"
        />
      </div>
    </div>
  );
}
