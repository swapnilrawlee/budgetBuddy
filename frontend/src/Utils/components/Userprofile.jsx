import React, { useContext } from 'react'
import Navbar from '../../components/Navbar'
import { UserContext } from '../userContext';

const Userprofile = () => {
  const { userdata } = useContext(UserContext);

  return (
    <div className='w-screen min-h-screen flex  '>
    <Navbar/>
    <div class="  ml-[25%] w-[75%] bg-background  p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
  <h2 class="text-3xl font-bold mb-6 text-accent">Profile</h2>

  <div class="flex items-center space-x-4 mb-6">
    <img src="https://placehold.co/50" alt="profile-picture" class="w-16 h-16 rounded-full border-2 border-primary" />
    <div>
      <p class="font-semibold text-primary text-lg">{userdata.name}</p>
      <p class="text-muted-foreground">{userdata.email}</p>
    </div>
  </div>

  <div class="mb-6">
    <button class="bg-secondary text-secondary-foreground px-5 py-2 rounded-md hover:bg-secondary/80 transition">Edit Profile</button>
    <button class="bg-secondary text-secondary-foreground px-5 py-2 rounded-md hover:bg-secondary/80 transition">Change Password</button>
  </div>

  <div class="mb-6">
    <h3 class="text-xl font-semibold mb-3 text-accent">Account Settings</h3>
    <ul class="text-secondary-foreground space-y-1">
      <li class="hover:text-accent transition">Security Settings</li>
      <li class="hover:text-accent transition">Connected Accounts</li>
    </ul>
  </div>

  <div class="mb-6">
    <h3 class="text-xl font-semibold mb-3 text-accent">Activity Overview</h3>
    <p class="text-secondary-foreground">Recent Transactions, Goals, etc.</p>
  </div>

  <div class="mb-6">
    <h3 class="text-xl font-semibold mb-3 text-accent">Privacy Settings</h3>
    <label for="profile-visibility" class="block text-secondary-foreground mb-1">Profile Visibility</label>
    <select id="profile-visibility" class="w-full bg-input text-input border border-border rounded-md p-2 hover:border-accent transition">
      <option value="public">Public</option>
      <option value="private">Private</option>
    </select>
  </div>

  <div class="mb-6">
    <h3 class="text-xl font-semibold mb-3 text-accent">Notifications</h3>
    <label for="email-notifications" class="block text-secondary-foreground mb-1">Email Notifications</label>
    <input type="checkbox" id="email-notifications" class="form-checkbox h-5 w-5 text-primary focus:ring-2 focus:ring-accent" />
  </div>

  <div class="mb-6">
    <h3 class="text-xl font-semibold mb-3 text-accent">Subscription Information</h3>
    <p class="text-secondary-foreground">No active subscription</p>
  </div>

  <div class="flex justify-end">
    <button class="bg-primary text-white px-5 py-2 rounded-md mr-3 hover:bg-primary/80 transition">Save Changes</button>
    <button class="bg-red-600 text-red-100 px-5 py-2 rounded-md hover:bg-destructive/80 transition">Cancel</button>
  </div>
</div>
  </div>   )
}

export default Userprofile