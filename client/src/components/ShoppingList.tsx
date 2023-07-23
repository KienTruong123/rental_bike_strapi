import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "./Item";
import { Grid, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { ClientApi } from "../lib/client";
import { TItem } from "../redux/reducers/cart";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import MarkerInfoWindow from "./maps/Marker";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const { t } = useTranslation();
  //   const auth = useSelector((state: RootState) => state.auth);
  //   const items = useSelector((state: RootState) => state.cart.items);
  const [items, setItems] = useState<TItem[]>([]);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const getItems = async () => {
    const res = await ClientApi.bikes().get();
    const data = get(res, "data");
    if (data) setItems(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  const TabsValue = ["all", "newArrival", "bestSeller", "topRated"];

  return (
    <Box >
      <Typography variant="h3" textAlign="center">
        {t("homeIntro")}
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        centered
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        {TabsValue.map((value, index) => {
          return <Tab label={t(value)} value={value} key={index} />;
        })}
      </Tabs>
      <Grid container spacing={2} >
        <Grid item xs={6} sx={{ overflow: 'scroll'}}>
          <Box
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
            sx={{ height: '81vh', overflow: 'scroll'}}
          >
            {value === "all"
              ? items.map((item) => (
                  <Item
                    item={item}
                    key={`${item?.attributes?.name}-${item.id}`}
                  />
                ))
              : items.flatMap((item) =>
                  value === item.attributes.category ? (
                    <Item
                      item={item}
                      key={`${item?.attributes?.name}-${item.id}`}
                    />
                  ) : (
                    []
                  )
                )}
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: "#000" }}>
          <div style={{ height: 400, width: "100%" }}>
            <MarkerInfoWindow  items={items}/>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingList;
