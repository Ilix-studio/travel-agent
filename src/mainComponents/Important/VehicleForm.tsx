import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Car,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  Gauge,
  Shield,
} from "lucide-react";

interface VehicleFormData {
  // Vehicle Information
  make: string;
  model: string;
  year: string;
  color: string;
  plateNumber: string;
  vin: string;
  fuelType: string;
  transmission: string;
  mileage: string;
  seatingCapacity: string;
  vehicleType: string;

  // Owner Information
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerAddress: string;
  ownerCity: string;
  ownerState: string;
  ownerZipCode: string;

  // Documentation
  registrationNumber: string;
  registrationExpiry: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceExpiry: string;

  // Condition & Features
  vehicleCondition: string;
  lastServiceDate: string;
  nextServiceDue: string;
  features: string[];
  notes: string;

  // Availability
  isAvailable: boolean;
  dailyRate: string;
  weeklyRate: string;
  monthlyRate: string;

  // Owner Pricing
  minimumAskingPrice: string;
  maximumAskingPrice: string;
}

const VehicleForm: React.FC = () => {
  const [formData, setFormData] = useState<VehicleFormData>({
    make: "",
    model: "",
    year: "",
    color: "",
    plateNumber: "",
    vin: "",
    fuelType: "",
    transmission: "",
    mileage: "",
    seatingCapacity: "",
    vehicleType: "",
    ownerFirstName: "",
    ownerLastName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerAddress: "",
    ownerCity: "",
    ownerState: "",
    ownerZipCode: "",
    registrationNumber: "",
    registrationExpiry: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    insuranceExpiry: "",
    vehicleCondition: "",
    lastServiceDate: "",
    nextServiceDue: "",
    features: [],
    notes: "",
    isAvailable: true,
    dailyRate: "",
    weeklyRate: "",
    monthlyRate: "",
    minimumAskingPrice: "",
    maximumAskingPrice: "",
  });

  const [errors, setErrors] = useState<Partial<VehicleFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<VehicleFormData> = {};

    // Required field validation
    if (!formData.make.trim()) newErrors.make = "Make is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.plateNumber.trim())
      newErrors.plateNumber = "Plate number is required";
    if (!formData.ownerFirstName.trim())
      newErrors.ownerFirstName = "Owner first name is required";
    if (!formData.ownerLastName.trim())
      newErrors.ownerLastName = "Owner last name is required";
    if (!formData.ownerEmail.trim())
      newErrors.ownerEmail = "Owner email is required";
    if (!formData.ownerPhone.trim())
      newErrors.ownerPhone = "Owner phone is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.ownerEmail && !emailRegex.test(formData.ownerEmail)) {
      newErrors.ownerEmail = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (
      formData.ownerPhone &&
      !phoneRegex.test(formData.ownerPhone.replace(/\D/g, ""))
    ) {
      newErrors.ownerPhone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof VehicleFormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const updatedFeatures = checked
      ? [...formData.features, feature]
      : formData.features.filter((f) => f !== feature);

    handleInputChange("features", updatedFeatures);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      console.log("Vehicle form submitted:", formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <Card className='w-full max-w-2xl mx-auto'>
        <CardContent className='p-8 text-center'>
          <CheckCircle2 className='mx-auto h-16 w-16 text-green-500 mb-4' />
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Vehicle Added Successfully!
          </h2>
          <p className='text-gray-600 mb-4'>
            The vehicle has been added to the fleet management system.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant='outline'>
            Add Another Vehicle
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <Card className='shadow-lg'>
          <CardHeader className='bg-amber-500 text-black'>
            <div className='flex items-center gap-2'>
              <Car className='h-6 w-6' />
              <CardTitle className='text-2xl'>Vehicle Registration</CardTitle>
            </div>
            <CardDescription className='text-amber-900'>
              Add new vehicle to the fleet management system
            </CardDescription>
          </CardHeader>

          <CardContent className='p-6'>
            <div className='space-y-8'>
              {/* Vehicle Information */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <Car className='h-5 w-5 text-amber-600' />
                  <h3 className='text-lg font-semibold'>Vehicle Information</h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <Label htmlFor='make'>Make *</Label>
                    <Input
                      id='make'
                      value={formData.make}
                      onChange={(e) =>
                        handleInputChange("make", e.target.value)
                      }
                      className={errors.make ? "border-red-500" : ""}
                      placeholder='e.g. Toyota'
                    />
                    {errors.make && (
                      <p className='text-red-500 text-sm mt-1'>{errors.make}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='model'>Model *</Label>
                    <Input
                      id='model'
                      value={formData.model}
                      onChange={(e) =>
                        handleInputChange("model", e.target.value)
                      }
                      className={errors.model ? "border-red-500" : ""}
                      placeholder='e.g. Camry'
                    />
                    {errors.model && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.model}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='year'>Year *</Label>
                    <Input
                      id='year'
                      type='number'
                      value={formData.year}
                      onChange={(e) =>
                        handleInputChange("year", e.target.value)
                      }
                      className={errors.year ? "border-red-500" : ""}
                      placeholder='2023'
                    />
                    {errors.year && (
                      <p className='text-red-500 text-sm mt-1'>{errors.year}</p>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='plateNumber'>Plate Number *</Label>
                    <Input
                      id='plateNumber'
                      value={formData.plateNumber}
                      onChange={(e) =>
                        handleInputChange("plateNumber", e.target.value)
                      }
                      className={errors.plateNumber ? "border-red-500" : ""}
                      placeholder='AS01AB1234'
                    />
                    {errors.plateNumber && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.plateNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='vin'>VIN Number</Label>
                    <Input
                      id='vin'
                      value={formData.vin}
                      onChange={(e) => handleInputChange("vin", e.target.value)}
                      placeholder='17-digit VIN'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  <div>
                    <Label htmlFor='color'>Color</Label>
                    <Input
                      id='color'
                      value={formData.color}
                      onChange={(e) =>
                        handleInputChange("color", e.target.value)
                      }
                      placeholder='White'
                    />
                  </div>

                  <div>
                    <Label htmlFor='fuelType'>Fuel Type</Label>
                    <Select
                      value={formData.fuelType}
                      onValueChange={(value) =>
                        handleInputChange("fuelType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select fuel type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='petrol'>Petrol</SelectItem>
                        <SelectItem value='diesel'>Diesel</SelectItem>
                        <SelectItem value='electric'>Electric</SelectItem>
                        <SelectItem value='hybrid'>Hybrid</SelectItem>
                        <SelectItem value='cng'>CNG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='transmission'>Transmission</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(value) =>
                        handleInputChange("transmission", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select transmission' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='manual'>Manual</SelectItem>
                        <SelectItem value='automatic'>Automatic</SelectItem>
                        <SelectItem value='cvt'>CVT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='seatingCapacity'>Seating</Label>
                    <Select
                      value={formData.seatingCapacity}
                      onValueChange={(value) =>
                        handleInputChange("seatingCapacity", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Seats' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='2'>2 Seater</SelectItem>
                        <SelectItem value='4'>4 Seater</SelectItem>
                        <SelectItem value='5'>5 Seater</SelectItem>
                        <SelectItem value='7'>7 Seater</SelectItem>
                        <SelectItem value='8+'>8+ Seater</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='vehicleType'>Vehicle Type</Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) =>
                        handleInputChange("vehicleType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select vehicle type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='sedan'>Sedan</SelectItem>
                        <SelectItem value='suv'>SUV</SelectItem>
                        <SelectItem value='hatchback'>Hatchback</SelectItem>
                        <SelectItem value='van'>Van</SelectItem>
                        <SelectItem value='truck'>Truck</SelectItem>
                        <SelectItem value='bus'>Bus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='mileage'>Mileage (km)</Label>
                    <div className='relative'>
                      <Gauge className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='mileage'
                        type='number'
                        value={formData.mileage}
                        onChange={(e) =>
                          handleInputChange("mileage", e.target.value)
                        }
                        className='pl-10'
                        placeholder='50000'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <User className='h-5 w-5 text-amber-600' />
                  <h3 className='text-lg font-semibold'>Owner Information</h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='ownerFirstName'>First Name *</Label>
                    <Input
                      id='ownerFirstName'
                      value={formData.ownerFirstName}
                      onChange={(e) =>
                        handleInputChange("ownerFirstName", e.target.value)
                      }
                      className={errors.ownerFirstName ? "border-red-500" : ""}
                    />
                    {errors.ownerFirstName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.ownerFirstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='ownerLastName'>Last Name *</Label>
                    <Input
                      id='ownerLastName'
                      value={formData.ownerLastName}
                      onChange={(e) =>
                        handleInputChange("ownerLastName", e.target.value)
                      }
                      className={errors.ownerLastName ? "border-red-500" : ""}
                    />
                    {errors.ownerLastName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.ownerLastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='ownerEmail'>Email *</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='ownerEmail'
                        type='email'
                        value={formData.ownerEmail}
                        onChange={(e) =>
                          handleInputChange("ownerEmail", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.ownerEmail ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.ownerEmail && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.ownerEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='ownerPhone'>Phone *</Label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='ownerPhone'
                        type='tel'
                        value={formData.ownerPhone}
                        onChange={(e) =>
                          handleInputChange("ownerPhone", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.ownerPhone ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.ownerPhone && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.ownerPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor='ownerAddress'>Address</Label>
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    <Input
                      id='ownerAddress'
                      value={formData.ownerAddress}
                      onChange={(e) =>
                        handleInputChange("ownerAddress", e.target.value)
                      }
                      className='pl-10'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <Label htmlFor='ownerCity'>City</Label>
                    <Input
                      id='ownerCity'
                      value={formData.ownerCity}
                      onChange={(e) =>
                        handleInputChange("ownerCity", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='ownerState'>State</Label>
                    <Input
                      id='ownerState'
                      value={formData.ownerState}
                      onChange={(e) =>
                        handleInputChange("ownerState", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='ownerZipCode'>ZIP Code</Label>
                    <Input
                      id='ownerZipCode'
                      value={formData.ownerZipCode}
                      onChange={(e) =>
                        handleInputChange("ownerZipCode", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Documentation */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <FileText className='h-5 w-5 text-amber-600' />
                  <h3 className='text-lg font-semibold'>Documentation</h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='registrationNumber'>
                      Registration Number
                    </Label>
                    <Input
                      id='registrationNumber'
                      value={formData.registrationNumber}
                      onChange={(e) =>
                        handleInputChange("registrationNumber", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='registrationExpiry'>
                      Registration Expiry
                    </Label>
                    <Input
                      id='registrationExpiry'
                      type='date'
                      value={formData.registrationExpiry}
                      onChange={(e) =>
                        handleInputChange("registrationExpiry", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <Label htmlFor='insuranceProvider'>
                      Insurance Provider
                    </Label>
                    <div className='relative'>
                      <Shield className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='insuranceProvider'
                        value={formData.insuranceProvider}
                        onChange={(e) =>
                          handleInputChange("insuranceProvider", e.target.value)
                        }
                        className='pl-10'
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='insurancePolicyNumber'>Policy Number</Label>
                    <Input
                      id='insurancePolicyNumber'
                      value={formData.insurancePolicyNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "insurancePolicyNumber",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='insuranceExpiry'>Insurance Expiry</Label>
                    <Input
                      id='insuranceExpiry'
                      type='date'
                      value={formData.insuranceExpiry}
                      onChange={(e) =>
                        handleInputChange("insuranceExpiry", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Condition & Service */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Condition & Service</h3>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <Label htmlFor='vehicleCondition'>Vehicle Condition</Label>
                    <Select
                      value={formData.vehicleCondition}
                      onValueChange={(value) =>
                        handleInputChange("vehicleCondition", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select condition' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='excellent'>Excellent</SelectItem>
                        <SelectItem value='good'>Good</SelectItem>
                        <SelectItem value='fair'>Fair</SelectItem>
                        <SelectItem value='poor'>Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='lastServiceDate'>Last Service Date</Label>
                    <Input
                      id='lastServiceDate'
                      type='date'
                      value={formData.lastServiceDate}
                      onChange={(e) =>
                        handleInputChange("lastServiceDate", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='nextServiceDue'>Next Service Due</Label>
                    <Input
                      id='nextServiceDue'
                      type='date'
                      value={formData.nextServiceDue}
                      onChange={(e) =>
                        handleInputChange("nextServiceDue", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Features</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                  {[
                    "Air Conditioning",
                    "GPS Navigation",
                    "Bluetooth",
                    "USB Charging",
                    "Backup Camera",
                    "Sunroof",
                    "Leather Seats",
                    "Parking Sensors",
                  ].map((feature) => (
                    <div key={feature} className='flex items-center space-x-2'>
                      <Checkbox
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onCheckedChange={(checked) =>
                          handleFeatureChange(feature, checked as boolean)
                        }
                      />
                      <Label htmlFor={feature} className='text-sm'>
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Availability */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>
                  Pricing & Availability
                </h3>

                <div className='flex items-center space-x-2 mb-4'>
                  <Checkbox
                    id='isAvailable'
                    checked={formData.isAvailable}
                    onCheckedChange={(checked) =>
                      handleInputChange("isAvailable", checked as boolean)
                    }
                  />
                  <Label htmlFor='isAvailable'>Available for rental</Label>
                </div>

                <div className='space-y-4'>
                  <h4 className='text-md font-medium text-gray-700'>
                    Rental Rates
                  </h4>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <Label htmlFor='dailyRate'>Daily Rate (₹)</Label>
                      <Input
                        id='dailyRate'
                        type='number'
                        value={formData.dailyRate}
                        onChange={(e) =>
                          handleInputChange("dailyRate", e.target.value)
                        }
                        placeholder='2000'
                      />
                    </div>

                    <div>
                      <Label htmlFor='weeklyRate'>Weekly Rate (₹)</Label>
                      <Input
                        id='weeklyRate'
                        type='number'
                        value={formData.weeklyRate}
                        onChange={(e) =>
                          handleInputChange("weeklyRate", e.target.value)
                        }
                        placeholder='12000'
                      />
                    </div>

                    <div>
                      <Label htmlFor='monthlyRate'>Monthly Rate (₹)</Label>
                      <Input
                        id='monthlyRate'
                        type='number'
                        value={formData.monthlyRate}
                        onChange={(e) =>
                          handleInputChange("monthlyRate", e.target.value)
                        }
                        placeholder='45000'
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h4 className='text-md font-medium text-gray-700'>
                    Owner Asking Price
                  </h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='minimumAskingPrice'>
                        Minimum Asking Price (₹)
                      </Label>
                      <Input
                        id='minimumAskingPrice'
                        type='number'
                        value={formData.minimumAskingPrice}
                        onChange={(e) =>
                          handleInputChange(
                            "minimumAskingPrice",
                            e.target.value
                          )
                        }
                        placeholder='500000'
                      />
                    </div>

                    <div>
                      <Label htmlFor='maximumAskingPrice'>
                        Maximum Asking Price (₹)
                      </Label>
                      <Input
                        id='maximumAskingPrice'
                        type='number'
                        value={formData.maximumAskingPrice}
                        onChange={(e) =>
                          handleInputChange(
                            "maximumAskingPrice",
                            e.target.value
                          )
                        }
                        placeholder='800000'
                      />
                    </div>
                  </div>
                  <p className='text-sm text-gray-600'>
                    Set the price range the owner is willing to accept for the
                    vehicle
                  </p>
                </div>
              </div>

              {/* Additional Notes */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Additional Notes</h3>
                <Textarea
                  id='notes'
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder='Any additional information about the vehicle...'
                  rows={4}
                />
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert className='border-red-200 bg-red-50'>
                  <AlertDescription className='text-red-700'>
                    Please correct the errors above before submitting the form.
                  </AlertDescription>
                </Alert>
              )}

              <div className='flex justify-end pt-6'>
                <Button
                  onClick={handleSubmit}
                  size='lg'
                  className='bg-amber-500 hover:bg-amber-600 text-black'
                >
                  Add Vehicle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleForm;
