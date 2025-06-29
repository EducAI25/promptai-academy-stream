
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Users, Star } from 'lucide-react';

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: string;
  rating: number;
  level: string;
  category: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
  duration,
  students,
  rating,
  level,
  category
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/curso/${id}`);
  };

  const handleWatchNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/curso/${id}`);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to wishlist functionality
    console.log('Added to list:', title);
  };

  return (
    <div 
      className="relative min-w-[300px] h-[170px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-110 hover:z-20 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Course Image */}
      <div className="w-full h-full relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </button>
        </div>
      </div>

      {/* Course Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-red-600 text-xs font-bold rounded">{category}</span>
          <span className="px-2 py-1 bg-gray-800 text-xs rounded">{level}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{students}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>

      {/* Expanded Info (on hover) */}
      {isHovered && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 p-4 rounded-b-lg shadow-2xl border-t-2 border-red-600 z-30 transition-all duration-300">
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="flex gap-2">
            <button 
              onClick={handleWatchNow}
              className="flex-1 px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors duration-300 text-sm"
            >
              Ver Detalhes
            </button>
            
            <button 
              onClick={handleAddToList}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-300 text-sm"
            >
              + Lista
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
