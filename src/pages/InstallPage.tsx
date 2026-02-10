import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  useTheme,
  alpha,
  Paper,
  Stack,
} from "@mui/material";
import {
  Apple,
  PhoneAndroid,
  Terminal,
  InstallMobile,
  Laptop,
} from "@mui/icons-material";
import { Layout } from "../components/layout/Layout";
import { RootedAndroid } from "../components/install/RootedAndroid";
import { NonRootedAndroid } from "../components/install/NonRootedAndroid";
import { BundleInjection } from "../components/install/BundleInjection";
import { PCSection } from "../components/install/PCSection";
import installData from "../json/install_page.json";

export const InstallPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const theme = useTheme();

  const deviceDetection = useMemo(() => {
    const userAgent = navigator.userAgent || (window as any).opera;

    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(userAgent);
    const isPC = /Win|Mac|Linux/i.test(userAgent) && !isAndroid && !isIOS;

    return { isIOS, isAndroid, isPC };
  }, []);

  useEffect(() => {
    const { isIOS, isAndroid, isPC } = deviceDetection;

    if (isIOS) {
      setActiveTab(2);
      setRecommendation(installData.tabs.ios.type);
    } else if (isAndroid) {
      setActiveTab(0);
      setRecommendation(installData.tabs.non_root.type);
    } else if (isPC) {
      setActiveTab(3);
      setRecommendation(installData.tabs.pc.type);
    }
  }, [deviceDetection]);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    [],
  );

  const getTabLabel = useCallback(
    (label: string, type: string) => {
      const isRec = recommendation === type;
      return (
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={0}
          sx={{
            width: "auto",
            minWidth: 0,
            px: 0.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              textTransform: "none",
              whiteSpace: "nowrap",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            {label}
          </Typography>
          {isRec && (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.6rem",
                fontWeight: 900,
                color: "primary.main",
                lineHeight: 1,
                mt: 0.2,
                letterSpacing: 0.5,
              }}
            >
              {installData.labels.recommended_badge}
            </Typography>
          )}
        </Stack>
      );
    },
    [recommendation],
  );

  const tabsConfig = useMemo(
    () => {
      const { isIOS, isAndroid } = deviceDetection;
      const isMobile = isIOS || isAndroid;
      
      return [
        {
          icon: <PhoneAndroid sx={{ fontSize: { xs: 20, sm: 24 } }} />,
          label: installData.tabs.non_root.label,
          type: installData.tabs.non_root.type,
        },
        {
          icon: <Terminal sx={{ fontSize: { xs: 20, sm: 24 } }} />,
          label: installData.tabs.root.label,
          type: installData.tabs.root.type,
        },
        {
          icon: <Apple sx={{ fontSize: { xs: 20, sm: 24 } }} />,
          label: installData.tabs.ios.label,
          type: installData.tabs.ios.type,
        },
        ...(isMobile ? [] : [{
          icon: <Laptop sx={{ fontSize: { xs: 20, sm: 24 } }} />,
          label: installData.tabs.pc.label,
          type: installData.tabs.pc.type,
        }]),
      ];
    },
    [deviceDetection],
  );

  const activeTabContent = useMemo(() => {
    switch (activeTab) {
      case 0:
        return (
          <NonRootedAndroid
            isRecommended={recommendation === installData.tabs.non_root.type}
          />
        );
      case 1:
        return <RootedAndroid />;
      case 2:
        return (
          <BundleInjection
            isRecommended={recommendation === installData.tabs.ios.type}
          />
        );
      case 3:
        return (
          <PCSection
            isRecommended={recommendation === installData.tabs.pc.type}
          />
        );
      default:
        return null;
    }
  }, [activeTab, recommendation]);

  return (
    <Layout>
      <Box
        sx={{
          py: { xs: 4, md: 8 },
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                display: "inline-flex",
              }}
            >
              <InstallMobile fontSize="large" />
            </Box>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{ textAlign: "center", fontSize: { xs: "2rem", md: "3rem" } }}
            >
              {installData.header.title}
            </Typography>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: 0.5,
              mb: 6,
              borderRadius: "100px",
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              centered
              slotProps={{
                indicator: { sx: { display: "none" } },
              }}
              sx={{
                minHeight: 64,
                "& .MuiTabs-flexContainer": {
                  alignItems: "center",
                },
                "& .MuiTab-root": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: { xs: 0.5, sm: 2 },
                  minWidth: 0,
                },
                "& .Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: "100px",
                  transition: "background-color 0.2s ease",
                },
              }}
            >
              {tabsConfig.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  iconPosition="start"
                  label={getTabLabel(tab.label, tab.type)}
                  sx={{
                    borderRadius: "100px",
                    minHeight: 64,
                  }}
                />
              ))}
            </Tabs>
          </Paper>

          <Box sx={{ width: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 6,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(8px)",
              }}
            >
              {activeTabContent}
            </Paper>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};
