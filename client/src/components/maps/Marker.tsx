import { FC, useState } from "react";
import GoogleMap from "./GoogleMap";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { TItem } from "../../redux/reducers/cart";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Marker component
const Marker: FC<TItem & { lng: any; lat: any; active: boolean }> = ({
  attributes,
  active,
}) => {
  const url = attributes?.image?.data?.attributes?.formats?.medium?.url;
  return (
    <>
      <DirectionsBikeIcon
        color={active ? "success" : "inherit"}
      />
      {active && (
        <Card
          sx={{
            position: "relative",
            bottom: 100,
            width: 50,
            backgroundColor: "white",
            boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
            zIndex: 100,
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="50"
            image={`http://localhost:1337${url}`}
          />
         {attributes?.name}
        </Card>
      )}
    </>
  );
};

const MarkerInfoWindow: FC<{ items?: TItem[]; curr?: number }> = ({
  items,
  curr,
}) => {
  return (
    <>
      {items && (
        <GoogleMap defaultCenter={items[0]?.attributes?.location?.coordinates}>
          {items.map((mk) => {
            const lat = mk?.attributes?.location?.coordinates?.lat;
            const lng = mk?.attributes?.location?.coordinates?.lng;
            if (lat && lng)
              return (
                <Marker
                  key={mk?.id}
                  lat={lat}
                  lng={lng}
                  {...mk}
                  active={curr == mk?.id}
                />
              );
          })}
        </GoogleMap>
      )}
    </>
  );
};

export default MarkerInfoWindow;
