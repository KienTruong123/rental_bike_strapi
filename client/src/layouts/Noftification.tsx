import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Snackbar } from "@mui/material";
import { useEffect } from "react";
import {
  closeNotification,
  setNotification,
} from "../redux/reducers/notification";

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     notification.isOpen && setShowNotification;
  //   }, [notification.isOpen]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={notification.isOpen}
      autoHideDuration={4000}
      message={notification.message}
      onClose={() => dispatch(closeNotification())}
    />
  );
};
export default Notification;
