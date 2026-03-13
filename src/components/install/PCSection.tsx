import React, { useMemo, useCallback } from "react";
import {
  Typography,
  Button,
  Box,
  Stack,
  alpha,
  useTheme,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ArrowForward, Computer, Apps } from "@mui/icons-material";
import { install } from "@i18n";

export const PCSection: React.FC<{ isRecommended?: boolean }> = React.memo(
  ({ isRecommended }) => {
    const theme = useTheme();

    const color = useMemo(
      () => theme.palette.primary.main,
      [theme.palette.primary.main],
    );

    const { clients, apps, ui } = useMemo(() => install.pcSection, []);

    const userAgentInfo = useMemo(() => {
      const userAgent = navigator.userAgent;
      return {
        isWindows: userAgent.indexOf("Win") !== -1,
        isLinux: userAgent.indexOf("Linux") !== -1,
        isMac: userAgent.indexOf("Mac") !== -1,
      };
    }, []);

    const { isWindows, isLinux, isMac } = userAgentInfo;

    const gridButtonStyle = useMemo(
      () => ({
        borderRadius: "50px",
        py: 1.2,
        px: 3,
        textTransform: "none" as const,
        fontWeight: 700,
        color,
        borderColor: alpha(color, 0.3),
        justifyContent: "space-between",
      }),
      [color],
    );

    const chipStyle = useMemo(
      () => ({
        mb: 2,
        fontWeight: 700,
        borderRadius: "8px",
        alignSelf: "flex-start",
      }),
      [],
    );

    const iconContainerStyle = useMemo(
      () => ({
        p: 1,
        borderRadius: "8px",
        display: "flex",
        bgcolor: alpha(color, 0.1),
      }),
      [color],
    );

    const osRecommendationChipStyle = useMemo(
      () => ({
        height: 20,
        fontSize: "0.65rem",
        fontWeight: 800,
      }),
      [],
    );

    const renderGrid = useCallback(
      (items: { name: string; url: string }[]) => (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid size={{ xs: 12, sm: 6 }} key={item.name}>
              <Button
                variant="outlined"
                fullWidth
                href={item.url}
                target="_blank"
                endIcon={<ArrowForward />}
                sx={gridButtonStyle}
              >
                {item.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      ),
      [gridButtonStyle],
    );

    const clientModsSection = useMemo(
      () => (
        <>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Box sx={iconContainerStyle}>
              <Computer sx={{ color, fontSize: 24 }} />
            </Box>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6" fontWeight={700}>
                  {ui.client_mods_title}
                </Typography>
                {isWindows && (
                  <Chip
                    label={ui.windows_recommendation}
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={osRecommendationChipStyle}
                  />
                )}
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {ui.client_mods_subtitle}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ mb: 4 }}>{renderGrid(clients)}</Box>
        </>
      ),
      [
        ui,
        isWindows,
        color,
        iconContainerStyle,
        osRecommendationChipStyle,
        renderGrid,
        clients,
      ],
    );

    const standaloneAppsSection = useMemo(
      () => (
        <>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Box sx={iconContainerStyle}>
              <Apps sx={{ color, fontSize: 24 }} />
            </Box>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6" fontWeight={700}>
                  {ui.standalone_apps_title}
                </Typography>
                {(isLinux || isMac) && (
                  <Chip
                    label={ui.os_recommendation}
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={osRecommendationChipStyle}
                  />
                )}
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {ui.standalone_apps_subtitle}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ mb: 2 }}>{renderGrid(apps)}</Box>
        </>
      ),
      [
        ui,
        isLinux,
        isMac,
        color,
        iconContainerStyle,
        osRecommendationChipStyle,
        renderGrid,
        apps,
      ],
    );

    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {isRecommended && (
          <Chip
            label={ui.recommendation_label}
            color="primary"
            size="small"
            sx={chipStyle}
          />
        )}

        {/* Client Mods Section */}
        {clientModsSection}

        {/* Standalone Apps Section */}
        {standaloneAppsSection}
      </Box>
    );
  },
);

PCSection.displayName = "PCSection";
