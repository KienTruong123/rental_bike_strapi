import { FC, useState } from "react";
import { IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { TItem } from "../redux/reducers/cart";

const Item: FC<{ item: TItem; width?: number }> = ({ item, width }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={name}
          width="300px"
          height="400px"
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" borderRadius="3px">
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon  />
              </IconButton>
              <Typography color="light">{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button variant="contained" color="success">Add to Cart</Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="caption" >
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
