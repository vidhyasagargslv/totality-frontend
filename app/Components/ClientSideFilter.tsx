'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card } from './Card';

const Filter = dynamic(() => import('./Filter'), { ssr: false });
const NotFound = dynamic(() => import('./NotFound'), { ssr: false });

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

interface ClientSideFilterProps {
  properties: Property[];
}

const ClientSideFilter: React.FC<ClientSideFilterProps> = ({ properties }) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);

  return (
    <>
      <Filter properties={properties} onFilterChange={setFilteredProperties} />
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.map((property) => (
            <Card
              key={property.uniqueid}
              image={property.image}
              title={property.title}
              description={property.description}
              location={property.location}
              bedrooms={property.bedrooms}
              price={property.price}
              size={property.size} uniqueid={''}            />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ClientSideFilter;