import React from 'react'
import Navbar from '../../components/Navbar'

const Settings = () => {
  return (

    <div className='w-screen min-h-screen flex  '>
    <Navbar/>

    <div class=" ml-[25%] w-[75%] bg-background text-foreground p-4">
  <h2 class="text-2xl font-bold mb-4">Settings</h2>

  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">User Profile Settings</h3>
    <input type="text" placeholder="Name" class="input-field mb-2" />
    <input type="email" placeholder="Email" class="input-field mb-2" />
    <input type="password" placeholder="Password" class="input-field mb-2" />
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Notification Settings</h3>
    <label class="flex items-center mb-2">
      <input type="checkbox" class="form-checkbox mr-2" />
      Enable Notifications
    </label>
    <label class="flex items-center">
      <input type="checkbox" class="form-checkbox mr-2" />
      Newsletter Subscriptions
    </label>
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Theme Settings</h3>
    <select class="input-field">
      <option value="light">Light Theme</option>
      <option value="dark">Dark Theme</option>
    </select>
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Privacy Settings</h3>
    <label class="flex items-center mb-2">
      <input type="checkbox" class="form-checkbox mr-2" />
      Data Sharing Preferences
    </label>
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Account Management</h3>
    <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Link External Account</button>
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Language Preferences</h3>
    <select class="input-field">
      <option value="en">English</option>
      <option value="fr">French</option>
      <option value="es">Spanish</option>
    </select>
  </div>

  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Help and Support</h3>
    <p>Contact us at support@example.com</p>
  </div>

  <div class="flex justify-end">
    <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg mr-2">Save Changes</button>
    <button class="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg">Cancel</button>
  </div>
</div>
  </div> 

  )
}

export default Settings