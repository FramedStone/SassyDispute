"use client";
import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Image, Row, Col, Select, message, Skeleton } from "antd";

const { Meta } = Card;

const cardData = [
  {
    title: "Card Title 1",
    description: "This is the description for card 1.",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    category: "Category 1",
  },
  {
    title: "Card Title 2",
    description: "This is the description for card 2.",
    image: "https://gw.alipayobjects.com/zos/rmsportal/QBnOOoLaAfKPirc.png",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    category: "Category 2",
  },
  {
    title: "Card Title 3",
    description: "This is the description for card 3.",
    image: "https://gw.alipayobjects.com/zos/rmsportal/QBnOOoLaAfKPirc.png",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    category: "Category 1",
  },
  {
    title: "Card Title 4",
    description: "This is the description for card 4.",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
    category: "Category 2",
  },
  {
    title: "Card Title 5",
    description: "This is the description for card 5.",
    image: "https://gw.alipayobjects.com/zos/rmsportal/QBnOOoLaAfKPirc.png",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    category: "Category 1",
  },
  {
    title: "Card Title 6",
    description: "This is the description for card 6.",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
    category: "Category 2",
  },
];

const ProductPage = () => {
  const [filteredData, setFilteredData] = useState(cardData);
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = (value: string) => {
    if (value === "All") {
      setFilteredData(cardData);
    } else {
      const newData = cardData.filter((card) => card.category === value);
      setFilteredData(newData.length > 0 ? newData : cardData);
    }
    message.info(`Filtered by ${value}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-5">
      <div
        className="flex justify-between items-center"
        style={{ marginBottom: 20 }}
      >
        <div className="text-xl">Products</div>
        <Select
          showSearch
          placeholder="Select a category"
          optionFilterProp="label"
          onChange={handleCategoryChange}
          onSearch={(value) => console.log("search:", value)}
          options={[
            { value: "All", label: "All" },
            { value: "Category 1", label: "Category 1" },
            { value: "Category 2", label: "Category 2" },
          ]}
          style={{ width: 200 }}
        />
      </div>
      <Row gutter={[16, 16]}>
        {filteredData.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                loading ? (
                  <Skeleton.Image
                    style={{ height: "150px", borderRadius: "8px 8px 0 0" }}
                  />
                ) : (
                  <Image
                    alt={card.title}
                    src={card.image}
                    style={{
                      objectFit: "cover",
                      height: "150px",
                      borderRadius: "8px 8px 0 0",
                    }}
                    preview={false}
                  />
                )
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              {loading ? (
                <Skeleton active paragraph={{ rows: 2 }} />
              ) : (
                <Meta
                  avatar={<Avatar src={card.avatar} />}
                  title={card.title}
                  description={card.description}
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductPage;
