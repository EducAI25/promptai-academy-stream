import React from 'react';
import { Star, Users, Clock } from 'lucide-react';
import { aiCourses, programmingCourses, marketingCourses, dataScienceCourses, designCourses } from '../data/courses';

const TrendingSection = () => {
  // Selecionar os 5 cursos mais populares (primeiros de cada categoria)
  const trendingCourses = [
    { ...aiCourses[0], rank: 1 },
    { ...programmingCourses[0], rank: 2 },
    { ...marketingCourses[0], rank: 3 },
    { ...dataScienceCourses[0], rank: 4 },
    { ...designCourses[0], rank: 5 }
  ];

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center">
          🔥 Trending Now
        </h2>
        
        <div className="grid gap-4 md:gap-6">
          {trendingCourses.map((course) => (
            <div 
              key={course.id}
              className="group relative flex flex-col md:flex-row items-start md:items-center bg-card/50 border border-border rounded-lg p-4 md:p-6 hover:bg-card transition-all duration-300 cursor-pointer"
            >
              {/* Rank Number */}
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <span className="text-6xl md:text-8xl font-black text-primary/30 group-hover:text-primary/50 transition-colors">
                  {course.rank}
                </span>
              </div>

              {/* Course Image */}
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full md:w-32 h-32 md:h-20 object-cover rounded"
                />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base mb-3 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {course.rating}
                  </div>
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
                <button className="w-full md:w-auto px-6 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors">
                  Começar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;