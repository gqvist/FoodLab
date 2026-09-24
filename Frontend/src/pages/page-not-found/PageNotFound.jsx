import "./PageNotFound.css";

import TopNav from "../../components/top-nav/TopNav";
import DashboardCard from "@/components/dashboard-card/DashBoardCard";
import BackLink from "@/components/back-link/BackLink";
import grubPlannerLogo from "../../assets/logos/GrubPlanner.svg";

function PageNotFound() {
  return (
    <>
      <TopNav />

      <main className="page-not-found">
        <div className="page-not-found-container">
          <DashboardCard className="page-not-found-card">
            <h1 aria-label="404">
              <span className="left-4" aria-hidden="true">
                4
              </span>
              <img src={grubPlannerLogo} alt="" aria-hidden="true" />
              <span className="right-4" aria-hidden="true">
                4
              </span>
            </h1>
            <p>Här ska du inte vara hörru?</p>
          </DashboardCard>
          <BackLink />
        </div>
      </main>
    </>
  );
}

export default PageNotFound;
