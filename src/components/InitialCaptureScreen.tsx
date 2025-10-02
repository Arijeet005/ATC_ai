import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Camera, Upload, Zap, ArrowRight, PawPrint } from 'lucide-react';

interface InitialCaptureScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  userName: string;
}

export function InitialCaptureScreen({ onNavigate, userName }: InitialCaptureScreenProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = () => {
    // Simulate camera capture with a placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple placeholder image
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 400, 300);
      ctx.fillStyle = '#666';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Animal Photo', 200, 150);
      ctx.fillText('(Camera Simulation)', 200, 180);
      
      const imageData = canvas.toDataURL();
      setCapturedImage(imageData);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      // Navigate to score screen with mock data
      const mockAnalysisData = {
        image: capturedImage,
        animalId: 'ATC-' + Date.now().toString().slice(-6),
        traits: {
          bodyLength: 152.3,
          chestWidth: 68.7,
          heightAtWithers: 142.1,
          rumpAngle: 28.5,
          legLength: 71.2
        },
        confidence: 94.2,
        suggestedBreed: 'Sahiwal',
        score: 87.5
      };
      onNavigate('score', mockAnalysisData);
    }, 3000);
  };

  const handleSkipToMain = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-full">
              <PawPrint className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Welcome, {userName}</p>
              <p className="text-green-800">Let's start classifying!</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkipToMain}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            Skip to Main
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
          <CardContent className="p-6 text-center">
            <Camera className="h-12 w-12 mx-auto mb-3 opacity-90" />
            <h2 className="text-xl mb-2">Capture Your First Animal</h2>
            <p className="opacity-90">
              Start by taking a clear photo of the animal for AI-powered classification
            </p>
          </CardContent>
        </Card>

        {/* Camera Preview Area */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <h3 className="text-lg text-gray-900">Animal Photo Capture</h3>
            <p className="text-sm text-gray-600">Position the animal clearly in the frame</p>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
              {capturedImage ? (
                <img 
                  src={capturedImage} 
                  alt="Captured animal" 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg mb-2">Ready to capture</p>
                  <p className="text-sm">Ensure good lighting and full body view</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Capture Controls */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleImageCapture}
              className="h-16 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center gap-1"
            >
              <Camera className="h-7 w-7" />
              <span>Take Photo</span>
            </Button>
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-16 border-green-300 text-green-600 hover:bg-green-50 flex flex-col items-center justify-center gap-1"
            >
              <Upload className="h-7 w-7" />
              <span>Upload Image</span>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Analyze Button */}
          {capturedImage && (
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Analyzing with AI...</span>
                </>
              ) : (
                <>
                  <Zap className="h-7 w-7" />
                  <span>Start AI Analysis</span>
                </>
              )}
            </Button>
          )}

          {isAnalyzing && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <div className="text-blue-800">
                    🤖 AI is detecting body parts and measuring traits...
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full animate-pulse transition-all duration-1000" style={{width: '70%'}}></div>
                  </div>
                  <div className="text-sm text-blue-700">
                    This may take a few moments for accurate results
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Tips */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <h4 className="text-amber-800 mb-3 flex items-center gap-2">
              💡 Photography Tips for Best Results
            </h4>
            <ul className="text-sm text-amber-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Animal should be standing straight in profile view</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Capture the full body from head to tail</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Use natural daylight for clear visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Keep 2-3 meters distance from the animal</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}