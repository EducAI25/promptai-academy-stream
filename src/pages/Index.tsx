
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CourseRow from '../components/CourseRow';
import Footer from '../components/Footer';
import PWAInstallPrompt from '../components/PWAInstallPrompt';
import { aiCourses, programmingCourses, marketingCourses, dataScienceCourses, designCourses } from '../data/courses';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      
      <div className="py-16 space-y-12">
        <CourseRow title="🤖 Inteligência Artificial em Alta" courses={aiCourses} />
        <CourseRow title="💻 Programação & Desenvolvimento" courses={programmingCourses} />
        <CourseRow title="📈 Marketing Digital & Growth" courses={marketingCourses} />
        <CourseRow title="📊 Data Science & Analytics" courses={dataScienceCourses} />
        <CourseRow title="🎨 Design & UX/UI" courses={designCourses} />
      </div>

      <Footer />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
