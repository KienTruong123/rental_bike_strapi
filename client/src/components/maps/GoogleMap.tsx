import { FC } from "react";
import GoogleMapReact, { Props as GoogleMapReactProps } from "google-map-react";

const key = "AIzaSyD7HHfmwY6g1YrZWyGntJcqTNZvg8xtiXc";

const GoogleMap: FC<GoogleMapReactProps> = ({
  children,
  defaultCenter,
  ...props
}) => (
  <GoogleMapReact
    defaultZoom={10}
    defaultCenter={defaultCenter || { lat: 10.77, lng: 106.67 }}
    bootstrapURLKeys={{
      key: key,
    }}
    {...props}
  >
    {children}
  </GoogleMapReact>
);

export default GoogleMap;
