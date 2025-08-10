//App.jsx
import { useState, useEffect } from 'react'
import './App.css'
import Form from "./components/Form";
import Table from "./components/Table";
import GetStarted from "./components/Getstarted.jsx";

// Main User Management Page Component
const UserManagementPage = ({ onBackToStart }) => {
  const initialFormData = {
    name: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Filter data based on search term
  useEffect(() => {
    const filtered = tableData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [tableData, searchTerm]);

  // Auto-hide notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleFormDataChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    
    // Clear errors when user starts typing
    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Check for duplicate email (only when adding new entry)
    if (editIndex === null && formData.email.trim()) {
      const emailExists = tableData.some(item => 
        item.email.toLowerCase() === formData.email.toLowerCase()
      );
      if (emailExists) {
        newErrors.email = "Email already exists";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification("Please fix the errors below", "error");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      if (editIndex === null) {
        // Add new entry
        const newTableData = [...tableData, { ...formData, id: Date.now() }];
        setTableData(newTableData);
        showNotification("Entry added successfully!", "success");
      } else {
        // Update existing entry
        const newTableData = [...tableData];
        newTableData[editIndex] = { ...formData, id: tableData[editIndex].id };
        setTableData(newTableData);
        setEditIndex(null);
        showNotification("Entry updated successfully!", "success");
      }
      
      setFormData(initialFormData);
    } catch (error) {
      showNotification("Something went wrong. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (index) => {
    const actualIndex = tableData.findIndex(item => 
      item.id === filteredData[index].id
    );
    const clickedItem = tableData[actualIndex];
    setFormData(clickedItem);
    setEditIndex(actualIndex);
    showNotification("Editing mode activated", "info");
  };

  const handleDelete = async (index) => {
    const actualIndex = tableData.findIndex(item => 
      item.id === filteredData[index].id
    );
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTableData = tableData.filter((_, i) => i !== actualIndex);
    setTableData(newTableData);
    showNotification("Entry deleted successfully!", "success");
    setIsLoading(false);
  };

  const handleCancelEdit = () => {
    setFormData(initialFormData);
    setEditIndex(null);
    setErrors({});
    showNotification("Edit cancelled", "info");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBackToStart}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all mr-2"
                title="Back to Get Started"
              >
                ← Back
              </button>
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">👥</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-600">Manage your users efficiently</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-blue-800">
                  {tableData.length} Total Users
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="ml-2 hover:bg-black/10 rounded p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editIndex !== null ? 'Edit User' : 'Add New User'}
                </h2>
                {editIndex !== null && (
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              <Form 
                handleFormDataChange={handleFormDataChange} 
                handleSubmit={handleSubmit}
                formData={formData} 
                editIndex={editIndex}
                errors={errors}
                isLoading={isLoading}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Search Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Users List</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Showing {filteredData.length} of {tableData.length} users</span>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="p-6">
                {tableData.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users yet</h3>
                    <p className="text-gray-600 mb-4">Get started by adding your first user</p>
                    <div className="flex items-center justify-center text-blue-600">
                      <span className="text-sm">➕ Add a user using the form</span>
                    </div>
                  </div>
                ) : filteredData.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search terms</p>
                  </div>
                ) : (
                  <Table 
                    tableData={filteredData} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                    editIndex={editIndex}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Navigation
function App() {
  const [currentPage, setCurrentPage] = useState('getStarted');

  const handleGetStarted = () => {
    setCurrentPage('userManagement');
  };

  const handleBackToStart = () => {
    setCurrentPage('getStarted');
  };

  return (
    <div>
      {currentPage === 'getStarted' ? (
        <GetStarted onGetStarted={handleGetStarted} />
      ) : (
        <UserManagementPage onBackToStart={handleBackToStart} />
      )}
    </div>
  );
}

export default App;