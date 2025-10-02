import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Save, Download, Share2, Edit3, CheckCircle } from 'lucide-react';

interface ScoreScreenProps {
  onNavigate: (screen: string) => void;
  analysisData: any;
}

export function ScoreScreen({ onNavigate, analysisData }: ScoreScreenProps) {
  const [animalId, setAnimalId] = useState(analysisData.animalId);
  const [selectedBreed, setSelectedBreed] = useState(analysisData.suggestedBreed);
  const [traits, setTraits] = useState(analysisData.traits);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const breeds = ['Sahiwal', 'Gir', 'Murrah', 'Red Sindhi', 'Tharparkar', 'Kankrej', 'Ongole'];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleTraitChange = (trait: string, value: string) => {
    setTraits(prev => ({
      ...prev,
      [trait]: parseFloat(value) || 0
    }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg text-green-800">Classification Results</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Animal Image & Score */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <img 
                  src={analysisData.image} 
                  alt="Analyzed animal" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-center">
                  <div className={`text-3xl rounded-lg px-4 py-2 inline-block ${getScoreColor(analysisData.score)}`}>
                    {analysisData.score}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Classification Score</p>
                </div>
                <Badge variant="secondary" className="w-full justify-center py-1 bg-blue-100 text-blue-700">
                  {analysisData.confidence}% Confidence
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animal Details */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <h3 className="text-lg text-gray-900">Animal Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="animalId">Animal ID</Label>
                <Input
                  id="animalId"
                  value={animalId}
                  onChange={(e) => setAnimalId(e.target.value)}
                  disabled={!isEditing}
                  className="bg-green-50 border-green-200"
                />
              </div>
              <div>
                <Label htmlFor="breed">Breed</Label>
                <Select value={selectedBreed} onValueChange={setSelectedBreed} disabled={!isEditing}>
                  <SelectTrigger className="bg-green-50 border-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {breeds.map(breed => (
                      <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI-Extracted Traits */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <h3 className="text-lg text-gray-900">Measured Traits</h3>
            <p className="text-sm text-gray-600">AI-extracted measurements (in cm)</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="bodyLength" className="text-sm">Body Length</Label>
                <Input
                  id="bodyLength"
                  value={traits.bodyLength}
                  onChange={(e) => handleTraitChange('bodyLength', e.target.value)}
                  disabled={!isEditing}
                  className="bg-gray-50 border-gray-200 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="chestWidth" className="text-sm">Chest Width</Label>
                <Input
                  id="chestWidth"
                  value={traits.chestWidth}
                  onChange={(e) => handleTraitChange('chestWidth', e.target.value)}
                  disabled={!isEditing}
                  className="bg-gray-50 border-gray-200 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="heightAtWithers" className="text-sm">Height at Withers</Label>
                <Input
                  id="heightAtWithers"
                  value={traits.heightAtWithers}
                  onChange={(e) => handleTraitChange('heightAtWithers', e.target.value)}
                  disabled={!isEditing}
                  className="bg-gray-50 border-gray-200 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="rumpAngle" className="text-sm">Rump Angle (°)</Label>
                <Input
                  id="rumpAngle"
                  value={traits.rumpAngle}
                  onChange={(e) => handleTraitChange('rumpAngle', e.target.value)}
                  disabled={!isEditing}
                  className="bg-gray-50 border-gray-200 text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isSaved ? (
            <>
              <Button
                onClick={handleSave}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              >
                <Save className="h-5 w-5" />
                Save & Auto-Record in BPA
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-purple-300 text-purple-600 hover:bg-purple-50 flex items-center justify-center gap-2"
                >
                  <Share2 className="h-5 w-5" />
                  Share Report
                </Button>
              </div>
            </>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-800">Record saved successfully!</p>
              <p className="text-sm text-green-600">Redirecting to dashboard...</p>
            </div>
          )}
        </div>

        {/* Analysis Details */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="text-blue-800 mb-2">Analysis Summary</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Body parts detected with {analysisData.confidence}% accuracy</p>
              <p>• Measurements calibrated using standard references</p>
              <p>• Classification based on breed standard parameters</p>
              <p>• Score calculated using weighted trait evaluation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}