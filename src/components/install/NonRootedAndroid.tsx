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
  Chip,
} from "@mui/material";
import { ArrowForward, Smartphone, Security } from "@mui/icons-material";
import { install } from "@i18n";

export const NonRootedAndroid: React.FC<{ isRecommended?: boolean }> =
  React.memo(({ isRecommended }) => {
    const { description, items, downloadUrl, ui } = install.nonRootedAndroid;

    const listItems = useMemo(
      () =>
        items.map((item, i) => (
          <ListItem key={i} disableGutters sx={{ px: 1 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Security sx={{ fontSize: 18, color: "primary.main" }} />
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
      [items],
    );

    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {isRecommended && (
          <Chip
            label={ui.recommendation_label}
            color="primary"
            size="small"
            sx={{ mb: 2, fontWeight: 700, borderRadius: "8px", alignSelf: "flex-start" }}
          />
        )}

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Box
            sx={(theme) => ({
              p: 1.5,
              borderRadius: "12px",
              display: "flex",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            })}
          >
            <Smartphone sx={{ color: "primary.main", fontSize: 28 }} />
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

        <Typography
          variant="body2"
          sx={{ mb: 2, color: "text.secondary", px: 1, lineHeight: 1.6 }}
        >
          {description}
        </Typography>

        <Box sx={{ flexGrow: 1, mb: 4 }}>
          <Typography
            variant="overline"
            fontWeight={700}
            color="text.secondary"
            sx={{ ml: 1 }}
          >
            {ui.list_header}
          </Typography>
          <Box
            sx={(theme) => ({
              p: 1.5,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            })}
          >
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
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
            "&:hover": { bgcolor: theme.palette.primary.main, opacity: 0.9 },
            borderRadius: "50px",
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
          })}
        >
          {ui.button_text}
        </Button>
      </Box>
    );
  });

NonRootedAndroid.displayName = "NonRootedAndroid";
