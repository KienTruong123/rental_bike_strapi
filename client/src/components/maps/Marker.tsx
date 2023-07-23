import { FC, useState } from "react";
import GoogleMap from "./GoogleMap";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { TItem } from "../../redux/reducers/cart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Marker component
const Marker: FC<TItem & { lng: any; lat: any }> = ({ attributes }) => {
  const [show, setShow] = useState(false);
  const url = attributes?.image?.data?.attributes?.formats?.medium?.url;
  return (
    <div
      onClick={() => {
        setShow(!show);
      }}
    >
      <DirectionsBikeIcon />
      {show && (
        <Card
          sx={{
            position: "relative",
            bottom: 150,
            width: 100,
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
          <Typography variant="caption" >{attributes?.name}</Typography>
        </Card>
      )}
    </div>
  );
};

const MarkerInfoWindow: FC<{ items?: TItem[] }> = ({ items }) => {
  return (
    <>
      {items && (
        <GoogleMap defaultCenter={items[0]?.attributes?.location?.coordinates}>
          {items.map((mk) => {
            const lat = mk?.attributes?.location?.coordinates?.lat;
            const lng = mk?.attributes?.location?.coordinates?.lng;
            if (lat && lng)
              return <Marker key={mk?.id} lat={lat} lng={lng} {...mk} />;
          })}
        </GoogleMap>
      )}
    </>
  );
};

export default MarkerInfoWindow;
