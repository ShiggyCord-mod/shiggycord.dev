import React, { useMemo } from "react";
import { Box, CircularProgress, Typography, keyframes } from "@mui/material";
import { loading_page } from "@i18n";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export interface LoadingPageProps {
  progress: number;
}

export const LoadingPage: React.FC<LoadingPageProps> = React.memo(
  ({ progress }) => {
    const roundedProgress = useMemo(() => Math.round(progress), [progress]);

    const progressSuffix = useMemo(
      () => loading_page.status.progress_suffix,
      [],
    );

    const containerStyle = useMemo(
      () => ({
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.default",
        animation: `${fadeIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1)`,
      }),
      [],
    );

    const progressContainerStyle = useMemo(
      () => ({
        position: "relative" as const,
        display: "inline-flex",
        mb: 3,
        "&::after": {
          content: '""',
          position: "absolute" as const,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(25, 118, 210, 0.2)",
          animation: `${pulse} 2s infinite ease-in-out`,
        },
      }),
      [],
    );

    const backgroundTrackStyle = useMemo(
      () => ({
        color: "action.hover",
      }),
      [],
    );

    const activeProgressStyle = useMemo(
      () => ({
        color: "primary.main",
        position: "absolute" as const,
        left: 0,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        [`& .MuiCircularProgress-circle`]: {
          strokeLinecap: "round",
        },
      }),
      [],
    );

    const titleStyle = useMemo(
      () => ({
        fontWeight: 600,
        color: "text.primary",
        letterSpacing: "0.1rem",
        mb: 0.5,
      }),
      [],
    );

    const progressTextStyle = useMemo(
      () => ({
        fontWeight: 400,
        color: "text.secondary",
        fontFamily: "monospace",
      }),
      [],
    );

    const loadingTextContainer = useMemo(
      () => (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={titleStyle}>
            {loading_page.status.title}
          </Typography>
          <Typography variant="body2" sx={progressTextStyle}>
            {roundedProgress}
            {progressSuffix}
          </Typography>
        </Box>
      ),
      [roundedProgress, progressSuffix, titleStyle, progressTextStyle],
    );

    const progressCircles = useMemo(
      () => (
        <Box sx={progressContainerStyle}>
          {/* Background Track */}
          <CircularProgress
            variant="determinate"
            sx={backgroundTrackStyle}
            size={100}
            thickness={4}
            value={100}
          />

          {/* Active Progress Circle */}
          <CircularProgress
            variant="determinate"
            sx={activeProgressStyle}
            size={100}
            thickness={4}
            value={progress}
          />
        </Box>
      ),
      [
        progress,
        progressContainerStyle,
        backgroundTrackStyle,
        activeProgressStyle,
      ],
    );

    return (
      <Box sx={containerStyle}>
        {progressCircles}
        {loadingTextContainer}
      </Box>
    );
  },
);

LoadingPage.displayName = "LoadingPage";
