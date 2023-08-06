import { FC, useState } from "react";
import {
  IconButton,
  Box,
  Typography,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { TItem, addToCart } from "../redux/reducers/cart";
import { useDispatch } from "react-redux";

const Item: FC<{ item: TItem; width?: number; selected?: boolean }> = ({
  item,
  selected,
}) => {
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
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
    <Paper elevation={selected ? 8 : 0}>
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
          style={{ cursor: "pointer" }}
        />
        <Box position="absolute" top={0}>
          <Chip
            color="primary"
            size="small"
            sx={{ borderRadius: 0 }}
            label={category
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          />
        </Box>
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              borderRadius="3px"
              sx={{ color: "#fff" }}
            >
              <IconButton
                color="inherit"
                onClick={() => setCount(Math.max(count - 1, 1))}
              >
                <RemoveIcon />
              </IconButton>
              <Typography color="light">{count}</Typography>
              <IconButton color="inherit" onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              color="success"
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{price?.toLocaleString()} VND</Typography>
      </Box>
    </Paper>
  );
};

export default Item;
