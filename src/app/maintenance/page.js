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
  AlertTriangle
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
  const [statusFilter, setStatusFilter] = useState('All');

  // Filtered requests
  const filteredRequests = statusFilter === 'All' 
    ? maintenanceRequests 
    : maintenanceRequests.filter(request => request.status === statusFilter);

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

        {/* Request Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-2xl font-bold text-gray-900">{maintenanceRequests.filter(r => r.status === 'Open').length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{maintenanceRequests.filter(r => r.status === 'In Progress').length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{maintenanceRequests.filter(r => r.status === 'Completed').length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{maintenanceRequests.filter(r => r.priority === 'High').length}</p>
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
            onClick={() => setStatusFilter('All')}
            className={`px-4 py-2 text-sm font-medium ${statusFilter === 'All' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
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
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Unit {request.unit}</td>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(request.date).toLocaleDateString()}</td>
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
      <footer className="bg-gray-800 text-white py-6 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2025 StrataSphere. All rights reserved.</p>
              <p className="text-xs text-gray-400 mt-1">Compliant with NSW Strata Schemes Management Act (2015)</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white">Terms of Service</Link>
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaintenancePage;