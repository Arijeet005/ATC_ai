import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Camera, Upload, ArrowLeft, Zap } from 'lucide-react';

interface CaptureScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function CaptureScreen({ onNavigate }: CaptureScreenProps) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg text-green-800">Capture Animal Image</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Camera Preview Area */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <h2 className="text-lg text-gray-900">Live Camera / Upload Photo</h2>
            <p className="text-sm text-gray-600">Position the animal clearly in frame</p>
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
                  <p>Camera preview will appear here</p>
                  <p className="text-sm">Ensure good lighting and clear view</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Capture Controls */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleImageCapture}
            className="h-14 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
          >
            <Camera className="h-6 w-6" />
            Capture Photo
          </Button>
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="h-14 border-green-300 text-green-600 hover:bg-green-50 flex items-center justify-center gap-2"
          >
            <Upload className="h-6 w-6" />
            Upload Photo
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
          <Card className="bg-white shadow-md">
            <CardContent className="p-4">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Zap className="h-6 w-6" />
                    Analyze with AI
                  </>
                )}
              </Button>
              
              {isAnalyzing && (
                <div className="mt-4 space-y-2">
                  <div className="text-center text-sm text-gray-600">
                    Detecting body parts and measuring traits...
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="text-blue-800 mb-2">Photography Tips</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ensure the animal is standing straight</li>
              <li>• Capture the full body in profile view</li>
              <li>• Use good natural lighting</li>
              <li>• Keep the camera steady</li>
              <li>• Maintain 2-3 meters distance</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}