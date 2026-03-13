import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  keyframes,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Layout } from "@components/layout/Layout";
import { notfound_page } from "@i18n";

// Gentle bobbing animation for Shiggy
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

export const NotFoundPage: React.FC = () => {
  const theme = useTheme();
  const { image, content, actions } = notfound_page;

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: { xs: 8, md: 12 },
        }}
      >
        <Stack spacing={4} alignItems="center">
          {/* Shiggy Icon */}
          <Box
            component="img"
            src={image.url}
            alt={image.alt}
            sx={{
              width: { xs: 180, md: 260 },
              height: "auto",
              animation: `${float} 3s ease-in-out infinite`,
            }}
          />

          <Stack spacing={2}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: theme.palette.text.primary,
                letterSpacing: "-0.02em",
              }}
            >
              {content.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                fontWeight: 400,
              }}
            >
              {content.subtitle}
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={Link}
              to={actions.home.path}
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "999px",
                fontWeight: 800,
                textTransform: "none",
              }}
            >
              {actions.home.label}
            </Button>

            <Button
              component={Link}
              to={actions.faq.path}
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "999px",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              {actions.faq.label}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;
