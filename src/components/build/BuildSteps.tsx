import React, { useState } from "react";
import { Box, Typography, IconButton, Stack, useTheme } from "@mui/material";
import { ContentCopy, CheckCircle, Terminal } from "@mui/icons-material";
import { build } from "@i18n";

export const BuildSteps: React.FC = () => {
  const theme = useTheme();
  const [copied, setCopied] = useState<number | null>(null);

  const copy = async (text: string, i: number) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(i);
      } catch (err) {
        console.error("Failed to copy using Clipboard API", err);
      }
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      try {
        await navigator.clipboard.writeText(textArea.value);
        setCopied(i);
      } catch (err) {
        console.error("Copy failed", err);
        try {
          const successful = document.execCommand("copy");
          if (successful) setCopied(i);
        } catch (fallbackErr) {
          console.error("Fallback copy failed", fallbackErr);
        }
      }

      document.body.removeChild(textArea);
    }

    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 7,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Terminal color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          2. Execution
        </Typography>
      </Stack>
      <Box
        sx={{
          bgcolor: "#121212",
          color: "#E0E0E0",
          borderRadius: 5,
          p: 2,
          fontFamily: "monospace",
        }}
      >
        {build.buildSteps.map((cmd, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "inherit",
                flex: 1,
                minWidth: 0,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                whiteSpace: "pre-wrap",
              }}
            >
              <span style={{ color: theme.palette.primary.light }}>$</span>{" "}
              {cmd}
            </Typography>
            <IconButton
              size="small"
              onClick={() => copy(cmd, i)}
              sx={{ color: "grey.500" }}
            >
              {copied === i ? (
                <CheckCircle fontSize="small" color="success" />
              ) : (
                <ContentCopy fontSize="small" />
              )}
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
