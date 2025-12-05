import { Award, Heart, Shield, Truck } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Every piece is crafted with meticulous attention to detail using the finest materials.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.',
    },
    {
      icon: Shield,
      title: 'Trusted Brand',
      description: 'Years of experience delivering excellence and building lasting relationships.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Reliable shipping and white-glove delivery service to your doorstep.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Crafting Spaces,{' '}
            <span className="gradient-text">Creating Memories</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to LuxeFurniture, where timeless design meets exceptional craftsmanship.
            We believe your home deserves furniture that reflects your style and stands the test of time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6 animate-fade-in">
            <img
              src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Our showroom"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded with a passion for exceptional furniture and design, LuxeFurniture has been transforming
              houses into homes for over a decade. We started with a simple vision: to make premium,
              beautifully designed furniture accessible to everyone.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we partner with master craftsmen and renowned designers to curate collections that
              blend contemporary aesthetics with timeless elegance. Each piece in our catalog is carefully
              selected to ensure it meets our rigorous standards for quality, comfort, and style.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From luxurious sofas to elegant dining sets, every item tells a story and brings character
              to your living space. We're not just selling furniture; we're helping you create the home
              of your dreams.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 text-center hover-lift animate-fade-in"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-12 text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our curated collections and discover furniture that speaks to your style.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
          >
            Shop Our Collection
          </button>
        </div>
      </div>
    </div>
  );
}
