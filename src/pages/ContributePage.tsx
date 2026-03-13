import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  alpha,
  Paper,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import {
  GitHub,
  Favorite,
  Launch,
  Code,
  Groups,
  Hub,
} from "@mui/icons-material";
import { Layout } from "@components/layout/Layout";
import { useTheme } from "@mui/material/styles";
import { contributors_page } from "@i18n";

export const ContributePage: React.FC = () => {
  const theme = useTheme();

  const DeveloperRow = ({ dev }: { dev: any }) => (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 5,
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          borderColor: alpha(dev.color, 0.3),
        },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems="center"
      >
        <Avatar
          src={dev.avatar}
          sx={{
            width: 70,
            height: 70,
            borderRadius: 3,
            border: `2px solid ${alpha(dev.color, 0.2)}`,
          }}
        />
        <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent={{ xs: "center", sm: "flex-start" }}
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={700}>
              {dev.name}
            </Typography>
            <IconButton size="small" href={dev.github} target="_blank">
              <Launch sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
          <Typography
            variant="caption"
            sx={{
              color: dev.color,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              display: "block",
              mb: 0.5,
            }}
          >
            {dev.role}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dev.description}
          </Typography>
        </Box>
        <Button
          variant="text"
          size="small"
          href={dev.github}
          target="_blank"
          startIcon={<GitHub />}
          sx={{ borderRadius: "50px", textTransform: "none", fontWeight: 600 }}
        >
          Profile
        </Button>
      </Stack>
    </Paper>
  );

  return (
    <Layout>
      <Box sx={{ py: { xs: 6, md: 10 }, minHeight: "100vh" }}>
        <Container maxWidth="md">
          {/* Header */}
          <Stack spacing={2} alignItems="center" sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                textAlign: "center",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                letterSpacing: "-0.03em",
              }}
            >
              {contributors_page.page_header.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", maxWidth: 600 }}
            >
              {contributors_page.page_header.description}
            </Typography>
          </Stack>

          {/* Section 1: Core Maintainers */}
          <Box sx={{ mb: 6 }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 3, px: 1 }}
            >
              <Groups color="primary" />
              <Typography variant="h5" fontWeight={700}>
                {contributors_page.sections.core.title}
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {contributors_page.coreTeam.map((dev, i) => (
                <DeveloperRow key={i} dev={dev} />
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 6, opacity: 0.5 }} />

          {/* Section 2: Upstream & Ecosystem */}
          <Box sx={{ mb: 8 }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 3, px: 1 }}
            >
              <Hub sx={{ color: theme.palette.secondary.main }} />
              <Typography variant="h5" fontWeight={700}>
                {contributors_page.sections.ecosystem.title}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, px: 1 }}
            >
              {contributors_page.sections.ecosystem.description}
            </Typography>
            <Stack spacing={2}>
              {contributors_page.ecosystemDevs.map((dev, i) => (
                <DeveloperRow key={i} dev={dev} />
              ))}
            </Stack>
          </Box>

          {/* Call to Action */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 6,
              textAlign: "center",
              backgroundColor: alpha(theme.palette.primary.main, 0.03),
              border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <Favorite
              sx={{ color: theme.palette.error.main, mb: 2, fontSize: 32 }}
            />
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {contributors_page.cta.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 450, mx: "auto" }}
            >
              {contributors_page.cta.description}
            </Typography>
            <Button
              variant="contained"
              disableElevation
              href={contributors_page.cta.repo_url}
              target="_blank"
              startIcon={<Code />}
              sx={{
                borderRadius: "50px",
                px: 4,
                py: 1.2,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              {contributors_page.cta.button_text}
            </Button>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};
