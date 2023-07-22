import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { TablePagination, TextField } from "@mui/material";
import { LangguageToggle } from "./ToggleMode";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
  minWidth: 300,
}));

export const Home = () => {

  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t('Welcome to React')}</h1>
      <TextField  label="Locale" fullWidth />
      <LangguageToggle/>
      <TablePagination
          count={2000}
          rowsPerPage={10}
          page={1}
          component="div"
          onPageChange={() => {}}
        />
      <Grid spacing={2}>
        {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
          <Item
            key={elevation}
            elevation={elevation}
            sx={{
              p: 2,
              display: "grid",
              gridTemplateColumns: { md: "1fr" },
              gap: 2,
            }}
          >
            {`elevation=${elevation}`}
          </Item>
        ))}
      </Grid>
    </div>
  );
};
