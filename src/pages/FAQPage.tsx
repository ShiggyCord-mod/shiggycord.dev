import React, { memo } from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Fade,
  alpha,
} from "@mui/material";
import {
  ExpandMore,
  InstallMobile,
  Shield,
  Info,
  Build,
} from "@mui/icons-material";
import { Layout } from "@components/layout/Layout";
import { faq_page } from "@i18n";

const FAQSection = memo(
  ({ title, icon: Icon, children }: any) => (
    <Box sx={{ mb: 6 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ mb: 3, px: 2 }}
      >
        <Icon color="primary" />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Stack>
      <Box
        sx={(theme) => ({
          borderRadius: 6,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        })}
      >
        {children}
      </Box>
    </Box>
  ),
);

FAQSection.displayName = "FAQSection";

const FaqItem = memo(
  ({
    question,
    answer,
  }: {
    question: string;
    answer: string;
  }) => (
    <Accordion
      disableGutters
      elevation={0}
      sx={(theme) => ({
        bgcolor: "background.paper",
        "&:not(:last-child)": {
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
        },
        "&:before": { display: "none" },
      })}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ fontWeight: 600 }}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.6, "& a": { color: "primary.main" }, "& blockquote": { borderLeft: 4, borderColor: "primary.main", pl: 2, ml: 0, my: 1, fontStyle: "italic" }, "& ul": { pl: 2.5 }, "& li": { mb: 0.5 } }}
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </AccordionDetails>
    </Accordion>
  ),
);

FaqItem.displayName = "FaqItem";

export const FAQPage: React.FC = memo(() => {
  const { sections, header } = faq_page;

  return (
    <Layout>
      <Box sx={{ py: { xs: 4, md: 10 }, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          <Fade in timeout={600}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.03em" }}
              >
                {header.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "text.secondary", fontWeight: 400 }}
              >
                {header.subtitle}
              </Typography>
            </Box>
          </Fade>

          <FAQSection title={sections.installation.title} icon={InstallMobile}>
            {sections.installation.questions.map((item: any, i: number) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </FAQSection>

          <FAQSection title={sections.about.title} icon={Info}>
            {sections.about.questions.map((item: any, i: number) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </FAQSection>

          <FAQSection title={sections.legal.title} icon={Shield}>
            {sections.legal.questions.map((item: any, i: number) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </FAQSection>

          <FAQSection title={sections.other.title} icon={Build}>
            {sections.other.questions.map((item: any, i: number) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </FAQSection>
        </Container>
      </Box>
    </Layout>
  );
});

FAQPage.displayName = "FAQPage";