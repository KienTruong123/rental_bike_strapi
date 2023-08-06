import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import {
  decreaseCount,
  increaseCount,
  removeCart,
  toggleCartOpen,
} from "../redux/reducers/cart";
import { lightGreen } from "@mui/material/colors";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useTranslation } from "react-i18next";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  const handleClose = () => dispatch(toggleCartOpen());

  return (
    <>
      <Badge
        badgeContent={cart.length}
        color="error"
        sx={{
          "& .MuiBadge-badge": {
            right: 5,
            top: 5,
            padding: "0 4px",
            height: 14,
          },
        }}
      >
        <IconButton onClick={handleClose} >
          <ShoppingBagIcon />
        </IconButton>
      </Badge>

      <Dialog
        open={isCartOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t("modalBag")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {cart.map((item) => (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => dispatch(removeCart({ id: item.id }))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Badge
                      badgeContent={item?.count?.toString() + " " + t("days")}
                      color="primary"
                      sx={{
                        "& .MuiBadge-badge": {
                          right: 5,
                          top: 5,
                          height: 14,
                          fontSize: 10,
                          width: 50
                        },
                      }}
                    >
                      <Avatar>
                        <img
                          alt={item?.name}
                          width="123px"
                          height="164px"
                          src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>

                  <ListItemText
                    primary={item.attributes.name}
                    secondary={
                      <Box display="flex" alignItems="center">
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                        <Typography fontWeight="bold">
                          {(
                            item.attributes.price * item?.count
                          ).toLocaleString()}{" "}
                          VND
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
              <ListItem
                secondaryAction={
                  <ListItemText
                    primary={t("totalPrice")}
                    secondary={
                      <Typography fontWeight="bold" color="sucess">
                        {totalPrice.toLocaleString() + " VND"}
                      </Typography>
                    }
                  />
                }
              />
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(toggleCartOpen())}>
            {t("checkout")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default CartMenu;
