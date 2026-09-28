import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/brochure")({
  component: () => <Navigate to="/corporate" />,
});
