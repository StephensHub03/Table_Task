//Table.jsx
import React, { useState } from 'react'

const Table = ({ tableData, handleEdit, handleDelete, isLoading, editIndex }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleDeleteClick = (index) => {
    setDeleteConfirm(index);
  };

  const confirmDelete = (index) => {
    handleDelete(index);
    setDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center space-x-2">
                <span>👤</span>
                <span>Name</span>
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>Email</span>
              </div>
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tableData.map((data, idx) => {
            const isEditing = editIndex !== null && tableData[editIndex]?.id === data.id;
            const isDeleting = deleteConfirm === idx;
            
            return (
              <tr 
                key={data.id || idx}
                className={`transition-all duration-200 ${
                  isEditing 
                    ? 'bg-blue-50 border-l-4 border-blue-500' 
                    : hoveredRow === idx 
                    ? 'bg-gray-50' 
                    : 'bg-white'
                } ${isDeleting ? 'bg-red-50' : ''}`}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Name Column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {data.name ? data.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {data.name}
                        {isEditing && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ✏️ Editing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email Column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{data.email}</div>
                  <div className="text-sm text-gray-500">
                    {data.email.includes('@') ? `@${data.email.split('@')[1]}` : ''}
                  </div>
                </td>

                {/* Actions Column */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isDeleting ? (
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-sm text-red-600 mr-3">Delete this user?</span>
                      <button
                        onClick={() => confirmDelete(idx)}
                        disabled={isLoading}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? '⏳' : '✓ Yes'}
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        ✕ No
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(idx)}
                        disabled={isLoading || isEditing}
                        className={`inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md transition-all ${
                          isEditing
                            ? 'text-blue-600 bg-blue-100 cursor-default'
                            : 'text-blue-600 hover:text-blue-900 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        } disabled:opacity-50`}
                        title={isEditing ? 'Currently editing' : 'Edit user'}
                      >
                        <span className="mr-1">✏️</span>
                        {isEditing ? 'Editing' : 'Edit'}
                      </button>
                      
                      <button
                        onClick={() => handleDeleteClick(idx)}
                        disabled={isLoading || isEditing}
                        className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-red-600 hover:text-red-900 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
                        title="Delete user"
                      >
                        <span className="mr-1">🗑️</span>
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Table Footer with Stats */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Total: {tableData.length} users</span>
            {editIndex !== null && (
              <span className="text-blue-600 font-medium">• Edit mode active</span>
            )}
          </div>
          <div className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;