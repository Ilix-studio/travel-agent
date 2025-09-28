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
  Truck,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface DriverFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // License Information
  licenseNumber: string;
  licenseClass: string;
  licenseExpiry: string;
  licenseState: string;

  // Experience
  yearsExperience: string;
  vehicleTypes: string[];
  previousEmployer: string;
  reasonForLeaving: string;

  // Availability
  availableStartDate: string;
  workSchedule: string;

  // Background
  cleanDrivingRecord: boolean;
  criminalBackground: boolean;

  // Additional Information
  additionalNotes: string;
}

const DriverForm: React.FC = () => {
  const [formData, setFormData] = useState<DriverFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    licenseNumber: "",
    licenseClass: "",
    licenseExpiry: "",
    licenseState: "",
    yearsExperience: "",
    vehicleTypes: [],
    previousEmployer: "",
    reasonForLeaving: "",
    availableStartDate: "",
    workSchedule: "",
    cleanDrivingRecord: false,
    criminalBackground: false,
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<Partial<DriverFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<DriverFormData> = {};

    // Required field validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.licenseNumber.trim())
      newErrors.licenseNumber = "License number is required";
    if (!formData.licenseClass)
      newErrors.licenseClass = "License class is required";
    if (!formData.licenseExpiry)
      newErrors.licenseExpiry = "License expiry date is required";
    if (!formData.yearsExperience)
      newErrors.yearsExperience = "Years of experience is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (basic)
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof DriverFormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleVehicleTypeChange = (vehicleType: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...formData.vehicleTypes, vehicleType]
      : formData.vehicleTypes.filter((type) => type !== vehicleType);

    handleInputChange("vehicleTypes", updatedTypes);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      // Here you would typically send the data to your backend
    }
  };

  if (isSubmitted) {
    return (
      <Card className='w-full max-w-2xl mx-auto'>
        <CardContent className='p-8 text-center'>
          <CheckCircle2 className='mx-auto h-16 w-16 text-green-500 mb-4' />
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Application Submitted!
          </h2>
          <p className='text-gray-600 mb-4'>
            Thank you for your interest in joining our team. We'll review your
            application and get back to you within 2-3 business days.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant='outline'>
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <Card className='shadow-lg'>
          <CardHeader className='bg-blue-600 text-white'>
            <div className='flex items-center gap-2'>
              <Truck className='h-6 w-6' />
              <CardTitle className='text-2xl'>
                Driver Recruitment Application
              </CardTitle>
            </div>
            <CardDescription className='text-blue-100'>
              Join our professional driving team - Complete the form below to
              apply
            </CardDescription>
          </CardHeader>

          <CardContent className='p-6'>
            <div className='space-y-8'>
              {/* Personal Information */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <User className='h-5 w-5 text-blue-600' />
                  <h3 className='text-lg font-semibold'>
                    Personal Information
                  </h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='firstName'>First Name *</Label>
                    <Input
                      id='firstName'
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='lastName'>Last Name *</Label>
                    <Input
                      id='lastName'
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='email'>Email Address *</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='phone'>Phone Number *</Label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='phone'
                        type='tel'
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor='dateOfBirth'>Date of Birth *</Label>
                  <div className='relative'>
                    <Calendar className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    <Input
                      id='dateOfBirth'
                      type='date'
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className={`pl-10 ${
                        errors.dateOfBirth ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor='address'>Street Address</Label>
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    <Input
                      id='address'
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className='pl-10'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <Label htmlFor='city'>City</Label>
                    <Input
                      id='city'
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='state'>State</Label>
                    <Input
                      id='state'
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='zipCode'>ZIP Code</Label>
                    <Input
                      id='zipCode'
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* License Information */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <FileText className='h-5 w-5 text-blue-600' />
                  <h3 className='text-lg font-semibold'>License Information</h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='licenseNumber'>
                      Driver's License Number *
                    </Label>
                    <Input
                      id='licenseNumber'
                      value={formData.licenseNumber}
                      onChange={(e) =>
                        handleInputChange("licenseNumber", e.target.value)
                      }
                      className={errors.licenseNumber ? "border-red-500" : ""}
                    />
                    {errors.licenseNumber && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.licenseNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='licenseState'>License State</Label>
                    <Input
                      id='licenseState'
                      value={formData.licenseState}
                      onChange={(e) =>
                        handleInputChange("licenseState", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='licenseClass'>License Class *</Label>
                    <Select
                      value={formData.licenseClass}
                      onValueChange={(value) =>
                        handleInputChange("licenseClass", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.licenseClass ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder='Select license class' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='class-a'>
                          Class A - Commercial
                        </SelectItem>
                        <SelectItem value='class-b'>
                          Class B - Commercial
                        </SelectItem>
                        <SelectItem value='class-c'>
                          Class C - Regular
                        </SelectItem>
                        <SelectItem value='cdl'>CDL</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.licenseClass && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.licenseClass}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='licenseExpiry'>License Expiry Date *</Label>
                    <Input
                      id='licenseExpiry'
                      type='date'
                      value={formData.licenseExpiry}
                      onChange={(e) =>
                        handleInputChange("licenseExpiry", e.target.value)
                      }
                      className={errors.licenseExpiry ? "border-red-500" : ""}
                    />
                    {errors.licenseExpiry && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.licenseExpiry}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Driving Experience</h3>

                <div>
                  <Label htmlFor='yearsExperience'>
                    Years of Driving Experience *
                  </Label>
                  <Select
                    value={formData.yearsExperience}
                    onValueChange={(value) =>
                      handleInputChange("yearsExperience", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.yearsExperience ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder='Select years of experience' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='0-1'>0-1 years</SelectItem>
                      <SelectItem value='2-5'>2-5 years</SelectItem>
                      <SelectItem value='6-10'>6-10 years</SelectItem>
                      <SelectItem value='10+'>10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.yearsExperience && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.yearsExperience}
                    </p>
                  )}
                </div>

                <div>
                  <Label>
                    Vehicle Types Experience (Select all that apply)
                  </Label>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-2'>
                    {[
                      "Sedan",
                      "SUV",
                      "Van",
                      "Truck",
                      "Semi-Trailer",
                      "Bus",
                    ].map((type) => (
                      <div key={type} className='flex items-center space-x-2'>
                        <Checkbox
                          id={type}
                          checked={formData.vehicleTypes.includes(type)}
                          onCheckedChange={(checked) =>
                            handleVehicleTypeChange(type, checked as boolean)
                          }
                        />
                        <Label htmlFor={type} className='text-sm'>
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='previousEmployer'>Previous Employer</Label>
                    <Input
                      id='previousEmployer'
                      value={formData.previousEmployer}
                      onChange={(e) =>
                        handleInputChange("previousEmployer", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='availableStartDate'>
                      Available Start Date
                    </Label>
                    <Input
                      id='availableStartDate'
                      type='date'
                      value={formData.availableStartDate}
                      onChange={(e) =>
                        handleInputChange("availableStartDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='workSchedule'>Preferred Work Schedule</Label>
                  <Select
                    value={formData.workSchedule}
                    onValueChange={(value) =>
                      handleInputChange("workSchedule", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select preferred schedule' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='full-time'>Full-time</SelectItem>
                      <SelectItem value='part-time'>Part-time</SelectItem>
                      <SelectItem value='weekends'>Weekends only</SelectItem>
                      <SelectItem value='nights'>Night shifts</SelectItem>
                      <SelectItem value='flexible'>Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Background Check */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>
                  Background Information
                </h3>

                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='cleanRecord'
                      checked={formData.cleanDrivingRecord}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "cleanDrivingRecord",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor='cleanRecord'>
                      I have a clean driving record
                    </Label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='criminalBackground'
                      checked={formData.criminalBackground}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "criminalBackground",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor='criminalBackground'>
                      I am willing to undergo a background check
                    </Label>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>
                  Additional Information
                </h3>

                <div>
                  <Label htmlFor='additionalNotes'>
                    Additional Notes or Comments
                  </Label>
                  <Textarea
                    id='additionalNotes'
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      handleInputChange("additionalNotes", e.target.value)
                    }
                    placeholder="Tell us anything else you'd like us to know about your driving experience or availability..."
                    rows={4}
                  />
                </div>
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
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  Submit Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverForm;
