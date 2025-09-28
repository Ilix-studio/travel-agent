import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  User,
  Car,
  Paperclip,
} from "lucide-react";
import { AdminHeader } from "./AdminHeader";
import { useNavigate } from "react-router-dom";

const recentBookings = [
  {
    id: "BK001",
    customer: "ilix Hazarika",
    destination: "Santorini, Greece",
    date: "2024-03-15",
    amount: "₹1,299",
    status: "confirmed",
  },
  {
    id: "BK002",
    customer: "Jyotish Hazarika",
    destination: "Kyoto, Japan",
    date: "2024-03-18",
    amount: "₹1,899",
    status: "pending",
  },
  {
    id: "BK003",
    customer: "Himanku Borah",
    destination: "Maldives",
    date: "2024-03-20",
    amount: "₹3,499",
    status: "confirmed",
  },
  {
    id: "BK004",
    customer: "Zubeen Garg",
    destination: "Swiss Alps",
    date: "2024-03-22",
    amount: "₹2,799",
    status: "cancelled",
  },
];

const topDestinations = [
  { name: "Santorini, Greece", bookings: 45, revenue: "₹58,455" },
  { name: "Maldives", bookings: 38, revenue: "₹132,962" },
  { name: "Kyoto, Japan", bookings: 32, revenue: "₹60,768" },
  { name: "Swiss Alps", bookings: 28, revenue: "₹78,372" },
  { name: "Bali, Indonesia", bookings: 25, revenue: "₹39,975" },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Total Bookings",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Active Customers",
      value: "856",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Destinations",
      value: "47",
      change: "+3",
      trend: "up",
      icon: MapPin,
    },
    {
      title: "Revenue",
      value: "₹124,500",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Add Driver",
      value: "12",
      change: "+",
      trend: "up",
      icon: User,
      action: () => navigate("/driver"),
    },
    {
      title: "Add Vehicle Info",
      value: "₹124,500",
      change: "+15%",
      trend: "up",
      icon: Car,
    },
    {
      title: "Create Invoice",
      value: "₹124,500",
      change: "+15%",
      trend: "up",
      icon: Paperclip,
    },
  ];
  return (
    <>
      <AdminHeader />
      <div className='space-y-10 px-9'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {stats.map((stat, index) => (
            <Card key={index} onClick={stat.action}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-slate-600'>
                  {stat.title}
                </CardTitle>
                <stat.icon className='w-4 h-4 text-slate-600' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <div className='flex items-center text-xs text-slate-600'>
                  {stat.trend === "up" ? (
                    <TrendingUp className='w-3 h-3 text-green-500 mr-1' />
                  ) : (
                    <TrendingDown className='w-3 h-3 text-red-500 mr-1' />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className='ml-1'>from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='font-medium'>{booking.customer}</span>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className='text-sm text-slate-600'>
                        {booking.destination}
                      </p>
                      <p className='text-xs text-slate-500'>{booking.date}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold text-amber-600'>
                        {booking.amount}
                      </span>
                      <div className='flex gap-1'>
                        <Button variant='ghost' size='sm'>
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button variant='ghost' size='sm'>
                          <Edit className='w-4 h-4' />
                        </Button>
                        <Button variant='ghost' size='sm'>
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Destinations */}
          <Card>
            <CardHeader>
              <CardTitle>Top Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {topDestinations.map((destination, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-3 border rounded-lg'
                  >
                    <div className='flex-1'>
                      <p className='font-medium'>{destination.name}</p>
                      <p className='text-sm text-slate-600'>
                        {destination.bookings} bookings
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-semibold text-amber-600'>
                        {destination.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <Button className='bg-amber-500 hover:bg-amber-600 text-black'>
                Add New Destination
              </Button>
              <Button variant='outline'>Create Booking</Button>
              <Button variant='outline'>Generate Report</Button>
              <Button variant='outline'>Manage Users</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
