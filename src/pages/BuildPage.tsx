import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Fade,
  useTheme,
  SvgIcon,
  alpha,
} from "@mui/material";
import { Rocket, Download, BugReport } from "@mui/icons-material";
import { Layout } from "@components/layout/Layout";
import { Prerequisites } from "@components/build/Prerequisites";
import { BuildSteps } from "@components/build/BuildSteps";
import { LocalDevelopment } from "@components/build/LocalDevelopment";
import { build_page } from "@i18n";

const DiscordIcon = (props: any) => (
  <SvgIcon
    {...props}
    viewBox="0 0 127.14 96.36"
    sx={{
      ...props.sx,
      display: "inline-block",
      verticalAlign: "middle",
    }}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.4,80.21a105.73,105.73,0,0,0,32.17,16.15,77.7,77.7,0,0,0,6.89-11.11,68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.72-27.31-4.74-51.13-19.5-72.14ZM42.45,65.69C36.18,65.69,31,60,31,53s5.12-12.67,11.41-12.67S54,46,53.86,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.12-12.67,11.44-12.67S96.23,46,96.11,53,91,65.69,84.69,65.69Z" />
  </SvgIcon>
);

export const BuildPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box sx={{ py: { xs: 4, md: 10 }, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          <Fade in timeout={600}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  mb: 3,
                  letterSpacing: "-0.03em",
                }}
              >
                {build_page.hero_section.heading}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  mb: 5,
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                {build_page.hero_section.subheading}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Rocket />}
                  href="#start"
                  sx={{
                    borderRadius: "100px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                  }}
                >
                  {build_page.hero_section.buttons.get_started}
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Download />}
                  href={build_page.external_links.releases}
                  sx={{
                    borderRadius: "100px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    bgcolor: alpha(theme.palette.secondary.main, 0.12),
                    color: theme.palette.secondary.main,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.secondary.main, 0.2),
                      boxShadow: "none",
                    },
                  }}
                >
                  {build_page.hero_section.buttons.download_prebuilt}
                </Button>
              </Stack>
            </Box>
          </Fade>

          <Stack spacing={4} id="start">
            <Prerequisites />
            <BuildSteps />
            <LocalDevelopment />

            <Box sx={{ pt: 4, textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ mb: 3, fontWeight: 700, opacity: 0.8 }}
              >
                {build_page.resources_support.heading}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  fullWidth
                  startIcon={
                    <DiscordIcon sx={{ fontSize: "1.4rem !important" }} />
                  }
                  variant="contained"
                  href={build_page.external_links.discord_invite}
                  sx={{
                    borderRadius: "100px",
                    bgcolor: "#5865F2",
                    "&:hover": { bgcolor: "#4752C4" },
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.2,
                  }}
                >
                  {build_page.resources_support.buttons.join_discord}
                </Button>
                <Button
                  fullWidth
                  startIcon={<BugReport />}
                  variant="outlined"
                  href={build_page.external_links.github_issues}
                  sx={{ borderRadius: "100px", textTransform: "none", py: 1.2 }}
                >
                  {build_page.resources_support.buttons.report_issue}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};
