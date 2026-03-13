import React from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Fade,
  alpha,
  useTheme,
} from "@mui/material";
import { Lock, Storage, Security } from "@mui/icons-material";
import { Layout } from "@components/layout/Layout";
import { privacypolicy_page } from "@i18n";

const IconMap: { [key: string]: any } = {
  Lock: Lock,
  Storage: Storage,
  Security: Security,
};

const PolicySection = ({ title, icon: Icon, children }: any) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 6 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
        <Icon color="primary" sx={{ fontSize: 28 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Stack>
      <Box
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          bgcolor: alpha(theme.palette.divider, 0.03),
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const { header, sections, footer } = privacypolicy_page;

  return (
    <Layout>
      <Box sx={{ py: { xs: 4, md: 10 }, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          <Fade in timeout={600}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
                {header.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {header.last_updated_prefix}
                {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Fade>

          {sections.map((section) => (
            <PolicySection
              key={section.id}
              title={section.title}
              icon={IconMap[section.icon]}
            >
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {section.content}
              </Typography>
            </PolicySection>
          ))}

          <Box
            sx={{
              mt: 8,
              p: 4,
              borderRadius: 6,
              bgcolor: alpha("#5865F2", 0.05),
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              {footer.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {footer.text}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};
