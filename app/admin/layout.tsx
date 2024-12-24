import { Metadata } from "next";
import { AdminNav } from "../components/admin/AdminNav";

export const metadata: Metadata = {
  title: "E-Commerce Admin",
  description: "E-commerce admin dashboard",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}
