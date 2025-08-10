//Form.jsx
import React from 'react'

const Form = ({ 
  handleFormDataChange, 
  handleSubmit, 
  formData, 
  editIndex, 
  errors = {}, 
  isLoading = false, 
  onCancel 
}) => {
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => {
                const { value } = e.target;
                handleFormDataChange("name", value);
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 ${
                errors.name 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }`}
              disabled={isLoading}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-600 flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => {
                const { value } = e.target;
                handleFormDataChange("email", value);
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }`}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.email}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              editIndex !== null
                ? 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <>
                <span className="mr-2">⏳</span>
                Processing...
              </>
            ) : editIndex !== null ? (
              <>
                <span className="mr-2">✏️</span>
                Update User
              </>
            ) : (
              <>
                <span className="mr-2">➕</span>
                Add User
              </>
            )}
          </button>
          
          {editIndex !== null && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="mr-2">✕</span>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Form Helper Text */}
      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <span>💡</span>
          <div>
            <p className="font-medium mb-1">Tips:</p>
            <ul className="space-y-1">
              <li>• Name must be at least 2 characters long</li>
              <li>• Email must be a valid email address</li>
              <li>• Email addresses must be unique</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Form State (for development/debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs bg-blue-50 rounded-lg p-3">
          <p className="font-medium text-blue-800 mb-2">🔧 Form State (Dev Mode):</p>
          <div className="space-y-1 text-blue-700">
            <p>Mode: {editIndex !== null ? `Editing (Index: ${editIndex})` : 'Adding New'}</p>
            <p>Name: "{formData.name}"</p>
            <p>Email: "{formData.email}"</p>
            <p>Has Errors: {Object.keys(errors).length > 0 ? 'Yes' : 'No'}</p>
            <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;