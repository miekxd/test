"use client";
import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Users, 
  LogOut,
  PlusCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const MaintenancePage = () => {
  // State for maintenance requests
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    { id: 1, unit: '301', description: 'Leaking kitchen faucet', status: 'In Progress', priority: 'Medium', date: '2025-04-01', assignedTo: 'John Plumber' },
    { id: 2, unit: '512', description: 'Air conditioning not cooling', status: 'Open', priority: 'High', date: '2025-04-03', assignedTo: 'HVAC Services' },
    { id: 3, unit: 'Common Area', description: 'Hallway light flickering on 3rd floor', status: 'Scheduled', priority: 'Low', date: '2025-03-28', assignedTo: 'ElectriCare' },
    { id: 4, unit: '208', description: 'Broken tile in bathroom', status: 'Open', priority: 'Medium', date: '2025-04-02', assignedTo: 'Unassigned' },
    { id: 5, unit: '405', description: 'Dishwasher not draining', status: 'Completed', priority: 'Medium', date: '2025-03-25', assignedTo: 'John Plumber' },
  ]);

  // Status filters
  const [statusFilter, setStatusFilter] = useState('All Requests');

  // Edge function states
  const [issueDescription, setIssueDescription] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [urgencyResult, setUrgencyResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Maintenance stats
  const stats = {
    open: 2,
    inProgress: 1,
    completed: 1,
    highPriority: 1
  };

  // Filtered requests
  let filteredRequests = maintenanceRequests;
  
  if (statusFilter === 'Open') {
    filteredRequests = maintenanceRequests.filter(request => request.status === 'Open');
  } else if (statusFilter === 'In Progress') {
    filteredRequests = maintenanceRequests.filter(request => request.status === 'In Progress');
  } else if (statusFilter === 'Completed') {
    filteredRequests = maintenanceRequests.filter(request => request.status === 'Completed');
  }

  // Check urgency with edge function
  const checkUrgency = async () => {
    if (!issueDescription || !issueLocation) {
      alert('Please enter both issue description and location');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/maintenance/urgent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          issue: issueDescription, 
          location: issueLocation 
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to check urgency');
      }
      
      const data = await response.json();
      setUrgencyResult(data);
    } catch (error) {
      console.error('Error checking urgency:', error);
      setUrgencyResult({ error: 'Failed to check urgency. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Image src="/strata-logo.png" alt="StrataSphere Logo" width={40} height={40} className="rounded" />
              <h1 className="text-xl font-bold text-gray-900">StrataSphere</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12">
            <Link href="/dashboard" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Home size={16} className="mr-2" />
              <span>Dashboard</span>
            </Link>
            <Link href="/financial" className="flex items-center px-4 h-full hover:bg-gray-700">
              <CreditCard size={16} className="mr-2" />
              <span>Financials</span>
            </Link>
            <Link href="/maintenance" className="flex items-center px-4 h-full bg-gray-900">
              <Wrench size={16} className="mr-2" />
              <span>Maintenance</span>
            </Link>
            <Link href="/documents" className="flex items-center px-4 h-full hover:bg-gray-700">
              <FileText size={16} className="mr-2" />
              <span>Documents</span>
            </Link>
            <Link href="/community" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Users size={16} className="mr-2" />
              <span>Community</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Maintenance Requests</h2>
          <button className="flex items-center space-x-1 px-3 py-2 border border-transparent rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
            <PlusCircle size={16} />
            <span>New Request</span>
          </button>
        </div>

        {/* Edge Function Demo */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center">
            <AlertCircle className="text-orange-500 mr-2" size={18} />
            <h3 className="text-lg font-medium text-gray-800">Check Maintenance Urgency (Edge Function)</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700">Issue Description</label>
                <input
                  type="text"
                  id="issue"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  placeholder="e.g. water leak, electrical problem"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  value={issueLocation}
                  onChange={(e) => setIssueLocation(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  placeholder="e.g. kitchen, common area, roof"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={checkUrgency}
                disabled={isLoading}
                className="flex items-center space-x-1 px-4 py-2 border border-transparent rounded-md bg-orange-600 text-sm font-medium text-white hover:bg-orange-700 disabled:bg-orange-300"
              >
                {isLoading ? 'Checking...' : 'Check Urgency'}
              </button>
            </div>

            {urgencyResult && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <h4 className="text-md font-medium text-gray-800 mb-2">Urgency Analysis Result:</h4>
                {urgencyResult.error ? (
                  <p className="text-red-600">{urgencyResult.error}</p>
                ) : (
                  <div>
                    <p className="flex items-center mb-1">
                      <span className="font-medium mr-2 text-black">Urgency Level:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        urgencyResult.isUrgent ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {urgencyResult.isUrgent ? 'URGENT' : 'Standard'}
                      </span>
                    </p>
                    <p className="text-black"><span className="font-medium">Recommended Response:</span> {urgencyResult.recommendedResponse}</p>
                    <p className="text-black"><span className="font-medium">Response Time:</span> {urgencyResult.responseTime}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Processed by Edge Function - results delivered with ultra-low latency
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Request Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <Wrench className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            onClick={() => setStatusFilter('All Requests')}
            className={`px-4 py-2 text-sm font-medium ${statusFilter === 'All Requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All Requests
          </button>
          <button 
            onClick={() => setStatusFilter('Open')}
            className={`px-4 py-2 text-sm font-medium ${statusFilter === 'Open' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Open
          </button>
          <button 
            onClick={() => setStatusFilter('In Progress')}
            className={`px-4 py-2 text-sm font-medium ${statusFilter === 'In Progress' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setStatusFilter('Completed')}
            className={`px-4 py-2 text-sm font-medium ${statusFilter === 'Completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Completed
          </button>
        </div>

        {/* Maintenance Requests Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map(request => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{request.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.priority === 'High' ? 'bg-red-100 text-red-800' : 
                        request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.assignedTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; 2025 StrataSphere. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white">Terms</Link>
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy</Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaintenancePage;