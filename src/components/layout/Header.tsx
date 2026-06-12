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
          <Toolbar
            sx={(theme) => ({
              minHeight: 64,
              px: { xs: 2, sm: 3 },
              backgroundColor: "background.paper",
              borderRadius: isMobile ? "0 0 24px 24px" : "24px",
              border: `1px solid ${theme.palette.divider}`,
              borderColor: alpha(theme.palette.divider, 0.1),
              boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.05)}`,
            })}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  position: "relative",
                })}
              >
                {!isLogoLoaded && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={(theme) => ({
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `2px solid ${theme.palette.primary.main}`,
                        borderTopColor: "transparent",
                        animation: "spin 0.8s linear infinite",
                        "@keyframes spin": {
                          to: { transform: "rotate(360deg)" },
                        },
                      })}
                    />
                  </Box>
                )}
                <Box
                  component="img"
                  src={layout.brand.logoUrl}
                  alt={`${layout.brand.name} Logo`}
                  onLoad={() => setIsLogoLoaded(true)}
                  sx={{
                    width: "85%",
                    height: "85%",
                    objectFit: "contain",
                    opacity: isLogoLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </Box>

              <Box
                component="span"
                sx={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em" }}
              >
                {layout.brand.name}
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {desktopNavComponent}

            {isMobile && (
              <IconButton
                onClick={toggleMobileNav}
                sx={(theme) => ({
                  width: 44,
                  height: 44,
                  color: theme.palette.text.primary,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  position: "relative",
                })}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 14,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "& span": {
                      display: "block",
                      width: "100%",
                      height: "2px",
                      bgcolor: "currentColor",
                      borderRadius: "2px",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transformOrigin: "center",
                    },
                    ...(mobileOpen
                      ? {
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
                        }
                      : {}),
                  }}
                >
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
