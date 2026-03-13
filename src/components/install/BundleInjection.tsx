import React, { useState, useMemo, useCallback } from "react";
import {
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  alpha,
  useTheme,
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
import data from "../../json/install.json";

export const BundleInjection: React.FC<{ isRecommended?: boolean }> = ({
  isRecommended,
}) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const color = useMemo(
    () => theme.palette.primary.main,
    [theme.palette.primary.main],
  );

  const { bundleUrl, kettuUrl, guideSteps, ui } = useMemo(() => data.ios, []);

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
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }, [bundleUrl]);

  const handleOpenHelp = useCallback(() => setOpenHelp(true), []);
  const handleCloseHelp = useCallback(() => setOpenHelp(false), []);

  const platformHeaderStyle = useMemo(
    () => ({
      p: 1.5,
      borderRadius: "12px",
      display: "flex",
      bgcolor: alpha(color, 0.1),
    }),
    [color],
  );

  const urlBoxStyle = useMemo(
    () => ({
      position: "relative" as const,
      p: 2,
      mt: 1,
      borderRadius: 3,
      bgcolor: alpha(color, 0.05),
      border: `1px solid ${alpha(color, 0.2)}`,
      display: "flex",
      alignItems: "center",
    }),
    [color],
  );

  const copyButtonStyle = useMemo(
    () => ({
      position: "absolute" as const,
      right: 8,
      bgcolor: copied
        ? alpha(theme.palette.success.main, 0.1)
        : alpha(color, 0.1),
      borderRadius: "8px",
    }),
    [copied, color, theme.palette.success.main],
  );

  const formattedGuideSteps = useMemo(
    () =>
      guideSteps.map((step: string, i: number) => ({
        id: i,
        content: step.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
      })),
    [guideSteps],
  );

  const alertStyle = useMemo(
    () => ({
      mb: 3,
      borderRadius: 2,
      borderColor: alpha(color, 0.3),
    }),
    [color],
  );

  const guideButtonStyle = useMemo(
    () => ({
      bgcolor: alpha(color, 0.1),
      color,
      borderRadius: "50px",
      py: 1.2,
      textTransform: "none" as const,
      fontWeight: 700,
    }),
    [color],
  );

  const kettuButtonStyle = useMemo(
    () => ({
      borderRadius: "50px",
      py: 1.5,
      textTransform: "none" as const,
      fontWeight: 700,
    }),
    [],
  );

  const dialogPaperProps = useMemo(
    () => ({
      sx: { borderRadius: 4, p: 1 },
    }),
    [],
  );

  const dialogCloseButtonStyle = useMemo(
    () => ({
      borderRadius: "20px",
      px: 4,
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
          sx={{ mb: 2, fontWeight: 700, alignSelf: "flex-start" }}
        />
      )}

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Box sx={platformHeaderStyle}>
          <Apple sx={{ color, fontSize: 28 }} />
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
        <Box sx={urlBoxStyle}>
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
          <IconButton onClick={handleCopy} size="small" sx={copyButtonStyle}>
            {copied ? (
              <CheckCircle fontSize="small" color="success" />
            ) : (
              <ContentCopy fontSize="small" sx={{ color }} />
            )}
          </IconButton>
        </Box>
      </Box>

      <Alert severity="info" variant="outlined" sx={alertStyle}>
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
          sx={guideButtonStyle}
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
          sx={kettuButtonStyle}
        >
          {ui.get_kettu}
        </Button>
      </Stack>

      <Dialog
        open={openHelp}
        onClose={handleCloseHelp}
        slotProps={{
          paper: dialogPaperProps,
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
            sx={dialogCloseButtonStyle}
          >
            {ui.dialog_close}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
