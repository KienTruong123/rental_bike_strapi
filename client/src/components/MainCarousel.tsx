import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ClientApi } from "../lib/client";
import { get } from "lodash";
import { useQuery } from "@tanstack/react-query";

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { isLoading, data: items } = useQuery({
    queryKey: ["banner"],
    queryFn: () =>
      ClientApi.banner()
        .get()
        .then((res) => {
          return res?.data;
        }),
  });

  return (
    <Box paddingTop={5} sx={{ borderRadius: 1, overflow: "hidden" }}>
      <Carousel
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
      >
        {items?.map((texture: any, index: number) => (
          <Box key={`carousel-image-${index}`}>
            <img
              src={`http://localhost:1337${get(
                texture,
                "attributes.images.data.attributes.formats.large.url"
              )}`}
              alt={`carousel-${index}`}
              style={{
                width: "100%",
                height: 500,
                objectFit: "cover",
                backgroundAttachment: "fixed",
              }}
            />
            <Box
              color="white"
              padding="20px"
              borderRadius="1px"
              textAlign="left"
              position="absolute"
              top="46%"
              left={isNonMobile ? "10%" : "0"}
              right={isNonMobile ? undefined : "0"}
              margin={isNonMobile ? undefined : "0 auto"}
              maxWidth={isNonMobile ? undefined : "240px"}
            >
              <Typography>{get(texture, "attributes.title")}</Typography>
              <Typography variant="h1">
                {get(texture, "attributes.bike.data.attributes.name")}
              </Typography>
              <Typography
                fontWeight="bold"
                sx={{ textDecoration: "underline" }}
              >
                Discover More
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MainCarousel;
