import StockCard from "@/components/StockCard";

export default function StockCards() {
  return (
    <div className="w-full">
      <h1>Çiftlikteki Stoklarım</h1>
      <div className="w-full flex flex-wrap">
      <StockCard></StockCard>
      <StockCard></StockCard>
      <StockCard></StockCard>
      </div>
    </div>
  );
}
