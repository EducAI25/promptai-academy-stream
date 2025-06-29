
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from './CourseCard';

interface Course {
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

interface CourseRowProps {
  title: string;
  courses: Course[];
}

const CourseRow: React.FC<CourseRowProps> = ({ title, courses }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-12 group">
      <h2 className="text-white text-2xl font-bold mb-4 px-4">{title}</h2>
      
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Course Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRow;
