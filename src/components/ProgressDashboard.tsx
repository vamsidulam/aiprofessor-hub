import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Clock, 
  Trophy,
  Calendar,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import type { Course } from "@/pages/Index";

interface ProgressDashboardProps {
  courses: Course[];
  onBack: () => void;
}

export const ProgressDashboard = ({ courses, onBack }: ProgressDashboardProps) => {
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).length;
  const totalLessons = courses.reduce((acc, c) => acc + c.totalLessons, 0);
  const completedLessons = courses.reduce((acc, c) => acc + c.completedLessons, 0);
  const totalHours = courses.reduce((acc, c) => acc + c.estimatedHours, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const getSkillLevel = (progress: number) => {
    if (progress === 0) return { level: "Not Started", color: "bg-muted text-muted-foreground" };
    if (progress < 30) return { level: "Beginner", color: "bg-success text-success-foreground" };
    if (progress < 70) return { level: "Intermediate", color: "bg-warning text-warning-foreground" };
    if (progress < 100) return { level: "Advanced", color: "bg-accent text-accent-foreground" };
    return { level: "Master", color: "bg-primary text-primary-foreground" };
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold mb-2">Progress Analytics</h1>
            <p className="text-xl text-muted-foreground">
              Track your learning journey and achievements
            </p>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="ai-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-3xl font-bold">{Math.round(overallProgress)}%</p>
                </div>
                <TrendingUp className="h-12 w-12 text-primary opacity-80" />
              </div>
              <div className="mt-4">
                <Progress value={overallProgress} className="progress-glow" />
              </div>
            </CardContent>
          </Card>

          <Card className="ai-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Lessons</p>
                  <p className="text-3xl font-bold">{completedLessons}/{totalLessons}</p>
                </div>
                <CheckCircle2 className="h-12 w-12 text-success opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="ai-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Hours</p>
                  <p className="text-3xl font-bold">{totalHours}h</p>
                </div>
                <Clock className="h-12 w-12 text-secondary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="ai-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Courses</p>
                  <p className="text-3xl font-bold">{completedCourses}</p>
                </div>
                <Trophy className="h-12 w-12 text-accent opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Course Progress */}
          <Card className="ai-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Course Progress
              </CardTitle>
              <CardDescription>
                Your progress across all enrolled courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No courses enrolled yet</p>
                </div>
              ) : (
                courses.map((course) => {
                  const skillLevel = getSkillLevel(course.progress);
                  return (
                    <div key={course.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{course.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={skillLevel.color}>
                              {skillLevel.level}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">{Math.round(course.progress)}%</span>
                        </div>
                      </div>
                      <Progress value={course.progress} className="progress-glow" />
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Learning Insights */}
          <Card className="ai-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-accent" />
                Learning Insights
              </CardTitle>
              <CardDescription>
                Your learning achievements and milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-success/10 rounded-lg">
                  <div className="h-12 w-12 bg-success rounded-full flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-success-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-success">Courses Completed</h4>
                    <p className="text-sm text-muted-foreground">
                      You've completed {completedCourses} course{completedCourses !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                  <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Learning Streak</h4>
                    <p className="text-sm text-muted-foreground">
                      {inProgressCourses > 0 ? `${inProgressCourses} course${inProgressCourses !== 1 ? 's' : ''} in progress` : 'Start a new course!'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg">
                  <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">Time Investment</h4>
                    <p className="text-sm text-muted-foreground">
                      {totalHours} hours of learning content
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-lg">
                  <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">Skill Mastery</h4>
                    <p className="text-sm text-muted-foreground">
                      {Math.round(overallProgress)}% overall progress across all subjects
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Goals Section */}
        {courses.length > 0 && (
          <Card className="ai-card border-card-border mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-warning" />
                This Week's Goals
              </CardTitle>
              <CardDescription>
                Stay on track with your learning objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Complete 3 Lessons</h4>
                  <p className="text-sm text-muted-foreground">2/3 completed this week</p>
                  <Progress value={66.7} className="mt-2" />
                </div>
                
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <h4 className="font-semibold">Study 2 Hours</h4>
                  <p className="text-sm text-muted-foreground">1.5/2 hours this week</p>
                  <Progress value={75} className="mt-2" />
                </div>
                
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold">Pass 1 Assessment</h4>
                  <p className="text-sm text-muted-foreground">Ready to start!</p>
                  <Progress value={0} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};