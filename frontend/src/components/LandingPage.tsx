import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, TrendingUp, Menu } from "lucide-react";

export default function EnhancedLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      <header className="border-b border-gray-800 bg-black bg-opacity-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            LuxuryEstates
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Button
              variant="ghost"
              className="text-purple-700 hover:text-purple-300"
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-purple-700 hover:text-purple-300"
            >
              <Link to="/">About</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-purple-700 hover:text-purple-300"
            >
              <Link to="/properties">Properties</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-purple-700 hover:text-purple-300"
            >
              <Link to="/">Contact</Link>
            </Button>
            <Button
              variant="outline"
              className="text-purple-700 border-purple-300 hover:bg-purple-300 hover:text-gray-900"
            >
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Link to="/auth">Sign Up</Link>
            </Button>
          </nav>
          <Button variant="ghost" className="md:hidden text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main>
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Discover Unparalleled Luxury Living
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Experience the pinnacle of real estate with our curated collection
            of exclusive properties in the world's most coveted locations.
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-3">
            <Link to="/properties">Explore Our Portfolio</Link>
          </Button>
        </section>

        <section className="py-20 bg-black bg-opacity-30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Featured Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Seaside Villa",
                  location: "Malibu, CA",
                  price: "$12,500,000",
                  id: "1",
                },
                {
                  title: "Penthouse Suite",
                  location: "New York, NY",
                  price: "$8,900,000",
                  id: "2",
                },
                {
                  title: "Mountain Retreat",
                  location: "Aspen, CO",
                  price: "$7,200,000",
                  id: "3",
                },
              ].map((property) => (
                <Card
                  key={property.id}
                  className="bg-gray-800 bg-opacity-50 border-gray-700 overflow-hidden"
                >
                  <img
                    src={`/placeholder.svg?height=200&width=400&text=${property.title}`}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                    <p className="text-gray-400 mb-2">{property.location}</p>
                    <p className="text-2xl font-bold text-purple-300">
                      {property.price}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
                    >
                      <Link to={`/properties/${property.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              The LuxuryEstates Advantage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Star className="w-12 h-12 mb-4 text-purple-400" />,
                  title: "Exclusive Listings",
                  description:
                    "Access to the most prestigious properties on the market.",
                },
                {
                  icon: <Award className="w-12 h-12 mb-4 text-purple-400" />,
                  title: "Unparalleled Service",
                  description:
                    "Dedicated concierge service for a seamless experience.",
                },
                {
                  icon: (
                    <TrendingUp className="w-12 h-12 mb-4 text-purple-400" />
                  ),
                  title: "Investment Potential",
                  description:
                    "Properties with exceptional appreciation prospects.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
                >
                  {feature.icon}
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-black bg-opacity-30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Discover Your Dream Home
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Let our expert team guide you through our exclusive portfolio and
              find the perfect property that matches your lifestyle.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-3">
              <Link to="/consultation">Schedule a Consultation</Link>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "LuxuryEstates found us the perfect vacation home. Their attention to detail is unmatched.",
                  author: "James & Emily Thompson",
                },
                {
                  quote:
                    "The team's expertise in luxury real estate made our investment process smooth and profitable.",
                  author: "Michael Chen, Investor",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-gray-800 bg-opacity-50 border-gray-700 p-6"
                >
                  <CardContent>
                    <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                    <p className="text-right text-purple-300">
                      - {testimonial.author}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black bg-opacity-40 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} LuxuryEstates. All rights
            reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Button
              variant="link"
              className="text-gray-400 hover:text-purple-300"
            >
              <Link to="/privacy">Privacy Policy</Link>
            </Button>
            <Button
              variant="link"
              className="text-gray-400 hover:text-purple-300"
            >
              <Link to="/terms">Terms of Service</Link>
            </Button>
            <Button
              variant="link"
              className="text-gray-400 hover:text-purple-300"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
