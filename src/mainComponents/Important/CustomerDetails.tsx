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
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  FileText,
  CheckCircle2,
  Users,
} from "lucide-react";

interface CustomerFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  nationality: string;

  // Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Identification
  passportNumber: string;
  passportExpiry: string;
  nationalId: string;

  // Driving License
  hasDrivingLicense: boolean;
  licenseNumber: string;
  licenseExpiry: string;
  licenseCountry: string;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;

  // Travel Preferences
  travelPurpose: string;
  specialRequirements: string;
  dietaryRestrictions: string;

  // Additional Information
  notes: string;
}

const CustomerDetails: React.FC = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    passportNumber: "",
    passportExpiry: "",
    nationalId: "",
    hasDrivingLicense: false,
    licenseNumber: "",
    licenseExpiry: "",
    licenseCountry: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    travelPurpose: "",
    specialRequirements: "",
    dietaryRestrictions: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<CustomerFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerFormData> = {};

    // Required field validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.nationality)
      newErrors.nationality = "Nationality is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Driving license validation
    if (formData.hasDrivingLicense) {
      if (!formData.licenseNumber.trim())
        newErrors.licenseNumber = "License number is required";
      if (!formData.licenseExpiry)
        newErrors.licenseExpiry = "License expiry date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof CustomerFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Calculate age when date of birth changes
    if (field === "dateOfBirth" && value) {
      const birthDate = new Date(value as string);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        setFormData((prev) => ({ ...prev, age: (age - 1).toString() }));
      } else {
        setFormData((prev) => ({ ...prev, age: age.toString() }));
      }
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      console.log("Customer details submitted:", formData);
      setIsSubmitted(true);
      // Here you would typically send the data to your backend
    }
  };

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-gray-50 py-8 px-4'>
        <Card className='w-full max-w-2xl mx-auto'>
          <CardContent className='p-8 text-center'>
            <CheckCircle2 className='mx-auto h-16 w-16 text-green-500 mb-4' />
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Customer Details Saved!
            </h2>
            <p className='text-gray-600 mb-4'>
              Customer information has been successfully recorded in the system.
            </p>
            <div className='flex gap-4 justify-center'>
              <Button onClick={() => setIsSubmitted(false)} variant='outline'>
                Add Another Customer
              </Button>
              <Button onClick={() => window.history.back()}>
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <Card className='shadow-lg'>
          <CardHeader className='bg-amber-500 text-black'>
            <div className='flex items-center gap-2'>
              <Users className='h-6 w-6' />
              <CardTitle className='text-2xl'>Customer Details Form</CardTitle>
            </div>
            <CardDescription className='text-amber-900'>
              Collect comprehensive customer information for travel bookings
            </CardDescription>
          </CardHeader>

          <CardContent className='p-6'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              {/* Personal Information */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <User className='h-5 w-5 text-amber-600' />
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

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
                    <Label htmlFor='age'>Age</Label>
                    <Input
                      id='age'
                      value={formData.age}
                      readOnly
                      className='bg-gray-50'
                    />
                  </div>

                  <div>
                    <Label htmlFor='gender'>Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.gender ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder='Select gender' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='male'>Male</SelectItem>
                        <SelectItem value='female'>Female</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                        <SelectItem value='prefer-not-to-say'>
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor='nationality'>Nationality *</Label>
                  <Input
                    id='nationality'
                    value={formData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    className={errors.nationality ? "border-red-500" : ""}
                  />
                  {errors.nationality && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.nationality}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <MapPin className='h-5 w-5 text-amber-600' />
                  <h3 className='text-lg font-semibold'>Address Information</h3>
                </div>

                <div>
                  <Label htmlFor='address'>Street Address *</Label>
                  <Input
                    id='address'
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
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
                    <Label htmlFor='state'>State/Province</Label>
                    <Input
                      id='state'
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='zipCode'>ZIP/Postal Code</Label>
                    <Input
                      id='zipCode'
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='country'>Country</Label>
                    <Input
                      id='country'
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Identification */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <FileText className='h-5 w-5 text-amber-600' />
                  <h3 className='text-lg font-semibold'>Identification</h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='passportNumber'>Passport Number</Label>
                    <Input
                      id='passportNumber'
                      value={formData.passportNumber}
                      onChange={(e) =>
                        handleInputChange("passportNumber", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='passportExpiry'>Passport Expiry Date</Label>
                    <Input
                      id='passportExpiry'
                      type='date'
                      value={formData.passportExpiry}
                      onChange={(e) =>
                        handleInputChange("passportExpiry", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='nationalId'>National ID</Label>
                  <Input
                    id='nationalId'
                    value={formData.nationalId}
                    onChange={(e) =>
                      handleInputChange("nationalId", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Driving License */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Driving License</h3>

                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='hasDrivingLicense'
                    checked={formData.hasDrivingLicense}
                    onCheckedChange={(checked) =>
                      handleInputChange("hasDrivingLicense", checked as boolean)
                    }
                  />
                  <Label htmlFor='hasDrivingLicense'>
                    Customer has a driving license
                  </Label>
                </div>

                {formData.hasDrivingLicense && (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <Label htmlFor='licenseNumber'>License Number *</Label>
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
                      <Label htmlFor='licenseExpiry'>Expiry Date *</Label>
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

                    <div>
                      <Label htmlFor='licenseCountry'>Issuing Country</Label>
                      <Input
                        id='licenseCountry'
                        value={formData.licenseCountry}
                        onChange={(e) =>
                          handleInputChange("licenseCountry", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Emergency Contact */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Emergency Contact</h3>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <Label htmlFor='emergencyContactName'>Contact Name</Label>
                    <Input
                      id='emergencyContactName'
                      value={formData.emergencyContactName}
                      onChange={(e) =>
                        handleInputChange(
                          "emergencyContactName",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='emergencyContactPhone'>Contact Phone</Label>
                    <Input
                      id='emergencyContactPhone'
                      type='tel'
                      value={formData.emergencyContactPhone}
                      onChange={(e) =>
                        handleInputChange(
                          "emergencyContactPhone",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor='emergencyContactRelation'>
                      Relationship
                    </Label>
                    <Select
                      value={formData.emergencyContactRelation}
                      onValueChange={(value) =>
                        handleInputChange("emergencyContactRelation", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select relationship' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='spouse'>Spouse</SelectItem>
                        <SelectItem value='parent'>Parent</SelectItem>
                        <SelectItem value='child'>Child</SelectItem>
                        <SelectItem value='sibling'>Sibling</SelectItem>
                        <SelectItem value='friend'>Friend</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Travel Preferences */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Travel Preferences</h3>

                <div>
                  <Label htmlFor='travelPurpose'>Purpose of Travel</Label>
                  <Select
                    value={formData.travelPurpose}
                    onValueChange={(value) =>
                      handleInputChange("travelPurpose", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select travel purpose' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='leisure'>Leisure</SelectItem>
                      <SelectItem value='business'>Business</SelectItem>
                      <SelectItem value='family'>Family Visit</SelectItem>
                      <SelectItem value='education'>Education</SelectItem>
                      <SelectItem value='medical'>Medical</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='specialRequirements'>
                    Special Requirements
                  </Label>
                  <Textarea
                    id='specialRequirements'
                    value={formData.specialRequirements}
                    onChange={(e) =>
                      handleInputChange("specialRequirements", e.target.value)
                    }
                    placeholder='Any special requirements (wheelchair access, medical needs, etc.)'
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor='dietaryRestrictions'>
                    Dietary Restrictions
                  </Label>
                  <Input
                    id='dietaryRestrictions'
                    value={formData.dietaryRestrictions}
                    onChange={(e) =>
                      handleInputChange("dietaryRestrictions", e.target.value)
                    }
                    placeholder='Vegetarian, vegan, allergies, etc.'
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>
                  Additional Information
                </h3>

                <div>
                  <Label htmlFor='notes'>Notes</Label>
                  <Textarea
                    id='notes'
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder='Any additional notes about the customer...'
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

              <div className='flex justify-end gap-4 pt-6'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  size='lg'
                  className='bg-amber-500 hover:bg-amber-600 text-black'
                >
                  Save Customer Details
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetails;
