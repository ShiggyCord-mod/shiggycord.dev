import React, { useMemo } from "react";
import {
  Typography,
  Button,
  Box,
  Stack,
  alpha,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ArrowForward, Computer, Apps } from "@mui/icons-material";
import { install } from "@i18n";

const gridButtonSx = (theme: any) => ({
  borderRadius: "50px",
  py: 1.2,
  px: 3,
  textTransform: "none" as const,
  fontWeight: 700,
  color: theme.palette.primary.main,
  borderColor: alpha(theme.palette.primary.main, 0.3),
  justifyContent: "space-between",
});

const chipSx = { mb: 2, fontWeight: 700, borderRadius: "8px", alignSelf: "flex-start" };

const osChipSx = { height: 20, fontSize: "0.65rem", fontWeight: 800 };

const RenderGrid = React.memo(
  ({ items }: { items: { name: string; url: string }[] }) => (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid size={{ xs: 12, sm: 6 }} key={item.name}>
          <Button
            variant="outlined"
            fullWidth
            href={item.url}
            target="_blank"
            endIcon={<ArrowForward />}
            sx={gridButtonSx}
          >
            {item.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  ),
);

RenderGrid.displayName = "RenderGrid";

export const PCSection: React.FC<{ isRecommended?: boolean }> = React.memo(
  ({ isRecommended }) => {
    const { clients, apps, ui } = install.pcSection;

    const { isWindows, isLinux, isMac } = useMemo(() => {
      const ua = navigator.userAgent;
      return {
        isWindows: ua.indexOf("Win") !== -1,
        isLinux: ua.indexOf("Linux") !== -1,
        isMac: ua.indexOf("Mac") !== -1,
      };
    }, []);

    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {isRecommended && (
          <Chip
            label={ui.recommendation_label}
            color="primary"
            size="small"
            sx={chipSx}
          />
        )}

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Box
            sx={(theme) => ({
              p: 1,
              borderRadius: "8px",
              display: "flex",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            })}
          >
            <Computer sx={{ color: "primary.main", fontSize: 24 }} />
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
                  sx={osChipSx}
                />
              )}
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {ui.client_mods_subtitle}
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ mb: 4 }}>
          <RenderGrid items={clients} />
        </Box>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Box
            sx={(theme) => ({
              p: 1,
              borderRadius: "8px",
              display: "flex",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            })}
          >
            <Apps sx={{ color: "primary.main", fontSize: 24 }} />
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
                  sx={osChipSx}
                />
              )}
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {ui.standalone_apps_subtitle}
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ mb: 2 }}>
          <RenderGrid items={apps} />
        </Box>
      </Box>
    );
  },
);

PCSection.displayName = "PCSection";
