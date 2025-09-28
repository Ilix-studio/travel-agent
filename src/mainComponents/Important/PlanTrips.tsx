import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Shield,
  Star,
} from "lucide-react";
import { Header } from "../Admin/Booking";
import { Footer } from "../HomePage/Footer";

// Mock Data
const drivers = [
  {
    id: "1",
    name: "Ram Kumar",
    experience: "8 years",
    rating: 4.8,
    specialization: "Long distance",
    fee: 2500, // per day
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Sam Singh",
    experience: "5 years",
    rating: 4.6,
    specialization: "City tours",
    fee: 2000,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Tim Sharma",
    experience: "12 years",
    rating: 4.9,
    specialization: "Mountain routes",
    fee: 3000,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Rim Patel",
    experience: "6 years",
    rating: 4.7,
    specialization: "Tourist guide",
    fee: 2200,
    image: "/placeholder.svg",
  },
];

const destinations = [
  {
    id: "1",
    name: "Australia",
    duration: "10 days",
    basePrice: 85000,
    category: "International",
    description: "Sydney, Melbourne, Great Barrier Reef",
  },
  {
    id: "2",
    name: "Goa",
    duration: "5 days",
    basePrice: 15000,
    category: "Beach",
    description: "Beaches, churches, nightlife",
  },
  {
    id: "3",
    name: "Guwahati",
    duration: "3 days",
    basePrice: 8000,
    category: "Cultural",
    description: "Temples, river cruise, local culture",
  },
  {
    id: "4",
    name: "Delhi",
    duration: "4 days",
    basePrice: 12000,
    category: "Historical",
    description: "Red Fort, India Gate, museums",
  },
];

const vehicles = [
  {
    id: "1",
    name: "BMW X5",
    type: "Luxury SUV",
    capacity: "5 seats",
    dailyRate: 8000,
    features: ["GPS", "AC", "Premium audio"],
  },
  {
    id: "2",
    name: "Porsche Cayenne",
    type: "Sports SUV",
    capacity: "5 seats",
    dailyRate: 12000,
    features: ["Sport mode", "Premium interior", "GPS"],
  },
  {
    id: "3",
    name: "Ford Endeavour",
    type: "SUV",
    capacity: "7 seats",
    dailyRate: 5000,
    features: ["4WD", "AC", "GPS"],
  },
  {
    id: "4",
    name: "Isuzu D-Max",
    type: "Pickup Truck",
    capacity: "5 seats",
    dailyRate: 4000,
    features: ["4WD", "Cargo space", "AC"],
  },
];

interface TripFormData {
  destination: string;
  vehicle: string;
  driver: string;
  selfDrive: boolean;
  startDate: string;
  endDate: string;
  travelers: number;
}

export function PlanTrips() {
  const [formData, setFormData] = useState<TripFormData>({
    destination: "",
    vehicle: "",
    driver: "",
    selfDrive: false,
    startDate: "",
    endDate: "",
    travelers: 2,
  });

  const [totalCost, setTotalCost] = useState(0);
  const [breakdown, setBreakdown] = useState({
    destinationCost: 0,
    vehicleCost: 0,
    driverCost: 0,
    days: 0,
  });

  const calculateTotalCost = () => {
    if (
      !formData.destination ||
      !formData.vehicle ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setTotalCost(0);
      return;
    }

    const selectedDestination = destinations.find(
      (d) => d.id === formData.destination
    );
    const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle);
    const selectedDriver = drivers.find((d) => d.id === formData.driver);

    if (!selectedDestination || !selectedVehicle) return;

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const destinationCost = selectedDestination.basePrice * formData.travelers;
    const vehicleCost = selectedVehicle.dailyRate * days;
    const driverCost = formData.selfDrive
      ? 0
      : (selectedDriver?.fee || 0) * days;

    const total = destinationCost + vehicleCost + driverCost;

    setBreakdown({
      destinationCost,
      vehicleCost,
      driverCost,
      days,
    });
    setTotalCost(total);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Trip booked successfully! Total cost: ₹${totalCost.toLocaleString()}`
    );
  };

  const selectedDestination = destinations.find(
    (d) => d.id === formData.destination
  );
  const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle);
  const selectedDriver = drivers.find((d) => d.id === formData.driver);

  return (
    <>
      <Header />
      <div className='min-h-screen bg-slate-50 pt-24'>
        <div className='container mx-auto px-4 max-w-6xl'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-slate-900 mb-4'>
              Plan Your Perfect Trip
            </h1>
            <p className='text-lg text-slate-600'>
              Choose your destination, vehicle, and driver for an unforgettable
              journey
            </p>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Trip Planning Form */}
            <div className='lg:col-span-2 space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MapPin className='h-5 w-5 text-amber-500' />
                    Trip Details
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Destination Selection */}
                    <div className='space-y-2'>
                      <Label>Select Destination</Label>
                      <Select
                        value={formData.destination}
                        onValueChange={(value) =>
                          setFormData({ ...formData, destination: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Choose your destination' />
                        </SelectTrigger>
                        <SelectContent>
                          {destinations.map((dest) => (
                            <SelectItem key={dest.id} value={dest.id}>
                              <div className='flex items-center justify-between w-full'>
                                <span>{dest.name}</span>
                                <Badge variant='secondary' className='ml-2'>
                                  {dest.category}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedDestination && (
                        <p className='text-sm text-slate-600'>
                          {selectedDestination.description} •{" "}
                          {selectedDestination.duration} • ₹
                          {selectedDestination.basePrice}/person
                        </p>
                      )}
                    </div>

                    {/* Vehicle Selection */}
                    <div className='space-y-2'>
                      <Label>Select Vehicle</Label>
                      <Select
                        value={formData.vehicle}
                        onValueChange={(value) =>
                          setFormData({ ...formData, vehicle: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Choose your vehicle' />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              <div className='flex items-center justify-between w-full'>
                                <span>{vehicle.name}</span>
                                <span className='text-sm text-slate-500'>
                                  ₹{vehicle.dailyRate}/day
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedVehicle && (
                        <p className='text-sm text-slate-600'>
                          {selectedVehicle.type} • {selectedVehicle.capacity} •{" "}
                          {selectedVehicle.features.join(", ")}
                        </p>
                      )}
                    </div>

                    {/* Self Drive Option */}
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='selfDrive'
                        checked={formData.selfDrive}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            selfDrive: checked as boolean,
                            driver: checked ? "" : formData.driver,
                          })
                        }
                      />
                      <Label
                        htmlFor='selfDrive'
                        className='flex items-center gap-2'
                      >
                        <Car className='h-4 w-4' />
                        Self Drive (No driver required)
                      </Label>
                    </div>

                    {/* Driver Selection */}
                    {!formData.selfDrive && (
                      <div className='space-y-2'>
                        <Label>Select Driver</Label>
                        <Select
                          value={formData.driver}
                          onValueChange={(value) =>
                            setFormData({ ...formData, driver: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Choose your driver' />
                          </SelectTrigger>
                          <SelectContent>
                            {drivers.map((driver) => (
                              <SelectItem key={driver.id} value={driver.id}>
                                <div className='flex items-center justify-between w-full'>
                                  <span>{driver.name}</span>
                                  <div className='flex items-center gap-1'>
                                    <Star className='h-3 w-3 fill-amber-400 text-amber-400' />
                                    <span className='text-sm'>
                                      {driver.rating}
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedDriver && (
                          <p className='text-sm text-slate-600'>
                            {selectedDriver.experience} experience •{" "}
                            {selectedDriver.specialization} • ₹
                            {selectedDriver.fee}/day
                          </p>
                        )}
                      </div>
                    )}

                    {/* Travel Dates */}
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='startDate'>Start Date</Label>
                        <Input
                          id='startDate'
                          type='date'
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: e.target.value,
                            })
                          }
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='endDate'>End Date</Label>
                        <Input
                          id='endDate'
                          type='date'
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          min={formData.startDate}
                        />
                      </div>
                    </div>

                    {/* Number of Travelers */}
                    <div className='space-y-2'>
                      <Label htmlFor='travelers'>Number of Travelers</Label>
                      <Input
                        id='travelers'
                        type='number'
                        min='1'
                        max='8'
                        value={formData.travelers}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            travelers: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <Button
                      type='submit'
                      className='w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3'
                      disabled={
                        !formData.destination ||
                        !formData.vehicle ||
                        !formData.startDate ||
                        !formData.endDate ||
                        (!formData.selfDrive && !formData.driver)
                      }
                    >
                      Book Trip - ₹{totalCost.toLocaleString()}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Cost Breakdown */}
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <DollarSign className='h-5 w-5 text-green-500' />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {breakdown.days > 0 && (
                    <>
                      <div className='flex items-center gap-2 text-sm'>
                        <Calendar className='h-4 w-4 text-slate-500' />
                        <span>{breakdown.days} days</span>
                      </div>

                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span className='text-slate-600'>
                            Destination ({formData.travelers} travelers)
                          </span>
                          <span className='font-medium'>
                            ₹{breakdown.destinationCost.toLocaleString()}
                          </span>
                        </div>

                        <div className='flex justify-between'>
                          <span className='text-slate-600'>
                            Vehicle ({breakdown.days} days)
                          </span>
                          <span className='font-medium'>
                            ₹{breakdown.vehicleCost.toLocaleString()}
                          </span>
                        </div>

                        {!formData.selfDrive && breakdown.driverCost > 0 && (
                          <div className='flex justify-between'>
                            <span className='text-slate-600'>
                              Driver ({breakdown.days} days)
                            </span>
                            <span className='font-medium'>
                              ₹{breakdown.driverCost.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className='border-t pt-3'>
                          <div className='flex justify-between text-lg font-bold'>
                            <span>Total Cost</span>
                            <span className='text-amber-600'>
                              ₹{totalCost.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {totalCost === 0 && (
                    <div className='text-center text-slate-500 py-8'>
                      <Clock className='h-8 w-8 mx-auto mb-2 opacity-50' />
                      <p>Complete the form to see cost breakdown</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Trip Features */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Shield className='h-5 w-5 text-blue-500' />
                    Included Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span>24/7 Customer Support</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span>Travel Insurance</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span>GPS Navigation</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span>Roadside Assistance</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span>Fuel Included (Self Drive)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
