import React, { useMemo } from "react";
import {
  Typography,
  Button,
  Box,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme,
  Chip,
} from "@mui/material";
import { ArrowForward, Smartphone, Security } from "@mui/icons-material";
import { install } from "@i18n";

export const NonRootedAndroid: React.FC<{ isRecommended?: boolean }> =
  React.memo(({ isRecommended }) => {
    const theme = useTheme();

    const color = useMemo(
      () => theme.palette.primary.main,
      [theme.palette.primary.main],
    );

    const { description, items, downloadUrl, ui } = useMemo(
      () => install.nonRootedAndroid,
      [],
    );

    const platformHeaderStyle = useMemo(
      () => ({
        p: 1.5,
        borderRadius: "12px",
        display: "flex",
        bgcolor: alpha(color, 0.1),
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

    const listContainerStyle = useMemo(
      () => ({
        p: 1.5,
        borderRadius: 3,
        bgcolor: alpha(color, 0.05),
        border: `1px solid ${alpha(color, 0.1)}`,
      }),
      [color],
    );

    const downloadButtonStyle = useMemo(
      () => ({
        bgcolor: color,
        "&:hover": { bgcolor: color, opacity: 0.9 },
        borderRadius: "50px",
        py: 1.5,
        textTransform: "none" as const,
        fontWeight: 700,
      }),
      [color],
    );

    const listItems = useMemo(
      () =>
        items.map((item, i) => (
          <ListItem key={i} disableGutters sx={{ px: 1 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Security sx={{ fontSize: 18, color }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item}
                </Typography>
              }
            />
          </ListItem>
        )),
      [items, color],
    );

    const descriptionStyle = useMemo(
      () => ({
        mb: 2,
        color: "text.secondary",
        px: 1,
        lineHeight: 1.6,
      }),
      [],
    );

    const listHeaderStyle = useMemo(
      () => ({
        ml: 1,
      }),
      [],
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

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Box sx={platformHeaderStyle}>
            <Smartphone sx={{ color, fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {ui.platform_title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ui.platform_subtitle}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body2" sx={descriptionStyle}>
          {description}
        </Typography>

        <Box sx={{ flexGrow: 1, mb: 4 }}>
          <Typography
            variant="overline"
            fontWeight={700}
            color="text.secondary"
            sx={listHeaderStyle}
          >
            {ui.list_header}
          </Typography>
          <Box sx={listContainerStyle}>
            <List dense disablePadding>
              {listItems}
            </List>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          disableElevation
          href={downloadUrl}
          target="_blank"
          endIcon={<ArrowForward />}
          sx={downloadButtonStyle}
        >
          {ui.button_text}
        </Button>
      </Box>
    );
  });

NonRootedAndroid.displayName = "NonRootedAndroid";
