import { useState } from 'react';
import { toast } from 'sonner';
import Layout from '../components/Layout';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    systemName: 'Credit Jambo Admin',
    maxDevicesPerUser: 5,
    sessionTimeout: 30,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    toast.success('Settings saved successfully');
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
        </div>

        {/* General Settings */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">General Settings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Basic system configuration options.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">System Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={settings.systemName}
                    onChange={(e) => handleInputChange('systemName', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-md"
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Max Devices per User</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    value={settings.maxDevicesPerUser}
                    onChange={(e) => handleInputChange('maxDevicesPerUser', parseInt(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-md"
                    min="1"
                    max="10"
                  />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Session Timeout (minutes)</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-md"
                    min="5"
                    max="480"
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Settings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Configure how the system sends notifications.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email Notifications</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2">Enable email notifications for system events</span>
                  </label>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">SMS Notifications</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2">Enable SMS notifications for critical alerts</span>
                  </label>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* System Maintenance */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">System Maintenance</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Maintenance and system control options.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Maintenance Mode</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2">Enable maintenance mode (users cannot access the system)</span>
                  </label>
                  {settings.maintenanceMode && (
                    <p className="mt-2 text-sm text-red-600">
                      ⚠️ System is in maintenance mode. Users will see a maintenance page.
                    </p>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setSettings({
              systemName: 'Credit Jambo Admin',
              maxDevicesPerUser: 5,
              sessionTimeout: 30,
              emailNotifications: true,
              smsNotifications: false,
              maintenanceMode: false,
            })}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;