import { createTheme, PaletteMode } from "@mui/material";
import React from "react";
import { getDesignTokens } from "./theme";
import { viVN, enUS, Localization } from "@mui/material/locale";
import { useTranslation } from "react-i18next";

const LangMapping: { [key: string]: Localization } = {
  vi: viVN,
  en: enUS,
};

export const useLocaleAndColorTheme = () => {
  const { i18n } = useTranslation();

  const keyLang = i18n.resolvedLanguage || "vi";
  const currLang = LangMapping[keyLang] || viVN;

  const [mode, setMode] = React.useState<PaletteMode>("light");

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const modifiedTheme = React.useMemo(
    () => createTheme(getDesignTokens(mode), currLang),
    [mode, currLang]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
