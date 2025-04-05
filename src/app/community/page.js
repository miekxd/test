"use client";
import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Users, 
  LogOut,
  Bell,
  Calendar,
  Mail,
  Phone,
  User,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CommunityPage = () => {
  // Announcements data
  const [announcements, setAnnouncements] = useState([
    { 
      id: 1, 
      title: 'Annual General Meeting', 
      date: '2025-05-15', 
      content: 'The Annual General Meeting will be held on May 15, 2025 at 7:00 PM in the community room. All owners are encouraged to attend.', 
      priority: 'High' 
    },
    { 
      id: 2, 
      title: 'Maintenance Notice - Water Shutdown', 
      date: '2025-04-12', 
      content: 'There will be a scheduled water shutdown on April 12, 2025 from 9:00 AM to 12:00 PM for routine maintenance work.', 
      priority: 'Medium' 
    },
    { 
      id: 3, 
      title: 'New Garden Area Rules', 
      date: '2025-04-01', 
      content: 'Please note that updated garden area usage rules have been established. See the attached document for details.', 
      priority: 'Low' 
    }
  ]);

  // Events data
  const [events, setEvents] = useState([
    { id: 1, title: 'Annual General Meeting', date: '2025-05-15', time: '19:00', location: 'Community Room' },
    { id: 2, title: 'Community BBQ', date: '2025-04-25', time: '17:00', location: 'Garden Area' },
    { id: 3, title: 'Building Inspection', date: '2025-04-20', time: '10:00', location: 'Common Areas' }
  ]);

  // Residents data
  const [residents, setResidents] = useState([
    { id: 1, unit: '101', name: 'Michael Smith', type: 'Owner', email: 'michael@example.com', phone: '0412 345 678' },
    { id: 2, unit: '102', name: 'Sarah Johnson', type: 'Owner', email: 'sarah@example.com', phone: '0413 456 789' },
    { id: 3, unit: '201', name: 'David Chen', type: 'Owner', email: 'david@example.com', phone: '0414 567 890' }
  ]);

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
            <Link href="/maintenance" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Wrench size={16} className="mr-2" />
              <span>Maintenance</span>
            </Link>
            <Link href="/documents" className="flex items-center px-4 h-full hover:bg-gray-700">
              <FileText size={16} className="mr-2" />
              <span>Documents</span>
            </Link>
            <Link href="/community" className="flex items-center px-4 h-full bg-gray-900">
              <Users size={16} className="mr-2" />
              <span>Community</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Community Portal</h2>
          <button className="flex items-center space-x-1 px-3 py-2 border border-transparent rounded-md bg-purple-600 text-sm font-medium text-white hover:bg-purple-700">
            <MessageCircle size={16} />
            <span>Send Announcement</span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Announcements */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
              <Bell className="text-purple-500 mr-2" size={18} />
              <h3 className="text-md font-medium text-gray-800">Announcements</h3>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-gray-200">
                {announcements.map(announcement => (
                  <li key={announcement.id} className="p-4 hover:bg-gray-50">
                    <div className="flex">
                      <div className={`flex-shrink-0 h-3 w-3 rounded-full mt-2 mr-3 ${
                        announcement.priority === 'High' ? 'bg-red-500' : 
                        announcement.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900">{announcement.title}</h4>
                          <span className="ml-2 text-xs text-gray-500">{new Date(announcement.date).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
                        <button className="mt-1 text-xs font-medium text-purple-600 hover:text-purple-800 flex items-center">
                          Read More
                          <ChevronRight size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
              <Calendar className="text-blue-500 mr-2" size={18} />
              <h3 className="text-md font-medium text-gray-800">Upcoming Events</h3>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-gray-200">
                {events.map(event => (
                  <li key={event.id} className="p-4 hover:bg-gray-50">
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-800 rounded-md flex flex-col items-center justify-center mr-4">
                        <span className="text-xs font-medium">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-lg font-bold">{new Date(event.date).getDate()}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <p className="text-xs text-gray-500">{event.time} • {event.location}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <button className="w-full py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50">
                  Add Event
                </button>
              </div>
            </div>
          </div>

          {/* Residents Directory */}
          <div className="bg-white rounded-lg shadow lg:col-span-2">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Users className="text-green-500 mr-2" size={18} />
                <h3 className="text-md font-medium text-gray-800">Residents Directory</h3>
              </div>
              <button className="text-sm text-green-600 hover:text-green-800 flex items-center">
                Add Resident
                <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {residents.map(resident => (
                    <tr key={resident.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Unit {resident.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{resident.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          resident.type === 'Owner' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {resident.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <a href={`mailto:${resident.email}`} className="text-gray-500 hover:text-blue-500">
                            <Mail size={16} />
                          </a>
                          <a href={`tel:${resident.phone}`} className="text-gray-500 hover:text-green-500">
                            <Phone size={16} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Committee */}
          <div className="bg-white rounded-lg shadow lg:col-span-2">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
              <Mail className="text-orange-500 mr-2" size={18} />
              <h3 className="text-md font-medium text-gray-800">Contact Committee</h3>
            </div>
            <div className="p-4">
              <form className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black border p-2"
                    placeholder="Enter message subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black border p-2"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
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

export default CommunityPage;