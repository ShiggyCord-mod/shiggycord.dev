import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Button, Box } from "@mui/material";
import { theme } from "@theme/theme";

// Pages
import { LoadingPage } from "@pages/LoadingPage";

const HomePage = React.lazy(() =>
  import("@pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const InstallPage = React.lazy(() =>
  import("@pages/InstallPage").then((m) => ({ default: m.InstallPage })),
);
const BuildPage = React.lazy(() =>
  import("@pages/BuildPage").then((m) => ({ default: m.BuildPage })),
);
const ContributePage = React.lazy(() =>
  import("@pages/ContributePage").then((m) => ({ default: m.ContributePage })),
);
const FAQPage = React.lazy(() =>
  import("@pages/FAQPage").then((m) => ({ default: m.FAQPage })),
);
const PrivacyPolicyPage = React.lazy(() =>
  import("@pages/PrivacyPolicyPage").then((m) => ({
    default: m.PrivacyPolicyPage,
  })),
);
const NotFoundPage = React.lazy(() => import("@pages/NotFoundPage"));

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

    let loadedCount = 0;
    const totalTasks = criticalImages.length + 7;

    if (totalTasks === 0) {
      if (isMounted) setLoading(false);
      return () => {
        clearTimeout(skipTimer);
        clearTimeout(forceLoadTimer);
      };
    }

    const handleTaskComplete = () => {
      if (!isMounted) return;
      loadedCount++;
      setProgress((loadedCount / totalTasks) * 100);
      if (loadedCount === totalTasks) {
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 600);
      }
    };

    const allPromises: Promise<void>[] = [];

    // Preload page chunks
    const pageImports = [
      import("@pages/HomePage"),
      import("@pages/InstallPage"),
      import("@pages/BuildPage"),
      import("@pages/ContributePage"),
      import("@pages/FAQPage"),
      import("@pages/PrivacyPolicyPage"),
      import("@pages/NotFoundPage"),
    ];

    pageImports.forEach((promise) => {
      allPromises.push(
        promise
          .then(() => handleTaskComplete())
          .catch(() => handleTaskComplete()),
      );
    });

    // Create image loading promises
    criticalImages.forEach((url) => {
      const img = new Image();
      img.src = url;

      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          handleTaskComplete();
          resolve();
        };
        img.onerror = () => {
          handleTaskComplete();
          resolve();
        };
      });

      allPromises.push(promise);
    });

    Promise.allSettled(allPromises).then(() => {
      if (isMounted && loadedCount === totalTasks) {
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
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
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
