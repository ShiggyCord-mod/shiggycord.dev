import React, { useCallback } from "react";
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

const drawerPaperSx = {
  width: "100%",
  borderRadius: "0 0 32px 32px",
  pt: 10,
  pb: 4,
};

const listItemSx = {
  borderRadius: "16px",
  mb: 0.5,
  mx: 1,
  py: 1.8,
};

const headerSx = {
  px: 2,
  fontWeight: 800,
  color: "primary.main",
  opacity: 0.6,
};

const dividerSx = {
  mb: 3,
  opacity: 0.5,
};

const githubButtonSx = {
  py: 1.8,
  borderRadius: "100px",
  textTransform: "none" as const,
  fontWeight: 700,
};

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  activePath: string;
}

const NavListItem = React.memo(
  ({
    link,
    activePath,
    onClose,
  }: {
    link: any;
    activePath: string;
    onClose: () => void;
  }) => {
    const isActive = activePath === link.href;
    const handleClick = useCallback(() => onClose(), [onClose]);

    return (
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to={link.href}
          selected={isActive}
          onClick={handleClick}
          sx={listItemSx}
        >
          <ListItemIcon sx={{ minWidth: 44 }}>
            {iconMap[link.text] || <Home />}
          </ListItemIcon>
          <ListItemText
            primary={link.text}
            slotProps={{
              primary: {
                fontWeight: isActive ? 800 : 600,
              },
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

    const navigationItems = layout.navigation.map((link) => (
      <NavListItem
        key={link.href}
        link={link}
        activePath={activePath}
        onClose={onClose}
      />
    ));

    const githubButton = (
      <Button
        component="a"
        href={layout.links.github_project}
        target="_blank"
        variant="contained"
        fullWidth
        disableElevation
        startIcon={<GitHub />}
        sx={githubButtonSx}
      >
        {layout.brand.github_tooltip_text}
      </Button>
    );

    const handleClose = useCallback(() => onClose(), [onClose]);

    return (
      <Drawer
        anchor="top"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              ...drawerPaperSx,
              backgroundColor: theme.palette.background.paper,
            },
          },
        }}
      >
        <Box sx={{ px: 2 }}>
          <Typography variant="overline" sx={headerSx}>
            Navigation
          </Typography>
          <List sx={{ mt: 1 }}>{navigationItems}</List>
        </Box>

        <Box sx={{ px: 4, mt: 2 }}>
          <Divider sx={dividerSx} />
          {githubButton}
        </Box>
      </Drawer>
    );
  },
);

MobileNav.displayName = "MobileNav";
