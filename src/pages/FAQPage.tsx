import React, { useMemo, memo } from "react";
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
  useTheme,
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

const FAQSection = memo(({ title, icon: Icon, children }: any) => {
  const theme = useTheme();

  const sectionTitleStyle = useMemo(
    () => ({
      fontWeight: 700,
    }),
    [],
  );

  const sectionContainerStyle = useMemo(
    () => ({
      borderRadius: 6,
      overflow: "hidden",
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    }),
    [theme],
  );

  return (
    <Box sx={{ mb: 6 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ mb: 3, px: 2 }}
      >
        <Icon color="primary" />
        <Typography variant="h5" sx={sectionTitleStyle}>
          {title}
        </Typography>
      </Stack>
      <Box sx={sectionContainerStyle}>{children}</Box>
    </Box>
  );
});

FAQSection.displayName = "FAQSection";

const FaqItem = memo(
  ({ question, answer }: { question: string; answer: React.ReactNode }) => {
    const theme = useTheme();

    const accordionStyle = useMemo(
      () => ({
        bgcolor: "background.paper",
        "&:not(:last-child)": {
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
        },
        "&:before": { display: "none" },
      }),
      [theme],
    );

    const answerTextStyle = useMemo(
      () => ({
        lineHeight: 1.6,
      }),
      [],
    );

    return (
      <Accordion disableGutters elevation={0} sx={accordionStyle}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: 600 }}>{question}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={answerTextStyle}
          >
            {answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  },
);

FaqItem.displayName = "FaqItem";

export const FAQPage: React.FC = memo(() => {
  const theme = useTheme();
  const { sections, header } = faq_page;
  const inst = sections.installation.questions;

  const headerTitleStyle = useMemo(
    () => ({
      fontWeight: 800,
      mb: 2,
      letterSpacing: "-0.03em",
    }),
    [],
  );

  const headerSubtitleStyle = useMemo(
    () => ({
      color: "text.secondary",
      fontWeight: 400,
    }),
    [],
  );

  const linkStyle = useMemo(
    () => ({
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    }),
    [theme.palette.primary.main],
  );

  const installationFaq = useMemo(
    () => (
      <>
        <FaqItem
          question={inst.install.question}
          answer={
            <>
              {inst.install.intro}
              <ul>
                <li>
                  <b>{inst.install.non_rooted_label}</b>{" "}
                  {inst.install.non_rooted_text}
                  <a href={inst.install.manager_url} style={linkStyle}>
                    {inst.install.non_rooted_link_text}
                  </a>
                  {inst.install.non_rooted_suffix}
                </li>
                <li>
                  <b>{inst.install.rooted_label}</b> {inst.install.rooted_text}
                  <a href={inst.install.xposed_url} style={linkStyle}>
                    {inst.install.rooted_link_text}
                  </a>
                  {inst.install.rooted_suffix}
                </li>
              </ul>
              <i>{inst.install.ios_note}</i>
            </>
          }
        />
        <FaqItem
          question={inst.version.question}
          answer={inst.version.answer}
        />
        <FaqItem
          question={inst.rooting.question}
          answer={
            <>
              {inst.rooting.answer_prefix}
              <a
                href={inst.rooting.link_url}
                style={linkStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inst.rooting.link_label}
              </a>
              {inst.rooting.answer_suffix}
            </>
          }
        />
      </>
    ),
    [inst, linkStyle],
  );

  const aboutFaqItems = useMemo(
    () =>
      sections.about.questions.map((item, index) => (
        <FaqItem key={index} question={item.question} answer={item.answer} />
      )),
    [sections.about.questions],
  );

  const legalFaqItem = useMemo(
    () => (
      <FaqItem
        question={sections.legal.question}
        answer={sections.legal.answer}
      />
    ),
    [sections.legal.question, sections.legal.answer],
  );

  const otherFaqItem = useMemo(
    () => (
      <FaqItem
        question={sections.other.question}
        answer={
          <>
            {sections.other.answer_body}
            <br />
            <br />
            <i>{sections.other.note}</i>
          </>
        }
      />
    ),
    [sections.other.question, sections.other.answer_body, sections.other.note],
  );

  const pageHeader = useMemo(
    () => (
      <Fade in timeout={600}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" sx={headerTitleStyle}>
            {header.title}
          </Typography>
          <Typography variant="h5" sx={headerSubtitleStyle}>
            {header.subtitle}
          </Typography>
        </Box>
      </Fade>
    ),
    [header.title, header.subtitle, headerTitleStyle, headerSubtitleStyle],
  );

  return (
    <Layout>
      <Box sx={{ py: { xs: 4, md: 10 }, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          {pageHeader}

          {/* Installation & Compatibility */}
          <FAQSection title={sections.installation.title} icon={InstallMobile}>
            {installationFaq}
          </FAQSection>

          {/* About */}
          <FAQSection title={sections.about.title} icon={Info}>
            {aboutFaqItems}
          </FAQSection>

          {/* Legal */}
          <FAQSection title={sections.legal.title} icon={Shield}>
            {legalFaqItem}
          </FAQSection>

          {/* Other */}
          <FAQSection title={sections.other.title} icon={Build}>
            {otherFaqItem}
          </FAQSection>
        </Container>
      </Box>
    </Layout>
  );
});

FAQPage.displayName = "FAQPage";
