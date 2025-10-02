import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Camera, BarChart3, RefreshCw, User, Home, Settings, FileText } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  userName: string;
}

export function Dashboard({ onNavigate, userName }: DashboardProps) {
  const mainOptions = [
    {
      id: 'capture',
      title: 'Capture Another Animal',
      subtitle: 'Take additional photos for analysis',
      icon: Camera,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    },
    {
      id: 'records',
      title: 'Classification Records',
      subtitle: 'View and manage evaluations',
      icon: FileText,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      id: 'sync',
      title: 'Sync with BPA System',
      subtitle: 'Upload pending records',
      icon: RefreshCw,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Welcome back</p>
              <p className="text-green-800">{userName}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('settings')}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-xl text-green-800 mb-4">Additional Functions</h2>
          <div className="grid gap-4">
            {mainOptions.map((option) => (
              <Card 
                key={option.id} 
                className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate(option.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`${option.color} ${option.hoverColor} p-4 rounded-xl transition-colors`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-1">{option.title}</h3>
                      <p className="text-gray-600">{option.subtitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h3 className="text-lg text-green-800 mb-3">Session Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl text-green-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Animals Classified Today</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl text-blue-600 mb-1">2</div>
                <div className="text-sm text-gray-600">Pending Sync</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
          <CardContent className="p-4">
            <h3 className="text-green-800 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-50"
                onClick={() => onNavigate('capture')}
              >
                <Camera className="h-4 w-4 mr-2" />
                Capture another animal
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-700 hover:bg-blue-50"
                onClick={() => onNavigate('records')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Review recent classifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 shadow-lg">
        <div className="grid grid-cols-4 py-2">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 py-3 text-green-600 bg-green-50"
            onClick={() => onNavigate('dashboard')}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50"
            onClick={() => onNavigate('capture')}
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs">Capture</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50"
            onClick={() => onNavigate('records')}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Records</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}