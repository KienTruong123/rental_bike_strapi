import {
  Badge,
  Box,
  Popover,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { useState } from "react";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useQuery } from "@tanstack/react-query";
import { ClientApi } from "../lib/client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Footer = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const auth = useSelector((state: RootState) => state.auth);

  const { isLoading, data, refetch } = useQuery({
    enabled: Boolean(auth?.profile?.jwt),
    queryKey: ["chats"],
    queryFn: () =>
      ClientApi.chats(auth.profile?.jwt)
        .get()
        .then((res) => {
          return res?.chats;
        }),
  });

  console.log(data, "data");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      width="100%"
      justifyContent="center"
      sx={{ backgroundColor: "#f0f0f" }}
      paddingTop={2}
    >
      Copyright © 2023 KienTruong
      <Badge
        badgeContent={data?.length || 0}
        color="primary"
        overlap="circular"
        sx={{
          position: "fixed",
          bottom: 100,
          right: 30,
          backgroundColor: "#87CEFA",
          padding: 2,
          borderRadius: 10,
          paddingBottom: 1,
        }}
      >
        <Box
          onClick={handleClick}
          sx={{
            backgroundColor: "#87CEFA",
            cursor: "pointer",
          }}
        >
          <ForumIcon />
        </Box>
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box display="flex" justifyContent="end">
          <CloseIcon onClick={handleClose} />
        </Box>
        <Box width={300} height={300} overflow={"scroll"}>
          <ChatBox>
            {data?.map((item: any) => {
              return (
                <>
                  {item?.responsive && (
                    <ReceiverMessage avatar={<Avatar>AD</Avatar>}>
                      {item.responsive}
                    </ReceiverMessage>
                  )}
                  {item?.message && (
                    <SenderMessage
                      avatar={<Avatar>{auth.profile?.user?.username}</Avatar>}
                    >
                      {item.message}
                    </SenderMessage>
                  )}
                </>
              );
            })}
          </ChatBox>
        </Box>
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          paddingRight={2}
        >
          <TextField size="small" variant="outlined" sx={{ margin: 2 }} />
          <Box>
            <SendIcon />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
