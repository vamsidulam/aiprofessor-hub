import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, BarChart3, Plus, TrendingUp } from "lucide-react";
import type { Course } from "@/pages/Index";

interface CourseDashboardProps {
  courses: Course[];
  onCourseSelect: (course: Course) => void;
  onGenerateNew: () => void;
  onViewProgress: () => void;
}

export const CourseDashboard = ({ 
  courses, 
  onCourseSelect, 
  onGenerateNew, 
  onViewProgress 
}: CourseDashboardProps) => {
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).length;

  const getDifficultyColor = (difficulty: Course["difficulty"]) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Learning Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Track your progress and continue your learning journey
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={onViewProgress}
              variant="outline" 
              className="btn-glow-secondary"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              View Progress
            </Button>
            <Button 
              onClick={onGenerateNew}
              className="btn-glow-primary"
            >
              <Plus className="mr-2 h-5 w-5" />
              Generate New Course
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="ai-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-3xl font-bold">{totalCourses}</p>
                </div>
                <BookOpen className="h-12 w-12 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="ai-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-bold">{inProgressCourses}</p>
                </div>
                <BarChart3 className="h-12 w-12 text-warning opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="ai-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">{completedCourses}</p>
                </div>
                <Badge className="bg-success text-success-foreground text-2xl px-4 py-2">
                  ✓
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          
          {courses.length === 0 ? (
            <Card className="ai-card border-card-border">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Generate your first AI-powered course to get started
                </p>
                <Button 
                  onClick={onGenerateNew}
                  className="btn-glow-primary"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your First Course
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="ai-card border-card-border cursor-pointer" onClick={() => onCourseSelect(course)}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.estimatedHours}h
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {course.modules.length} modules
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round(course.progress)}%</span>
                        </div>
                        <Progress value={course.progress} className="progress-glow" />
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {course.completedLessons} of {course.totalLessons} lessons completed
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full btn-glow-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCourseSelect(course);
                      }}
                    >
                      {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};