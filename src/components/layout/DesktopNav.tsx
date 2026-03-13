import React, { useMemo } from "react";
import { Box, Button, useTheme, alpha, Tooltip } from "@mui/material";
import { GitHub, Launch } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { layout } from "@i18n";

interface DesktopNavProps {
  activePath: string;
}

const NavButton = React.memo(
  ({ link, isActive, theme }: { link: any; isActive: boolean; theme: any }) => {
    const buttonStyle = useMemo(
      () => ({
        fontWeight: isActive ? 800 : 600,
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
        px: 2.5,
        borderRadius: "100px",
        textTransform: "none" as const,
        position: "relative" as const,
        transition: "all 0.2s ease-in-out",

        "&:hover": {
          color: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
        },

        // The indicator bar
        "&::after": {
          layout: '""',
          position: "absolute" as const,
          bottom: 6,
          left: "50%",
          width: "16px",
          height: "3px",
          borderRadius: "2px",
          bgcolor: "primary.main",
          transform: isActive
            ? "translateX(-50%) scaleY(1)"
            : "translateX(-50%) scaleY(0)",
          opacity: isActive ? 1 : 0,
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        },

        "&:hover::after": {
          transform: "translateX(-50%) scaleY(1)",
          opacity: isActive ? 1 : 0.5,
        },
      }),
      [isActive, theme],
    );

    return (
      <Button component={Link} to={link.href} variant="text" sx={buttonStyle}>
        {link.text}
      </Button>
    );
  },
);

NavButton.displayName = "NavButton";

export const DesktopNav: React.FC<DesktopNavProps> = React.memo(
  ({ activePath }) => {
    const theme = useTheme();

    const containerStyle = useMemo(
      () => ({
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        p: 0.5,
        borderRadius: "100px",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backdropFilter: "blur(8px)",
      }),
      [theme],
    );

    const dividerStyle = useMemo(
      () => ({
        width: "1px",
        height: "24px",
        bgcolor: alpha(theme.palette.divider, 0.2),
        mx: 1,
      }),
      [theme],
    );

    const githubButtonStyle = useMemo(
      () => ({
        borderRadius: "100px",
        textTransform: "none" as const,
        bgcolor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.primary.main,
        fontWeight: 600,
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: theme.palette.primary.main,
          color: "white",
          transform: "translateY(-1px)",
        },
      }),
      [theme],
    );

    // Memoized GitHub button icon styles
    const githubIconStyle = useMemo(
      () => ({
        fontSize: "1.1rem !important" as const,
      }),
      [],
    );

    const launchIconStyle = useMemo(
      () => ({
        fontSize: "0.8rem !important" as const,
        opacity: 0.7,
      }),
      [],
    );

    // Memoized navigation buttons to prevent re-rendering when activePath doesn't change
    const navigationButtons = useMemo(
      () =>
        layout.navigation.map((link) => {
          const isActive = activePath === link.href;
          return (
            <NavButton
              key={link.href}
              link={link}
              isActive={isActive}
              theme={theme}
            />
          );
        }),
      [activePath, theme, layout.navigation],
    );

    // Memoized GitHub button component
    const githubButton = useMemo(
      () => (
        <Tooltip title={layout.brand.github_button_text} arrow>
          <Button
            component="a"
            href={layout.links.github_project}
            target="_blank"
            variant="contained"
            disableElevation
            startIcon={<GitHub sx={githubIconStyle} />}
            endIcon={<Launch sx={launchIconStyle} />}
            sx={githubButtonStyle}
          >
            {layout.brand.github_button_text}
          </Button>
        </Tooltip>
      ),
      [
        layout.brand.github_button_text,
        layout.links.github_project,
        githubButtonStyle,
        githubIconStyle,
        launchIconStyle,
      ],
    );

    return (
      <Box sx={containerStyle}>
        <Box sx={{ display: "flex", gap: 0.5 }}>{navigationButtons}</Box>

        <Box sx={dividerStyle} />

        {githubButton}
      </Box>
    );
  },
);

DesktopNav.displayName = "DesktopNav";
