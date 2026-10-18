import React from 'react';
import { Utensils, HeartHandshake, Truck, ShieldCheck, Award } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about-us" className="py-16 sm:py-24 bg-[#F7F3EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE5DC] text-xs font-bold text-[#B38C42] uppercase tracking-wider mb-3 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Our Heritage & Values</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-5">
            Homemade Goodness, Delivered to Your Door.
          </h2>
          <p className="text-base sm:text-lg text-[#524D44] leading-relaxed font-normal">
            At The Royal Kitchen, we believe great food brings people together. Our mission is to make freshly prepared homemade Pakistani meals accessible and convenient for families across Karachi.
          </p>
        </div>

        {/* 3 Main Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-[#EAE5DC] hover:border-[#C7A15A]/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#C7A15A]/10 border border-[#C7A15A]/25 flex items-center justify-center text-[#B38C42] mb-6">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#171717] mb-3">
                Fresh Homemade Food
              </h3>
              <p className="text-sm text-[#524D44] leading-relaxed">
                Every meal is cooked with the same love, cleanliness, and attention you expect from a real home kitchen. We avoid commercial flavor enhancers and artificial colors.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EAE5DC] flex items-center gap-2 text-xs font-semibold text-[#736B5E]">
              <ShieldCheck className="w-4 h-4 text-[#C7A15A]" />
              <span>Authentic Pakistani recipes</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-[#EAE5DC] hover:border-[#C7A15A]/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#C7A15A]/10 border border-[#C7A15A]/25 flex items-center justify-center text-[#B38C42] mb-6">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#171717] mb-3">
                Prepared With Care
              </h3>
              <p className="text-sm text-[#524D44] leading-relaxed">
                We select premium cuts of meat, freshly ground spices, pure cooking oils, and farm vegetables. Prepared fresh every morning in small batches for peak flavor.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EAE5DC] flex items-center gap-2 text-xs font-semibold text-[#736B5E]">
              <ShieldCheck className="w-4 h-4 text-[#C7A15A]" />
              <span>Hygienic small-batch cooking</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-[#EAE5DC] hover:border-[#C7A15A]/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#C7A15A]/10 border border-[#C7A15A]/25 flex items-center justify-center text-[#B38C42] mb-6">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#171717] mb-3">
                Delivery Across Karachi
              </h3>
              <p className="text-sm text-[#524D44] leading-relaxed">
                Operating near Gulshan-e-Iqbal Block 6, our delivery network connects to all major sectors of Karachi with food packed in food-grade insulated containers.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EAE5DC] flex items-center gap-2 text-xs font-semibold text-[#736B5E]">
              <ShieldCheck className="w-4 h-4 text-[#C7A15A]" />
              <span>Direct to your doorstep</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
