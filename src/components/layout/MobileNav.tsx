import React, { useMemo, useCallback } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useTheme,
  alpha,
  Button,
  Typography,
} from "@mui/material";
import {
  GitHub,
  Home,
  Download,
  Build,
  People,
  HelpOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { layout } from "@i18n";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home />,
  Install: <Download />,
  Build: <Build />,
  FAQ: <HelpOutline />,
  Contributors: <People />,
};

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  activePath: string;
}

const NavListItem = React.memo(
  ({
    link,
    index,
    open,
    activePath,
    onClose,
  }: {
    link: any;
    index: number;
    open: boolean;
    activePath: string;
    onClose: () => void;
  }) => {
    const isActive = activePath === link.href;

    const listItemStyle = useMemo(
      () => ({
        animation: open
          ? `dropIn 0.4s ease-out forwards ${index * 0.05}s`
          : "none",
        opacity: 0,
        transform: "translateY(-10px)",
        "@keyframes dropIn": {
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }),
      [open, index],
    );

    const handleClick = useCallback(() => {
      onClose();
    }, [onClose]);

    return (
      <ListItem key={link.href} disablePadding sx={listItemStyle}>
        <ListItemButton
          component={Link}
          to={link.href}
          selected={isActive}
          onClick={handleClick}
          sx={{ borderRadius: "16px", mb: 0.5, mx: 1, py: 1.8 }}
        >
          <ListItemIcon sx={{ minWidth: 44 }}>
            {iconMap[link.text] || <Home />}
          </ListItemIcon>
          <ListItemText
            primary={link.text}
            slotProps={{
              primary: {
                fontWeight: isActive ? 800 : 600,
              }
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  },
);

NavListItem.displayName = "NavListItem";

export const MobileNav: React.FC<MobileNavProps> = React.memo(
  ({ open, onClose, activePath }) => {
    const theme = useTheme();

    // Memoized Drawer PaperProps style
    const drawerPaperProps = useMemo(
      () => ({
        sx: {
          width: "100%",
          backgroundColor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: "blur(16px)",
          borderRadius: "0 0 32px 32px",
          pt: 10,
          pb: 4,
        },
      }),
      [theme],
    );

    const navigationItems = useMemo(
      () =>
        layout.navigation.map((link, index) => (
          <NavListItem
            key={link.href}
            link={link}
            index={index}
            open={open}
            activePath={activePath}
            onClose={onClose}
          />
        )),
      [layout.navigation, open, activePath, onClose],
    );

    const githubButtonStyle = useMemo(
      () => ({
        py: 1.8,
        borderRadius: "100px",
        textTransform: "none" as const,
        fontWeight: 700,
      }),
      [],
    );

    const headerStyle = useMemo(
      () => ({
        px: 2,
        fontWeight: 800,
        color: "primary.main",
        opacity: 0.6,
      }),
      [],
    );

    const dividerStyle = useMemo(
      () => ({
        mb: 3,
        opacity: 0.5,
      }),
      [],
    );

    const githubButton = useMemo(
      () => (
        <Button
          component="a"
          href={layout.links.github_project}
          target="_blank"
          variant="contained"
          fullWidth
          disableElevation
          startIcon={<GitHub />}
          sx={githubButtonStyle}
        >
          {layout.brand.github_tooltip_text}
        </Button>
      ),
      [
        layout.links.github_project,
        layout.brand.github_tooltip_text,
        githubButtonStyle,
      ],
    );

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    return (
      <Drawer
        anchor="top"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: drawerPaperProps
        }}
      >
        <Box sx={{ px: 2 }}>
          <Typography variant="overline" sx={headerStyle}>
            Navigation
          </Typography>
          <List sx={{ mt: 1 }}>{navigationItems}</List>
        </Box>

        <Box sx={{ px: 4, mt: 2 }}>
          <Divider sx={dividerStyle} />
          {githubButton}
        </Box>
      </Drawer>
    );
  },
);

MobileNav.displayName = "MobileNav";
