import React, { useState, useEffect, useMemo, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Button, Box } from "@mui/material";
import { theme } from "@theme/theme";

// Pages
import { LoadingPage } from "@pages/LoadingPage";
import { HomePage } from "@pages/HomePage";
import { InstallPage } from "@pages/InstallPage";
import { BuildPage } from "@pages/BuildPage";
import { ContributePage } from "@pages/ContributePage";
import { FAQPage } from "@pages/FAQPage";
import { PrivacyPolicyPage } from "@pages/PrivacyPolicyPage";
import NotFoundPage from "@pages/NotFoundPage";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const criticalImages = useMemo(
    () => [
      "https://cdn.kmmiio99o.dev/shiggycord/xguhyl.png",
      "https://cdn.kmmiio99o.dev/shiggycord/c1hl8n.webp",
      "https://cdn.kmmiio99o.dev/shiggycord/ss-list.jpg",
      "https://cdn.kmmiio99o.dev/shiggycord/sh-category.jpg",
      "https://cdn.kmmiio99o.dev/shiggycord/sh-settings.jpg",
      "https://cdn.kmmiio99o.dev/shiggycord/l4exhy.gif",
    ],
    [],
  );

  const handleSkipLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const skipButtonStyle = useMemo(
    () => ({
      position: "fixed" as const,
      bottom: 40,
      left: "50%",
      transform: "translateX(-50%)",
      color: "text.secondary",
      fontSize: "0.75rem",
      textDecoration: "underline",
      "&:hover": { textDecoration: "none", bgcolor: "transparent" },
    }),
    [],
  );

  const SkipButton = useMemo(
    () =>
      showSkip ? (
        <Button variant="text" onClick={handleSkipLoading} sx={skipButtonStyle}>
          Taking too long? Click here to continue
        </Button>
      ) : null,
    [showSkip, handleSkipLoading, skipButtonStyle],
  );

  useEffect(() => {
    let isMounted = true;
    const skipTimer = setTimeout(() => {
      if (isMounted) setShowSkip(true);
    }, 3000);

    const forceLoadTimer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 10000);

    if (criticalImages.length === 0) {
      if (isMounted) setLoading(false);
      return () => {
        clearTimeout(skipTimer);
        clearTimeout(forceLoadTimer);
      };
    }

    let loadedCount = 0;
    const total = criticalImages.length;
    const imagePromises: Promise<void>[] = [];

    const handleImageComplete = () => {
      if (!isMounted) return;
      loadedCount++;
      setProgress((loadedCount / total) * 100);
      if (loadedCount === total) {
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 600);
      }
    };

    // Create image loading promises
    criticalImages.forEach((url) => {
      const img = new Image();
      img.src = url;

      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          handleImageComplete();
          resolve();
        };
        img.onerror = () => {
          handleImageComplete();
          resolve();
        };
      });

      imagePromises.push(promise);
    });

    // Optional: Use Promise.all for better loading control
    Promise.allSettled(imagePromises).then(() => {
      if (isMounted && loadedCount === total) {
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 600);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(skipTimer);
      clearTimeout(forceLoadTimer);
    };
  }, [criticalImages]);

  const appRoutes = useMemo(
    () => (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/install" element={<InstallPage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    ),
    [],
  );

  const loadingContent = useMemo(
    () => (
      <Box sx={{ position: "relative" }}>
        <LoadingPage progress={progress} />
        {SkipButton}
      </Box>
    ),
    [progress, SkipButton],
  );

  const mainAppContent = useMemo(
    () => <Router>{appRoutes}</Router>,
    [appRoutes],
  );

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loadingContent}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {mainAppContent}
    </ThemeProvider>
  );
};
