import "./DashboardCard.css"

// Komponent för dashboard korten
function DashboardCard({ children, className = "" }) {
  return (
    <section className={`dashboard-card ${className}`}>
      {children}
    </section>
  )
}

export default DashboardCard