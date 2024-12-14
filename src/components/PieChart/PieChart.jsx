import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PieChart } from "@mui/x-charts/PieChart";

export default function CustomPieChart() {
  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setItemNb(newValue);
  };
  const handleRadius = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setRadius(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <PieChart
        height={300}
        series={[
          {
            data: [
              {
                name: "Dao van",
                value: 80,
              },
              {
                name: "Khong dao van",
                value: 20,
              },
            ],
            innerRadius: radius,
            arcLabel: (params) => params.label ?? "",
            arcLabelMinAngle: 20,
          },
        ]}
        skipAnimation={skipAnimation}
      />
    </Box>
  );
}
