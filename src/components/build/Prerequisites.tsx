import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import { InfoOutlined, Terminal, GitHub, Settings } from "@mui/icons-material";
import { build } from "@i18n";

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal />,
  GitHub: <GitHub />,
  Settings: <Settings />,
  InfoOutlined: <InfoOutlined />,
};

export const Prerequisites: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 7,
        bgcolor: alpha(theme.palette.divider, 0.05),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, px: 1 }}>
        1. Prerequisites
      </Typography>
      <List disablePadding>
        {build.prerequisites.map((item, i) => (
          <ListItem
            key={i}
            sx={{
              mb: 1,
              bgcolor: "background.paper",
              borderRadius: 4,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <ListItemIcon
              sx={{ color: item.important ? "primary.main" : "text.disabled" }}
            >
              {iconMap[item.icon]}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
              }
              secondary={item.sub}
            />
            <Chip
              label={item.important ? "Required" : "Optional"}
              size="small"
              color={item.important ? "primary" : "default"}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
