import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "./Item";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  Typography,
} from "@mui/material";
import { ClientApi } from "../lib/client";
import { TItem } from "../redux/reducers/cart";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import MarkerInfoWindow from "./maps/Marker";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useQuery } from "@tanstack/react-query";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ShoppingList = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = useState("all");
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<TItem>();

  const { isLoading, data: items , refetch} = useQuery({
    queryKey: ["bikes"],
    queryFn: () =>
      ClientApi.bikes(i18n.resolvedLanguage)
        .get()
        .then((res) => {
          return res?.data as TItem[];
        }),
  });


  useEffect(() => {
    setSelected(undefined);
    refetch()
  }, [i18n.resolvedLanguage]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const TabsValue = ["all", "newArrival", "bestSeller", "topRated"];

  return (
    <Box>
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
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ overflow: "scroll" }}>
          <Box
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
            sx={{ height: "70vh", overflow: "scroll" }}
          >
            {items?.flatMap((item) =>
              value === "all" || value === item.attributes.category ? (
                <div onClick={() => setSelected(item)}>
                  <Item
                    selected={selected?.id === item?.id}
                    item={item}
                    key={`${item?.attributes?.name}-${item.id}`}
                  />
                </div>
              ) : (
                []
              )
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            borderLeft: "1px dotted",
            overflow: "scroll",
            height: "81.5vh",
          }}
        >
          <Box height={390} width="100%">
            <MarkerInfoWindow items={items} curr={selected?.id} />
          </Box>
          <Box width="100%">
            {selected && (
              <Card>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={selected?.attributes?.name}
                  subheader={selected?.attributes?.createdAt}
                />
                <CardMedia
                  component="img"
                  height="100"
                  image={`http://localhost:1337${selected?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                  alt="img"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {selected?.attributes?.briefDescription}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      {selected?.attributes?.description}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingList;
