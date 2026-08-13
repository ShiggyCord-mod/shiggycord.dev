import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  alpha,
  Stack,
  useTheme,
  CircularProgress,
  Fade,
  SxProps,
  Theme,
} from "@mui/material";
import { Download, Security, Speed, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Layout } from "@components/layout/Layout";
import { home_page } from "@i18n";

interface ScreenshotCardProps {
  url: string;
  title: string;
  icon: React.ElementType;
  sx?: SxProps<Theme> | any;
}

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.4,80.21a105.73,105.73,0,0,0,32.17,16.15,77.7,77.7,0,0,0,6.89-11.11,68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.72-27.31-4.74-51.13-19.5-72.14ZM42.45,65.69C36.18,65.69,31,60,31,53s5.12-12.67,11.41-12.67S54,46,53.86,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.12-12.67,11.44-12.67S96.23,46,96.11,53,91,65.69,84.69,65.69Z" />
  </svg>
);

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({ url, title, icon: Icon, sx }) => {
  const [active, setActive] = React.useState(false);
  return (
    <Box
      tabIndex={0}
      onClick={() => setActive((a) => !a)}
      onKeyDown={(e: React.KeyboardEvent) => {
        const key = (e as any).key;
        if (key === "Enter" || key === " ") {
          e.preventDefault();
          setActive((a) => !a);
        }
      }}
      onBlur={() => setActive(false)}
      className={active ? "active" : undefined}
      sx={{
        width: "100%",
        maxWidth: "220px",
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative",
        // ensure the hovered/focused/active card appears above others
        "&:hover, &:focus, &.active": {
          zIndex: 9999,
          "& .screenshot-inner": {
            transform: "translateY(-20px) scale(1.08)",
            zIndex: 9999,
          },
          "& .card-label": {
            borderColor: "primary.main",
            bgcolor: "background.paper",
          },
        },
        ...sx,
      }}
    >
      <Box
        className="screenshot-inner"
        sx={{
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      <Box
        className="card-label"
        sx={(theme) => ({
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
          px: 2,
          py: 0.8,
          borderRadius: "20px",
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: "border-color 0.3s ease, background-color 0.3s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        })}
      >
        <Icon sx={{ color: "primary.main", fontSize: 14 }} />
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: "0.05em",
            color: "text.primary",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        component="img"
        src={url}
        alt={title}
        sx={(theme) => ({
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: "16px",
          border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.4)",
        })}
      />
    </Box>
  </Box>
  );
};

ScreenshotCard.displayName = "ScreenshotCard";

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const { hero, showcase } = home_page;

  // State for logo loading
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  // Memoized screenshot cards data
  const screenshotCards = useMemo(
    () => [
      {
        title: showcase.cards[0].title,
        url: showcase.cards[0].url,
        icon: Speed,
        sx: {
          transform: {
            xs: "translateX(-45px) translateY(-30px) rotate(-12deg) scale(0.9)",
            md: "translateX(-180px) translateY(-20px) rotate(-12deg)",
          },
          zIndex: 1,
        },
      },
      {
        title: showcase.cards[1].title,
        url: showcase.cards[1].url,
        icon: Settings,
        sx: {
          transform: {
            xs: "translateX(45px) translateY(30px) rotate(12deg) scale(0.9)",
            md: "translateX(180px) translateY(20px) rotate(12deg)",
          },
          zIndex: 2,
        },
      },
      {
        title: showcase.cards[2].title,
        url: showcase.cards[2].url,
        icon: Security,
        sx: {
          zIndex: 3,
          transform: { xs: "scale(1.1)", md: "scale(1.25)" },
        },
      },
    ],
    [showcase.cards],
  );

  return (
    <Layout hasHero>
      <Box sx={{ overflowX: "hidden" }}>
        {/* Hero Section */}
        <Box sx={{ pt: { xs: 8, md: 12 }, pb: 2, textAlign: "center" }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                width: { xs: 180, md: 240 },
                height: { xs: 180, md: 240 },
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 6,
                position: "relative",
              }}
            >
              {/* Logo Loading Animation */}
              {!isLogoLoaded && (
                <Fade in={!isLogoLoaded} timeout={500}>
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
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                  >
                    <CircularProgress
                      size={60}
                      thickness={4}
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

              {/* Logo Image with Fade-in Animation */}
              <Fade in={isLogoLoaded} timeout={800}>
                <Box
                  component="img"
                  src={hero.branding.logo_url}
                  alt={`${hero.branding.title} Large Logo`}
                  onLoad={() => setIsLogoLoaded(true)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "opacity 0.5s ease",
                    opacity: isLogoLoaded ? 1 : 0,
                  }}
                />
              </Fade>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.8rem", md: "5rem" },
                fontWeight: 900,
                letterSpacing: "-0.04em",
                mb: 2,
              }}
            >
              {hero.branding.title}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                maxWidth: "750px",
                margin: "0 auto 48px",
                color: "text.secondary",
                fontWeight: 500,
                lineHeight: 1.6,
                fontSize: { xs: "1.15rem", md: "1.5rem" },
              }}
            >
              {hero.branding.description_main}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                {hero.branding.description_highlight}
              </Box>
              {hero.branding.description_suffix}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2.5}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                component={Link}
                to={hero.buttons.get_started.path}
                variant="contained"
                size="large"
                startIcon={<Download />}
                sx={{
                  px: 6,
                  py: 2.2,
                  borderRadius: "100px",
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  textTransform: "none",
                  boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                {hero.buttons.get_started.text}
              </Button>
              <Button
                component="a"
                href={hero.buttons.discord.url}
                target="_blank"
                variant="outlined"
                size="large"
                startIcon={<DiscordIcon />}
                sx={{
                  px: 6,
                  py: 2.2,
                  borderRadius: "100px",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  textTransform: "none",
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: "#5865F2",
                  bgcolor: alpha("#5865F2", 0.03),
                  "&:hover": {
                    borderColor: "#5865F2",
                    bgcolor: alpha("#5865F2", 0.08),
                  },
                }}
              >
                {hero.buttons.discord.text}
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Showcase Section */}
        <Container maxWidth="md" sx={{ mt: { xs: 20, md: 25 }, pb: 20 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr",
              justifyItems: "center",
              alignItems: "center",
              "& > *": { gridArea: "1 / 1 / 2 / 2" },
            }}
          >
            {screenshotCards.map((card, index) => (
              <ScreenshotCard
                key={index}
                title={card.title}
                url={card.url}
                icon={card.icon}
                sx={card.sx}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};
