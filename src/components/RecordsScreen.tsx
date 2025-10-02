import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Search, Filter, Eye, Download, RefreshCw } from 'lucide-react';

interface RecordsScreenProps {
  onNavigate: (screen: string) => void;
}

export function RecordsScreen({ onNavigate }: RecordsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for demonstration
  const records = [
    {
      id: 'ATC-001234',
      breed: 'Sahiwal',
      date: '2024-01-20',
      score: 87.5,
      status: 'synced',
      confidence: 94.2
    },
    {
      id: 'ATC-001235',
      breed: 'Gir',
      date: '2024-01-20',
      score: 92.1,
      status: 'pending',
      confidence: 89.7
    },
    {
      id: 'ATC-001236',
      breed: 'Murrah',
      date: '2024-01-19',
      score: 78.3,
      status: 'synced',
      confidence: 91.5
    },
    {
      id: 'ATC-001237',
      breed: 'Sahiwal',
      date: '2024-01-19',
      score: 85.7,
      status: 'pending',
      confidence: 87.2
    },
    {
      id: 'ATC-001238',
      breed: 'Red Sindhi',
      date: '2024-01-18',
      score: 89.4,
      status: 'synced',
      confidence: 93.1
    }
  ];

  const breeds = ['all', 'Sahiwal', 'Gir', 'Murrah', 'Red Sindhi', 'Tharparkar'];

  const getStatusBadge = (status: string) => {
    if (status === 'synced') {
      return <Badge className="bg-green-100 text-green-700">Synced</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBreed = selectedBreed === 'all' || record.breed === selectedBreed;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    return matchesSearch && matchesBreed && matchesStatus;
  });

  const pendingCount = records.filter(r => r.status === 'pending').length;

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
            <h1 className="text-lg text-green-800">Classification Records</h1>
          </div>
          <Badge className="bg-blue-100 text-blue-700">
            {filteredRecords.length} Records
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search and Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by Animal ID or Breed"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Filter by Breed" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map(breed => (
                    <SelectItem key={breed} value={breed}>
                      {breed === 'all' ? 'All Breeds' : breed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="synced">Synced</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sync Status */}
        {pendingCount > 0 && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-yellow-800">{pendingCount} records pending sync</p>
                <p className="text-sm text-yellow-600">Tap to sync with BPA system</p>
              </div>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Sync Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Records List */}
        <div className="space-y-3">
          {filteredRecords.length === 0 ? (
            <Card className="bg-white">
              <CardContent className="p-8 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No records found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-green-800">{record.id}</p>
                      <p className="text-sm text-gray-600">{record.breed}</p>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="text-gray-900">{record.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Score</p>
                      <p className={`${getScoreColor(record.score)}`}>{record.score}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Confidence</p>
                      <p className="text-gray-900">{record.confidence}%</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <h3 className="text-lg text-gray-900">Summary Statistics</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl text-green-600">{records.length}</div>
                <div className="text-sm text-gray-600">Total Records</div>
              </div>
              <div>
                <div className="text-2xl text-blue-600">
                  {(records.reduce((acc, r) => acc + r.score, 0) / records.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
              <div>
                <div className="text-2xl text-purple-600">
                  {records.filter(r => r.status === 'synced').length}
                </div>
                <div className="text-sm text-gray-600">Synced</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}