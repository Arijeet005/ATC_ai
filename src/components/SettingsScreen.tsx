import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { ArrowLeft, User, Globe, HelpCircle, Phone, Save, Video, FileText, Wifi } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [profile, setProfile] = useState({
    name: 'Dr. Rajesh Kumar',
    employeeId: 'EMP001',
    contact: '+91-9876543210',
    department: 'Animal Husbandry'
  });

  const [settings, setSettings] = useState({
    language: 'en',
    autoSync: true,
    dataBackup: true,
    notifications: true
  });

  const tutorials = [
    {
      id: 1,
      title: 'How to Capture Perfect Animal Photos',
      icon: Video,
      duration: '3 min'
    },
    {
      id: 2,
      title: 'Understanding Classification Scores',
      icon: FileText,
      duration: '5 min'
    },
    {
      id: 3,
      title: 'Syncing Data with BPA System',
      icon: Wifi,
      duration: '2 min'
    }
  ];

  const handleSaveProfile = () => {
    // Simulate saving
    alert('Profile updated successfully!');
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
          <h1 className="text-lg text-green-800">Settings & Help</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Settings */}
        <Card className="bg-white shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <User className="h-5 w-5 text-green-600" />
            <h3 className="text-lg text-gray-900">Profile Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({...prev, name: e.target.value}))}
                  className="bg-green-50 border-green-200"
                />
              </div>
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={profile.employeeId}
                  onChange={(e) => setProfile(prev => ({...prev, employeeId: e.target.value}))}
                  className="bg-green-50 border-green-200"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={profile.contact}
                onChange={(e) => setProfile(prev => ({...prev, contact: e.target.value}))}
                className="bg-green-50 border-green-200"
              />
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profile.department}
                onChange={(e) => setProfile(prev => ({...prev, department: e.target.value}))}
                className="bg-green-50 border-green-200"
              />
            </div>
            
            <Button
              onClick={handleSaveProfile}
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="bg-white shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg text-gray-900">App Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Language / भाषा</Label>
              <Select 
                value={settings.language} 
                onValueChange={(value) => setSettings(prev => ({...prev, language: value}))}
              >
                <SelectTrigger className="bg-blue-50 border-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Sync with BPA</Label>
                  <p className="text-sm text-gray-600">Automatically upload new records</p>
                </div>
                <Switch
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => setSettings(prev => ({...prev, autoSync: checked}))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Backup</Label>
                  <p className="text-sm text-gray-600">Keep local backup of records</p>
                </div>
                <Switch
                  checked={settings.dataBackup}
                  onCheckedChange={(checked) => setSettings(prev => ({...prev, dataBackup: checked}))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive app notifications</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings(prev => ({...prev, notifications: checked}))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help & Tutorials */}
        <Card className="bg-white shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <HelpCircle className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg text-gray-900">Help & Tutorials</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <tutorial.icon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">{tutorial.title}</p>
                    <p className="text-sm text-gray-600">{tutorial.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <h3 className="text-blue-800">Contact Support</h3>
            </div>
            <p className="text-blue-700 text-sm mb-3">
              Need help with the ATC system? Our technical support team is available 24/7.
            </p>
            <div className="space-y-2 text-sm text-blue-600">
              <p>📞 Helpline: 1800-123-4567</p>
              <p>📧 Email: support@atc-system.gov.in</p>
              <p>💬 WhatsApp: +91-98765-43210</p>
            </div>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-600 space-y-1">
              <p>ATC System v2.1.0</p>
              <p>Developed by Ministry of Animal Husbandry</p>
              <p>© 2024 Government of India</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}