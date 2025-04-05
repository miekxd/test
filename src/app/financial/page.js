"use client";
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Users, 
  LogOut,
  DollarSign,
  Building,
  AlertCircle,
  Calendar,
  Save,
  Search
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const FinancialManagement = () => {
  // State for fund balances
  const [funds, setFunds] = useState({
    adminFund: 125842.00,
    capitalWorksFund: 347910.00
  });

  // State for outstanding levies
  const [outstandingLevies, setOutstandingLevies] = useState([
    { id: 1, unit: '203', owner: 'James Wilson', amount: 3200.00, dueDate: '2025-03-31', status: 'overdue' },
    { id: 2, unit: '512', owner: 'Emma Thompson', amount: 4500.00, dueDate: '2025-03-31', status: 'overdue' },
    { id: 3, unit: '107', owner: 'Robert Garcia', amount: 3200.00, dueDate: '2025-03-31', status: 'overdue' }
  ]);

  // State for upcoming expenses
  const [upcomingExpenses, setUpcomingExpenses] = useState([
    { id: 1, description: 'Building Insurance Renewal', amount: 42500.00, dueDate: '2025-06-15', fund: 'admin' },
    { id: 2, description: 'Quarterly Maintenance Contract', amount: 18750.00, dueDate: '2025-04-30', fund: 'admin' },
    { id: 3, description: 'Lobby Renovation Project', amount: 65000.00, dueDate: '2025-07-01', fund: 'capital' }
  ]);

  // State for status messages
  const [postStatusMessage, setPostStatusMessage] = useState('');
  const [getStatusMessage, setGetStatusMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Check URL for status parameters on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const statusCode = urlParams.get('status');
    
    if (success === 'true' && statusCode) {
      setPostStatusMessage(`Transaction submitted successfully! Status code: ${statusCode}`);
    }
  }, []);

  // Handle GET form submission
  const handleGetSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fund = formData.get('fund');
    const type = formData.get('type');
    
    // Build query string
    let queryString = '?';
    if (fund) queryString += `fund=${fund}&`;
    if (type) queryString += `type=${type}&`;
    
    try {
      // In a real app, this would be a fetch to your API
      // For demo purposes, we'll set a mock response
      setGetStatusMessage('Search completed! Status code: 200 OK');
      
      // Mock search results
      setSearchResults([
        { id: 1, description: 'Example Transaction 1', amount: 1000.00, date: '2025-04-01', fund: 'admin', type: 'expense' },
        { id: 2, description: 'Example Transaction 2', amount: 2500.00, date: '2025-04-02', fund: 'capital', type: 'expense' },
        { id: 3, description: 'Example Transaction 3', amount: 1500.00, date: '2025-04-03', fund: 'admin', type: 'income' }
      ]);
    } catch (error) {
      setGetStatusMessage('Error searching transactions. Status code: 500 Internal Server Error');
    }
  };

  // Handle POST form submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would submit to your API
    // For demo purposes, we'll just show a success message
    setPostStatusMessage('Transaction created successfully! Status code: 201 Created');
  };

  // Format money
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
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
            <Link href="/financial" className="flex items-center px-4 h-full bg-gray-900">
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
            <Link href="/community" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Users size={16} className="mr-2" />
              <span>Community</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Management</h2>
        
        {/* Fund Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Admin Fund */}
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Administration Fund</h3>
              <CreditCard className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatMoney(funds.adminFund)}</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: April 1, 2025</p>
          </div>
          
          {/* Capital Works Fund */}
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Capital Works Fund</h3>
              <Building className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatMoney(funds.capitalWorksFund)}</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: April 1, 2025</p>
          </div>
        </div>
        
        {/* Outstanding Levies */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">Outstanding Levies</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Due</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {outstandingLevies.map(levy => (
                  <tr key={levy.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Unit {levy.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{levy.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">{formatMoney(levy.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(levy.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {levy.status.charAt(0).toUpperCase() + levy.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Upcoming Expenses */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">Upcoming Expenses</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingExpenses.map(expense => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">{formatMoney(expense.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(expense.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        expense.fund === 'admin' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {expense.fund === 'admin' ? 'Admin Fund' : 'Capital Works Fund'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* POST Form */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Add New Transaction (POST)</h3>
          </div>
          <div className="p-5">
            {postStatusMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                {postStatusMessage}
              </div>
            )}
            
            <form onSubmit={handlePostSubmit} method="post" action="/api/transactions" className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  placeholder="Enter transaction description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      step="0.01"
                      className="pl-7 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fund" className="block text-sm font-medium text-gray-700">Fund</label>
                  <select
                    id="fund"
                    name="fund"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  >
                    <option value="admin">Administration Fund</option>
                    <option value="capital">Capital Works Fund</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Transaction Type</label>
                  <select
                    id="type"
                    name="type"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* GET Form */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Search Transactions (GET)</h3>
          </div>
          <div className="p-5">
            {getStatusMessage && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md">
                {getStatusMessage}
              </div>
            )}
            
            <form onSubmit={handleGetSubmit} method="get" action="/api/transactions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="search_fund" className="block text-sm font-medium text-gray-700">Fund Type</label>
                  <select
                    id="search_fund"
                    name="fund"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  >
                    <option value="">All Funds</option>
                    <option value="admin">Administration Fund</option>
                    <option value="capital">Capital Works Fund</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="search_type" className="block text-sm font-medium text-gray-700">Transaction Type</label>
                  <select
                    id="search_type"
                    name="type"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  >
                    <option value="">All Types</option>
                    <option value="expense">Expenses</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Transactions
                </button>
              </div>
            </form>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">Search Results</h4>
                <div className="overflow-x-auto border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {searchResults.map(result => (
                        <tr key={result.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{result.description}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatMoney(result.amount)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{result.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{result.fund}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{result.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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

export default FinancialManagement;
