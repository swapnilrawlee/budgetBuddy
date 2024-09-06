import React from 'react'
import Navbar from '../../components/Navbar'

const Help = () => {
  return (
    <div className='w-screen min-h-screen flex '>
    <Navbar/>
    <div class="bg-background  ml-[25%] w-[75%] text-black p-6 rounded-lg shadow-lg">
  <h1 class="text-4xl font-bold mb-6 text-black">Help Center</h1>

  <div class="flex items-center bg-input rounded-lg p-3 mb-6 shadow">
    <input type="text" placeholder="Search help topics..." class="flex-1 bg-input focus:outline-none p-2 rounded-lg" />
    <button class="text-primary ml-2 hover:text-black transition">
      <img aria-hidden="true" alt="search" src="https://placehold.co/24?text=🔍" />
    </button>
  </div>

  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-4 text-secondary">Frequently Asked Questions</h2>
    <ul>
      <li class="mb-4">
        <button class="text-primary underline hover:text-black">How do I reset my password?</button>
        <p class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </li>
      <li class="mb-4">
        <button class="text-primary underline hover:text-black">What payment methods do you accept?</button>
        <p class="text-secondary">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </li>
    </ul>
  </div>

  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-4 text-secondary">Help Topics</h2>
    <ul>
      <li><a href="#" class="text-primary underline hover:text-black">Getting Started</a></li>
      <li><a href="#" class="text-primary underline hover:text-black">Account Settings</a></li>
      <li><a href="#" class="text-primary underline hover:text-black">Troubleshooting</a></li>
    </ul>
  </div>

  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-4 text-secondary">Contact Support</h2>
    <p class="text-secondary">For further assistance, reach out to our support team via:</p>
    <ul>
      <li>Email: <a href="mailto:support@example.com" class="text-primary underline hover:text-black">support@example.com</a></li>
      <li>Phone: <span class="text-primary">1-800-123-4567</span></li>
      <li>Live Chat: <a href="#" class="text-primary underline hover:text-black">Chat Now</a></li>
    </ul>
  </div>

  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-4 text-secondary">Tutorials and Guides</h2>
    <ul>
      <li><a href="#" class="text-primary underline hover:text-black">Video Tutorials</a></li>
      <li><a href="#" class="text-primary underline hover:text-black">Step-by-Step Guides</a></li>
    </ul>
  </div>

  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-4 text-secondary">Feedback Form</h2>
    <form>
      <textarea placeholder="Enter your feedback here..." class="w-full bg-input p-3 rounded-lg focus:outline-none shadow" rows="4"></textarea>
      <button type="submit" class="bg-primary text-white p-3 rounded-lg mt-4 hover:bg-primary/80 transition">Submit</button>
    </form>
  </div>

  <div>
    <h2 class="text-2xl font-semibold mb-4 text-secondary">Community Forums</h2>
    <p class="text-secondary">Join our community forums to engage with other users:</p>
    <ul>
      <li><a href="#" class="text-primary underline hover:text-black">Visit Forums</a></li>
    </ul>
  </div>
</div>
  </div> 
  )
}

export default Help
