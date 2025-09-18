import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  FileText, 
  Code, 
  Trophy,
  Clock,
  Users
} from "lucide-react";
import type { Course, Module, Lesson } from "@/pages/Index";
import { toast } from "sonner";

interface CourseViewerProps {
  course: Course;
  onBack: () => void;
  onLessonComplete: (lessonId: string) => void;
}

export const CourseViewer = ({ course, onBack, onLessonComplete }: CourseViewerProps) => {
  const [selectedModule, setSelectedModule] = useState<Module>(course.modules[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(course.modules[0]?.lessons[0]);

  const getLessonIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video": return <Play className="h-5 w-5" />;
      case "text": return <FileText className="h-5 w-5" />;
      case "practice": return <Code className="h-5 w-5" />;
      case "assessment": return <Trophy className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getLessonTypeColor = (type: Lesson["type"]) => {
    switch (type) {
      case "video": return "bg-primary text-primary-foreground";
      case "text": return "bg-secondary text-secondary-foreground";
      case "practice": return "bg-warning text-warning-foreground";
      case "assessment": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleLessonComplete = () => {
    if (selectedLesson && !selectedLesson.isCompleted) {
      onLessonComplete(selectedLesson.id);
      toast.success("Lesson completed! 🎉");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="border-b border-card-border bg-card/50 backdrop-blur-lg">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.estimatedHours}h total
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.difficulty}
                </span>
                <span>{Math.round(course.progress)}% complete</span>
              </div>
            </div>
            <div className="w-48">
              <Progress value={course.progress} className="progress-glow" />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Course Structure */}
          <div className="lg:col-span-1">
            <Card className="ai-card border-card-border">
              <CardHeader>
                <CardTitle>Course Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <Button
                      variant={selectedModule.id === module.id ? "default" : "ghost"}
                      className="w-full justify-between p-3 h-auto"
                      onClick={() => {
                        setSelectedModule(module);
                        if (module.lessons.length > 0) {
                          setSelectedLesson(module.lessons[0]);
                        }
                      }}
                    >
                      <div className="text-left">
                        <div className="font-medium">{module.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {module.lessons.length} lessons
                        </div>
                      </div>
                      {module.isCompleted && (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      )}
                    </Button>
                    
                    {selectedModule.id === module.id && (
                      <div className="ml-4 space-y-1">
                        {module.lessons.map((lesson) => (
                          <Button
                            key={lesson.id}
                            variant={selectedLesson?.id === lesson.id ? "secondary" : "ghost"}
                            size="sm"
                            className="w-full justify-start gap-2 p-2 h-auto"
                            onClick={() => setSelectedLesson(lesson)}
                          >
                            {getLessonIcon(lesson.type)}
                            <div className="text-left flex-1">
                              <div className="text-sm">{lesson.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {lesson.duration}min
                              </div>
                            </div>
                            {lesson.isCompleted && (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            )}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {selectedLesson ? (
              <>
                {/* Lesson Header */}
                <Card className="ai-card border-card-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className={getLessonTypeColor(selectedLesson.type)}>
                            {getLessonIcon(selectedLesson.type)}
                            <span className="ml-2 capitalize">{selectedLesson.type}</span>
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {selectedLesson.duration} min
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl">{selectedLesson.title}</CardTitle>
                      </div>
                      {!selectedLesson.isCompleted && (
                        <Button 
                          onClick={handleLessonComplete}
                          className="btn-glow-primary"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                </Card>

                {/* Lesson Content */}
                <Card className="ai-card border-card-border">
                  <CardContent className="p-8">
                    <div className="prose prose-invert max-w-none">
                      <div className="bg-muted/50 p-6 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold mb-3">What you'll learn:</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {selectedLesson.content}
                        </p>
                      </div>

                      {selectedLesson.type === "video" && (
                        <div className="bg-card border border-card-border rounded-lg p-8 text-center">
                          <Play className="h-16 w-16 text-primary mx-auto mb-4 pulse-glow" />
                          <h4 className="text-lg font-semibold mb-2">Video Content</h4>
                          <p className="text-muted-foreground">
                            Interactive video lesson would be embedded here
                          </p>
                        </div>
                      )}

                      {selectedLesson.type === "practice" && (
                        <div className="bg-card border border-card-border rounded-lg p-8 text-center">
                          <Code className="h-16 w-16 text-warning mx-auto mb-4 pulse-glow" />
                          <h4 className="text-lg font-semibold mb-2">Hands-on Practice</h4>
                          <p className="text-muted-foreground">
                            Interactive coding environment would be available here
                          </p>
                        </div>
                      )}

                      {selectedLesson.type === "assessment" && (
                        <div className="bg-card border border-card-border rounded-lg p-8 text-center">
                          <Trophy className="h-16 w-16 text-accent mx-auto mb-4 pulse-glow" />
                          <h4 className="text-lg font-semibold mb-2">Assessment Challenge</h4>
                          <p className="text-muted-foreground">
                            Project-based assessment with AI evaluation
                          </p>
                        </div>
                      )}

                      {selectedLesson.type === "text" && (
                        <div className="space-y-4">
                          <h3>Lesson Overview</h3>
                          <p>
                            This text-based lesson covers the fundamentals you need to understand. 
                            The content would be rich, interactive text with embedded examples, 
                            code snippets, and visual aids to enhance your learning experience.
                          </p>
                          <h4>Key Concepts:</h4>
                          <ul>
                            <li>Core principles and terminology</li>
                            <li>Best practices and common patterns</li>
                            <li>Real-world applications and examples</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="ai-card border-card-border">
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Lesson</h3>
                  <p className="text-muted-foreground">
                    Choose a lesson from the course structure to begin learning
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};