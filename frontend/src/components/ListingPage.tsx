import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ErrorCom from './Error';
import { Bed, Bath, Square, Search } from 'lucide-react';
import { BACKEND_URL } from '@/constants/index';

interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    city: string;
    state: string;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  type?: string;
  status: 'For Sale' | 'For Rent' | 'Sold';
  image: [];
}

export default function EnhancedPropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token") || "error";
      const response = await fetch(`${BACKEND_URL}/real-estate`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized access. Please log in.");
        } else {
          throw new Error("Failed to fetch properties");
        }
      }

      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data);
      setLoading(false);
    } catch (err) {
      setError("You need to log in to access this content.");
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter(property =>
      (property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.state.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (propertyType === 'all' || (property.type && property.type.toLowerCase() === propertyType.toLowerCase()))
    );
    setFilteredProperties(filtered);
  }, [searchTerm, propertyType, properties]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  if (loading) return <div>Loading properties...</div>;
  if (error) return <ErrorCom message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Luxury Properties
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search properties..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select onValueChange={setPropertyType} value={propertyType}>
            <SelectTrigger className="w-full md:w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="bg-gray-800 bg-opacity-50 border-gray-700 overflow-hidden">
              <img src={property.image[0]} alt={property.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-white">{property.title}</CardTitle>
                  <Badge variant={property.status === 'For Sale' ? 'default' : 'secondary'} className="bg-gradient-to-r from-purple-500 to-pink-500">
                    {property.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2 text-white">{formatPrice(property.price)}</p>
                <p className="text-sm text-gray-300 mb-4">{`${property.location.city}, ${property.location.state}`}</p>
                <div className="flex justify-between text-sm text-gray-300">
                  <span className="flex items-center"><Bed className="w-4 h-4 mr-1" /> {property.bedrooms} Beds</span>
                  <span className="flex items-center"><Bath className="w-4 h-4 mr-1" /> {property.bathrooms} Baths</span>
                  <span className="flex items-center"><Square className="w-4 h-4 mr-1" /> {property.area} sqft</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
