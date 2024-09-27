'use client';

import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface Property {
  uniqueid: string;
  image: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  size: number;
}

interface FilterProps {
  properties: Property[];
  onFilterChange: (filteredProperties: Property[]) => void;
}

const Filter: React.FC<FilterProps> = ({ properties, onFilterChange }) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(150000);
  const [bedrooms, setBedrooms] = useState<string>('');

  useEffect(() => {
    const uniqueLocations = [...new Set(properties.map(prop => prop.location))];
    setLocations(uniqueLocations);
  }, [properties]);

  const debouncedFilterChange = useCallback(
    debounce((filteredProps: Property[]) => {
      onFilterChange(filteredProps);
    }, 300),
    [onFilterChange]
  );

  useEffect(() => {
    const filteredProperties = properties.filter(property => 
      (selectedLocation === '' || property.location === selectedLocation) &&
      (property.price <= priceRange) &&
      (bedrooms === '' || property.bedrooms === parseInt(bedrooms))
    );

    debouncedFilterChange(filteredProperties);
  }, [selectedLocation, priceRange, bedrooms, properties, debouncedFilterChange]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setPriceRange(newValue);
  };

  return (
    <div className="mb-8 rounded-lg">
      
      <div className="flex justify-center items-center gap-8 flex-wrap">
        <div className="form-control w-48 max-w-xs">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <select 
            className="select select-bordered"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full max-w-xs ">
          <label className="label">
            <span className="label-text">Maximum Price</span>
          </label>
          <div className="flex flex-col space-y-2">
            <input 
              type="range" 
              min="10000" 
              max="150000" 
              step="10000"
              
              value={priceRange} 
              onChange={handlePriceChange}
              className="range range-xs range-primary"
            />
            <div className="text-sm">
              Up to ₹{priceRange.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="form-control w-48 max-w-xs">
          <label className="label">
            <span className="label-text">Bedrooms</span>
          </label>
          <select 
            className="select select-bordered"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
        </div>

        {/* Add reset button , place the button in baseline to the parent */}
        <div className=" max-w-xs mt-9 ">
          <button 
            className="btn btn-warning btn-outline"
            onClick={() => {
              setSelectedLocation('');
              setPriceRange(150000);
              setBedrooms('');
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;