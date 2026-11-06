
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';



const categories = [
  'Photo Studio',
  'Film Stage',
  'Podcast Lounge',
  'Music Suite',
  'Workshop',
  'Event Space',
  'Creative Studio',
];

const availableAmenities = [
  'Free Wi-Fi',
  'Air Conditioning',
  'Parking',
  'Lighting Equipment',
  'Sound System',
  'Green Screen',
  'Changing Room',
  'Restroom',
  'Kitchen',
  'Projector',
];

const AddStudioPage = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    hourlyRate: '',
    securityDeposit: '',
    maxCapacity: '',
    location: '',
    imageUrl: '',
    overview: '',
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle amenities selection
  const handleAmenityChange = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    

    if (!session?.user) {
      alert('Please login first!');
      return;
    }

    if (!formData.category) {
      alert('Please select a category!');
      return;
    }

    if (amenities.length === 0) {
      alert('Please select at least one amenity!');
      return;
    }

    setLoading(true);

    const studioData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      amenities,
      userName: session.user.name,
      userEmail: session.user.email,
      createdAt: new Date().toISOString(),
    };

 try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studioData),
  });

  if (!response.ok) {
    throw new Error('Failed to add studio');
  }

  toast.success('Studio listed successfully!');

  router.push('/studios');

} catch (error) {
  console.error('Studio submission error:', error);

  toast.info('Something went wrong! Please try again.');

} finally {
  setLoading(false);
}
  };

  console.log(formData);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add Your Studio
          </h1>

          <p className="mt-2 text-gray-500">
            Share your creative space and start receiving bookings.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm md:p-8"
        >

          {/* Studio Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Studio Title *
            </label>

            <Input
              name="title"
              placeholder="Enter studio title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Category *
            </label>

            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  category: value ?? '',
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select studio category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hourly Rate & Security Deposit */}
          <div className="grid gap-5 md:grid-cols-2">

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Hourly Rate ($) *
              </label>

              <Input
                type="number"
                name="hourlyRate"
                min="0"
                placeholder="e.g. 50"
                value={formData.hourlyRate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Security Deposit ($) *
              </label>

              <Input
                type="number"
                name="securityDeposit"
                min="0"
                placeholder="e.g. 100"
                value={formData.securityDeposit}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Maximum Capacity */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Maximum Capacity *
            </label>

            <Input
              type="number"
              name="maxCapacity"
              min="1"
              placeholder="Number of people"
              value={formData.maxCapacity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Location / Address *
            </label>

            <Input
              name="location"
              placeholder="Enter full studio address"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Studio Image URL *
            </label>

            <Input
              type="url"
              name="imageUrl"
              placeholder="https://example.com/studio.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Amenities *
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="accent-black"
                  />

                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Detailed Overview *
            </label>

            <Textarea
              name="overview"
              placeholder="Describe your studio, facilities, rules and what makes it special..."
              rows={5}
              value={formData.overview}
              onChange={handleChange}
              required
            />
          </div>

          {/* Owner Information */}
          <div className="space-y-4 rounded-xl bg-gray-50 p-5">

            <h3 className="font-semibold text-gray-800">
              Owner Information
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                User Name
              </label>

              <Input
                value={session?.user?.name || ''}
                readOnly
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                User Email
              </label>

              <Input
                value={session?.user?.email || ''}
                readOnly
                className="bg-gray-100"
              />
            </div>

          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Publishing...' : 'Add Studio'}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default AddStudioPage;
