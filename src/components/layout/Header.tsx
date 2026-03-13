import React, { useState, useMemo, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  useTheme,
  alpha,
  IconButton,
  useMediaQuery,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { layout } from "@i18n";

export const Header: React.FC = () => {
  const location = useLocation();
  const activePath = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleMobileNav = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const appBarStyle = useMemo(
    () => ({
      backgroundColor: "transparent",
      backgroundImage: "none",
      top: isMobile ? 0 : 16,
      zIndex: theme.zIndex.drawer + 2,
    }),
    [isMobile, theme.zIndex.drawer],
  );

  const toolbarStyle = useMemo(
    () => ({
      minHeight: 64,
      px: { xs: 2, sm: 3 },
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: isMobile ? "0 0 24px 24px" : "24px",
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.05)}`,
    }),
    [isMobile, theme],
  );

  const logoBoxStyle = useMemo(
    () => ({
      width: 40,
      height: 40,
      borderRadius: "12px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: alpha(theme.palette.primary.main, 0.1),
      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    }),
    [theme],
  );

  const logoImageStyle = useMemo(
    () => ({
      width: "85%",
      height: "85%",
      objectFit: "contain",
    }),
    [],
  );

  const brandNameStyle = useMemo(
    () => ({
      fontWeight: 800,
      fontSize: "1.1rem",
      color: theme.palette.text.primary,
      letterSpacing: "-0.03em",
    }),
    [theme.palette.text.primary],
  );

  const hamburgerIconButtonStyle = useMemo(
    () => ({
      width: 44,
      height: 44,
      color: theme.palette.text.primary,
      bgcolor: alpha(theme.palette.primary.main, 0.05),
      position: "relative",
    }),
    [theme],
  );

  const hamburgerAnimationStates = useMemo(() => {
    const baseStyle = {
      width: 20,
      height: 14,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
      "& span": {
        display: "block",
        width: "100%",
        height: "2px",
        bgcolor: "currentColor",
        borderRadius: "2px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "center",
      },
    };

    if (mobileOpen) {
      return {
        ...baseStyle,
        "& span:nth-of-type(1)": {
          transform: "translateY(6px) rotate(45deg)",
        },
        "& span:nth-of-type(2)": {
          opacity: 0,
          transform: "scale(0)",
        },
        "& span:nth-of-type(3)": {
          transform: "translateY(-6px) rotate(-45deg)",
        },
      };
    }

    return baseStyle;
  }, [mobileOpen]);

  const desktopNavComponent = useMemo(() => {
    if (!isMobile) {
      return <DesktopNav activePath={activePath} />;
    }
    return null;
  }, [isMobile, activePath]);

  const mobileNavComponent = useMemo(() => {
    if (isMobile) {
      return (
        <MobileNav
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          activePath={activePath}
        />
      );
    }
    return null;
  }, [isMobile, mobileOpen, activePath]);

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={appBarStyle}>
        <Container maxWidth="lg">
          <Toolbar sx={toolbarStyle}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ ...logoBoxStyle, position: "relative" }}>
                {/* Logo Loading Animation */}
                {!isLogoLoaded && (
                  <Fade in={!isLogoLoaded} timeout={300}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(theme.palette.background.paper, 0.7),
                        borderRadius: "12px",
                        zIndex: 1,
                      }}
                    >
                      <CircularProgress
                        size={20}
                        thickness={3}
                        sx={{
                          color: theme.palette.primary.main,
                          animation: "pulse 1.5s ease-in-out infinite",
                          "@keyframes pulse": {
                            "0%, 100%": { opacity: 1 },
                            "50%": { opacity: 0.5 },
                          },
                        }}
                      />
                    </Box>
                  </Fade>
                )}
                <Fade in={isLogoLoaded} timeout={500}>
                  <Box
                    component="img"
                    src={layout.brand.logoUrl}
                    alt={`${layout.brand.name} Logo`}
                    onLoad={() => setIsLogoLoaded(true)}
                    sx={{
                      ...logoImageStyle,
                      opacity: isLogoLoaded ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                </Fade>
              </Box>

              <Box component="span" sx={brandNameStyle}>
                {layout.brand.name}
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {desktopNavComponent}

            {isMobile && (
              <IconButton
                onClick={toggleMobileNav}
                sx={hamburgerIconButtonStyle}
              >
                <Box sx={hamburgerAnimationStates}>
                  <span />
                  <span />
                  <span />
                </Box>
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {mobileNavComponent}
    </>
  );
};
