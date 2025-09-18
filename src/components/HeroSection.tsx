import { Button } from "@/components/ui/button";
import { Brain, Zap, Trophy, Users } from "lucide-react";
import aiProfessorHero from "@/assets/ai-professor-hero.jpg";

interface HeroSectionProps {
  onGenerateCourse: () => void;
}

export const HeroSection = ({ onGenerateCourse }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aiProfessorHero})` }}
      ></div>
      
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 float-animation"></div>
      
      <div className="container max-w-6xl mx-auto text-center z-10">
        <div className="space-y-8">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Learn with Your Personal
            <span className="block text-gradient">AI Professor</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary EdTech platform that generates personalized courses and teaches you with an interactive 3D AI Professor
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-glow-primary text-lg px-8 py-6"
              onClick={onGenerateCourse}
            >
              <Zap className="mr-2 h-6 w-6" />
              Start Learning Now
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-glow-secondary text-lg px-8 py-6 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              <Brain className="mr-2 h-6 w-6" />
              Meet Your AI Professor
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="ai-card p-6 rounded-xl">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4 pulse-glow" />
              <h3 className="text-xl font-semibold mb-2">AI-Generated Courses</h3>
              <p className="text-muted-foreground">
                Enter any topic and get a complete structured course with modules and lessons
              </p>
            </div>
            
            <div className="ai-card p-6 rounded-xl">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4 pulse-glow" />
              <h3 className="text-xl font-semibold mb-2">3D AI Professor</h3>
              <p className="text-muted-foreground">
                Interactive virtual professor that teaches, explains, and answers your questions
              </p>
            </div>
            
            <div className="ai-card p-6 rounded-xl">
              <Trophy className="h-12 w-12 text-accent mx-auto mb-4 pulse-glow" />
              <h3 className="text-xl font-semibold mb-2">Smart Assessments</h3>
              <p className="text-muted-foreground">
                Project-based assignments with AI-powered feedback and evaluation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};