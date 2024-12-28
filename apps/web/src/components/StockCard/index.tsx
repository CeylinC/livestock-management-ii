"use client";

import React, { useEffect, useState } from "react";
import { Card } from "antd";

export default function StockCard() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <Card loading={loading} className="m-1 w-72">
      <Card.Meta
        title="Card title"
        description={
          <>
            <p>This is the description</p>
          </>
        }
      />
    </Card>
  );
}
