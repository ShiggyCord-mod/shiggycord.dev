import React from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useTheme,
  Stack,
} from "@mui/material";
import { BugReport } from "@mui/icons-material";
import { build } from "@i18n";

export const LocalDevelopment: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 7,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <BugReport color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          3. Local Development
        </Typography>
      </Stack>

      <Stepper orientation="vertical" sx={{ ml: 1 }}>
        {build.localDevelopment.map((step, index) => (
          <Step key={index} active>
            <StepLabel>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontFamily: "monospace",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "pre-wrap",
                  minWidth: 0,
                }}
              >
                {step.desc}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
