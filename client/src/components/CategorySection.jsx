import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-6 px-8 py-10">
      
      {/* MEN */}
      <div
        onClick={() => navigate("/mens")}
        className="flex-1 h-64 bg-cover bg-center rounded-xl cursor-pointer relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521334884684-d80222895322')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold">Men</h2>
        </div>
      </div>

      {/* WOMEN */}
      <div 
        onClick={() => navigate("/womens")}
        className="flex-1 h-64 bg-cover bg-center rounded-xl cursor-pointer relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1483985988355-763728e1935b')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold">Women</h2>
        </div>
      </div>

    </div>
  );
};

export default CategorySection;