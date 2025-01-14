"use client";

import { Card } from "antd";

interface IProp{
  title: string;
  subtitle: string;
  loading: boolean;
  type: string;
}

export default function StockCard({title, subtitle, loading, type}: IProp) {

  return (
    <Card loading={loading} className="min-w-[100px]">
      <Card.Meta
        title={<div className="text-3xl">{title} <span className="text-xl">{type}</span></div>}
        description={
          <>
            <p>{subtitle}</p>
          </>
        }
      />
    </Card>
  );
}
