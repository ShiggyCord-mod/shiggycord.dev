import React, { useState, useMemo, useCallback } from "react";
import {
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  alpha,
  Chip,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Apple,
  ContentCopy,
  CheckCircle,
  ArrowForward,
  InfoOutlined,
} from "@mui/icons-material";
import { install } from "@i18n";

export const BundleInjection: React.FC<{ isRecommended?: boolean }> =
  React.memo(({ isRecommended }) => {
    const [copied, setCopied] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);

    const { bundleUrl, kettuUrl, guideSteps, ui } = install.ios;

    const handleCopy = useCallback(async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(bundleUrl);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = bundleUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed", err);
      }
    }, [bundleUrl]);

    const handleOpenHelp = useCallback(() => setOpenHelp(true), []);
    const handleCloseHelp = useCallback(() => setOpenHelp(false), []);

    const formattedGuideSteps = useMemo(
      () =>
        guideSteps.map((step: string, i: number) => ({
          id: i,
          content: step.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
        })),
      [guideSteps],
    );

    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {isRecommended && (
          <Chip
            label={ui.recommendation_label}
            color="primary"
            size="small"
            sx={{ mb: 2, fontWeight: 700, alignSelf: "flex-start" }}
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
            <Apple sx={{ color: "primary.main", fontSize: 28 }} />
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

        <Box sx={{ flexGrow: 1, mb: 3 }}>
          <Typography variant="overline" fontWeight={700} color="text.secondary">
            {ui.bundle_url_label}
          </Typography>
          <Box
            sx={(theme) => ({
              position: "relative",
              p: 2,
              mt: 1,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              display: "flex",
              alignItems: "center",
            })}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "monospace",
                wordBreak: "break-all",
                pr: 7,
                fontSize: "0.95rem",
              }}
            >
              {bundleUrl}
            </Typography>
            <IconButton
              onClick={handleCopy}
              size="small"
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                bgcolor: copied
                  ? alpha(theme.palette.success.main, 0.1)
                  : alpha(theme.palette.primary.main, 0.1),
                borderRadius: "8px",
              })}
            >
              {copied ? (
                <CheckCircle fontSize="small" color="success" />
              ) : (
                <ContentCopy fontSize="small" sx={{ color: "primary.main" }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <Alert
          severity="info"
          variant="outlined"
          sx={(theme) => ({
            mb: 3,
            borderRadius: 2,
            borderColor: alpha(theme.palette.primary.main, 0.3),
          })}
        >
          <AlertTitle sx={{ fontWeight: 700 }}>{ui.alert_title}</AlertTitle>
          <span dangerouslySetInnerHTML={{ __html: ui.alert_body }} />
        </Alert>

        <Stack spacing={2}>
          <Button
            variant="contained"
            fullWidth
            disableElevation
            onClick={handleOpenHelp}
            startIcon={<InfoOutlined />}
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              borderRadius: "50px",
              py: 1.2,
              textTransform: "none",
              fontWeight: 700,
            })}
          >
            {ui.guide_button}
          </Button>
          <Button
            variant="contained"
            fullWidth
            disableElevation
            href={kettuUrl}
            target="_blank"
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: "50px",
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            {ui.get_kettu}
          </Button>
        </Stack>

        <Dialog
          open={openHelp}
          onClose={handleCloseHelp}
          slotProps={{
            paper: { sx: { borderRadius: 4, p: 1 } },
          }}
        >
          <DialogTitle sx={{ fontWeight: 800 }}>{ui.dialog_title}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {formattedGuideSteps.map((step) => (
                <Typography key={step.id} variant="body2">
                  {step.id + 1}.{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: step.content,
                    }}
                  />
                </Typography>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleCloseHelp}
              variant="contained"
              disableElevation
              sx={{ borderRadius: "20px", px: 4 }}
            >
              {ui.dialog_close}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  });

BundleInjection.displayName = "BundleInjection";
