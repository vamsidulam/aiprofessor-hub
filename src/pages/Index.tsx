import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CourseGenerator } from "@/components/CourseGenerator";
import { CourseDashboard } from "@/components/CourseDashboard";
import { CourseViewer } from "@/components/CourseViewer";
import { AIProfessorChat } from "@/components/AIProfessorChat";
import { ProgressDashboard } from "@/components/ProgressDashboard";

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isCompleted: boolean;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  type: "video" | "text" | "practice" | "assessment";
  duration: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "course" | "progress">("home");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleCourseGenerated = (course: Course) => {
    setCourses(prev => [...prev, course]);
    setCurrentView("dashboard");
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView("course");
  };

  const updateCourseProgress = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(module => {
          const updatedLessons = module.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
          );
          const completedLessons = updatedLessons.filter(l => l.isCompleted).length;
          const progress = (completedLessons / updatedLessons.length) * 100;
          
          return {
            ...module,
            lessons: updatedLessons,
            progress,
            isCompleted: progress === 100
          };
        });
        
        const totalLessons = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);
        const completedLessons = updatedModules.reduce((acc, m) => acc + m.lessons.filter(l => l.isCompleted).length, 0);
        const progress = (completedLessons / totalLessons) * 100;
        
        return {
          ...course,
          modules: updatedModules,
          progress,
          completedLessons
        };
      }
      return course;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {currentView === "home" && (
        <>
          <HeroSection onGenerateCourse={() => setCurrentView("dashboard")} />
          <CourseGenerator onCourseGenerated={handleCourseGenerated} />
        </>
      )}
      
      {currentView === "dashboard" && (
        <CourseDashboard 
          courses={courses}
          onCourseSelect={handleCourseSelect}
          onGenerateNew={() => setCurrentView("home")}
          onViewProgress={() => setCurrentView("progress")}
        />
      )}
      
      {currentView === "course" && selectedCourse && (
        <CourseViewer 
          course={selectedCourse}
          onBack={() => setCurrentView("dashboard")}
          onLessonComplete={(lessonId) => updateCourseProgress(selectedCourse.id, lessonId)}
        />
      )}
      
      {currentView === "progress" && (
        <ProgressDashboard 
          courses={courses}
          onBack={() => setCurrentView("dashboard")}
        />
      )}
      
      <AIProfessorChat />
    </div>
  );
};

export default Index;