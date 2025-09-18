import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Clock, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import type { Course } from "@/pages/Index";

interface CourseGeneratorProps {
  onCourseGenerated: (course: Course) => void;
}

export const CourseGenerator = ({ onCourseGenerated }: CourseGeneratorProps) => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCourse = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic to generate a course");
      return;
    }

    setIsGenerating(true);
    toast.info("AI Professor is generating your course...");

    // Simulate AI course generation
    setTimeout(() => {
      const mockCourse: Course = {
        id: Date.now().toString(),
        title: `Master ${topic}`,
        description: `A comprehensive course covering all aspects of ${topic} from beginner to advanced level.`,
        progress: 0,
        totalLessons: 15,
        completedLessons: 0,
        difficulty: "Beginner" as const,
        estimatedHours: 12,
        modules: [
          {
            id: "1",
            title: `Introduction to ${topic}`,
            description: `Get started with the fundamentals of ${topic}`,
            progress: 0,
            isCompleted: false,
            lessons: [
              {
                id: "1-1",
                title: `What is ${topic}?`,
                content: `Learn the basics and core concepts of ${topic}`,
                isCompleted: false,
                type: "video" as const,
                duration: 15
              },
              {
                id: "1-2",
                title: "Setting up your Environment",
                content: "Configure your development environment and tools",
                isCompleted: false,
                type: "text" as const,
                duration: 10
              }
            ]
          },
          {
            id: "2",
            title: `Core Concepts of ${topic}`,
            description: `Dive deeper into the essential principles`,
            progress: 0,
            isCompleted: false,
            lessons: [
              {
                id: "2-1",
                title: "Key Principles",
                content: "Understanding the fundamental principles",
                isCompleted: false,
                type: "video" as const,
                duration: 20
              },
              {
                id: "2-2",
                title: "Hands-on Practice",
                content: "Apply what you've learned with practical exercises",
                isCompleted: false,
                type: "practice" as const,
                duration: 30
              }
            ]
          },
          {
            id: "3",
            title: `Advanced ${topic} Techniques`,
            description: `Master advanced concepts and best practices`,
            progress: 0,
            isCompleted: false,
            lessons: [
              {
                id: "3-1",
                title: "Advanced Techniques",
                content: "Learn professional-level techniques and patterns",
                isCompleted: false,
                type: "video" as const,
                duration: 25
              },
              {
                id: "3-2",
                title: "Final Project",
                content: "Build a complete project showcasing your skills",
                isCompleted: false,
                type: "assessment" as const,
                duration: 60
              }
            ]
          }
        ]
      };

      onCourseGenerated(mockCourse);
      setIsGenerating(false);
      setTopic("");
      toast.success("Course generated successfully! 🎉");
    }, 3000);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Generate Your Perfect Course</h2>
        <p className="text-xl text-muted-foreground">
          Tell our AI what you want to learn, and get a personalized course instantly
        </p>
      </div>

      <Card className="ai-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Course Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Input
              placeholder="Enter any topic (e.g., Web Development, Machine Learning, Digital Marketing)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="text-lg py-6 bg-muted border-muted"
              onKeyPress={(e) => e.key === 'Enter' && generateCourse()}
            />
            <Button
              onClick={generateCourse}
              disabled={isGenerating}
              className="btn-glow-primary px-8 py-6 text-lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Course
                </>
              )}
            </Button>
          </div>

          {/* Course preview features */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <Badge variant="secondary" className="mb-1">Structured Modules</Badge>
              <p className="text-sm text-muted-foreground">Organized learning path</p>
            </div>
            <div className="text-center p-4">
              <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
              <Badge variant="secondary" className="mb-1">Time Estimates</Badge>
              <p className="text-sm text-muted-foreground">Know your commitment</p>
            </div>
            <div className="text-center p-4">
              <BarChart3 className="h-8 w-8 text-accent mx-auto mb-2" />
              <Badge variant="secondary" className="mb-1">Progress Tracking</Badge>
              <p className="text-sm text-muted-foreground">Monitor your journey</p>
            </div>
            <div className="text-center p-4">
              <Sparkles className="h-8 w-8 text-warning mx-auto mb-2" />
              <Badge variant="secondary" className="mb-1">AI Assessments</Badge>
              <p className="text-sm text-muted-foreground">Smart evaluations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};