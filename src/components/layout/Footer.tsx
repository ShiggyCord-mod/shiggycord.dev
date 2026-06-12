import React, { useMemo, memo } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  IconButton,
  Divider,
  alpha,
  useTheme,
  Button,
} from "@mui/material";
import { GitHub, Favorite, Security } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { layout } from "@i18n";

const DiscordIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.4,80.21a105.73,105.73,0,0,0,32.17,16.15,77.7,77.7,0,0,0,6.89-11.11,68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.72-27.31-4.74-51.13-19.5-72.14ZM42.45,65.69C36.18,65.69,31,60,31,53s5.12-12.67,11.41-12.67S54,46,53.86,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.12-12.67,11.44-12.67S96.23,46,96.11,53,91,65.69,84.69,65.69Z" />
  </svg>
));

DiscordIcon.displayName = "DiscordIcon";

const FooterSection = memo(({ section }: { section: any }) => (
  <Box>
    <Typography
      variant="overline"
      sx={{ fontWeight: 800, color: "primary.main" }}
    >
      {section.title}
    </Typography>
    <Stack spacing={1} sx={{ mt: 1.5 }}>
      {section.links.map((link: any) => (
        <Typography
          key={link.label}
          component={link.to ? Link : "a"}
          to={link.to}
          href={link.href}
          target={link.href ? "_blank" : undefined}
          variant="body2"
          sx={{
            textDecoration: "none",
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          {link.label}
        </Typography>
      ))}
    </Stack>
  </Box>
));

FooterSection.displayName = "FooterSection";

const SocialIconButton = memo(
  ({
    href,
    icon,
    bgColor,
    hoverColor,
    iconColor,
  }: {
    href: string;
    icon: React.ReactNode;
    bgColor: string;
    hoverColor: string;
    iconColor?: string;
  }) => (
    <IconButton
      component="a"
      href={href}
      target="_blank"
      sx={{
        bgcolor: bgColor,
        color: iconColor,
        "&:hover": {
          bgcolor: hoverColor,
        },
      }}
    >
      {icon}
    </IconButton>
  ),
);

SocialIconButton.displayName = "SocialIconButton";

export const Footer: React.FC = memo(() => {
  const theme = useTheme();

  const currentYear = new Date().getFullYear();

  const footerContainerStyle = useMemo(
    () => ({
      p: { xs: 4, md: 5 },
      borderRadius: "32px",
      bgcolor: alpha(theme.palette.background.paper, 0.6),
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      boxShadow: `0 -10px 40px ${alpha(theme.palette.common.black, 0.02)}`,
    }),
    [theme],
  );

  const footerSections = useMemo(
    () =>
      layout.footer.sections.map((section) => (
        <FooterSection key={section.title} section={section} />
      )),
    [layout.footer.sections],
  );

  const socialIcons = useMemo(
    () => [
      {
        key: "github",
        href: layout.links.github_page,
        icon: <GitHub fontSize="small" />,
        bgColor: alpha(theme.palette.text.primary, 0.05),
        hoverColor: alpha(theme.palette.primary.main, 0.1),
      },
      {
        key: "discord",
        href: layout.links.discord,
        icon: <DiscordIcon />,
        bgColor: alpha("#5865F2", 0.1),
        hoverColor: alpha("#5865F2", 0.2),
        iconColor: "#5865F2",
      },
    ],
    [layout.links.github_page, layout.links.discord, theme],
  );

  const footerMetadata = useMemo(
    () => ({
      copyright: `© ${currentYear} ${layout.brand.copyRight}`,
      affiliation: layout.brand.affiliation,
      madeWith: layout.footer.madeWith,
    }),
    [currentYear],
  );

  return (
    <Box
      component="footer"
      sx={{ pb: 6, pt: 2, mt: "auto", position: "relative" }}
    >
      <Container maxWidth="lg">
        <Box sx={footerContainerStyle}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", md: "flex-start" }}
            spacing={4}
          >
            <Box
              sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: 300 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, mb: 1, color: "text.primary" }}
              >
                {layout.brand.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {layout.brand.description}
              </Typography>

              <Stack
                direction="row"
                spacing={1.5}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                {socialIcons.map((social) => (
                  <SocialIconButton
                    key={social.key}
                    href={social.href}
                    icon={social.icon}
                    bgColor={social.bgColor}
                    hoverColor={social.hoverColor}
                    iconColor={social.iconColor}
                  />
                ))}
              </Stack>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 3, sm: 6 }}
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              {footerSections}
            </Stack>
          </Stack>

          <Divider sx={{ my: 4, opacity: 0.5 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", sm: "flex-end" }}
            spacing={3}
          >
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ display: "block", fontWeight: 600, mb: 0.5 }}
              >
                {footerMetadata.copyright}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha(theme.palette.text.disabled, 0.6),
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  display: "block",
                  mb: 1,
                }}
              >
                {footerMetadata.affiliation}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Typography
                  variant="caption"
                  color="text.disabled"
                  fontWeight={600}
                >
                  Made with
                </Typography>
                <Favorite
                  sx={{ fontSize: 14, color: theme.palette.error.main }}
                />
                <Typography
                  variant="caption"
                  color="text.disabled"
                  fontWeight={600}
                >
                  {footerMetadata.madeWith}
                </Typography>
              </Stack>
            </Box>

            <Button
              component={Link}
              to="/privacy"
              variant="contained"
              disableElevation
              startIcon={<Security sx={{ fontSize: "1.1rem !important" }} />}
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                color: theme.palette.primary.main,
                fontWeight: 700,
                borderRadius: "100px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                },
              })}
            >
              Privacy Policy
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
});

Footer.displayName = "Footer";
