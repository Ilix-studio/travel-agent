import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: MapPin, label: "Destinations", href: "/admin/destinations" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className='p-4'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setCollapsed(!collapsed)}
          className='ml-auto flex text-white hover:bg-slate-800'
        >
          {collapsed ? (
            <ChevronRight className='w-4 h-4' />
          ) : (
            <ChevronLeft className='w-4 h-4' />
          )}
        </Button>
      </div>

      <nav className='px-4 pb-4'>
        <ul className='space-y-2'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Button
                variant='ghost'
                className={cn(
                  "w-full justify-start text-white hover:bg-slate-800",
                  collapsed && "px-2"
                )}
              >
                <item.icon className='w-5 h-5' />
                {!collapsed && <span className='ml-3'>{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
