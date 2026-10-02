import { cn } from "cn";

import { Card } from "../ui/card.jsx";

// Komponent för dashboard korten
function DashboardCard({ children, className = "" }) {
  return (
    <Card className={cn("dashboard-card gap-0 p-4 sm:p-6", className)}>
      {children}
    </Card>
  );
}

export default DashboardCard;
