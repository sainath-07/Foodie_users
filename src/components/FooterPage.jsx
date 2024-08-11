import React from 'react'
import { Link } from 'react-router-dom'

const FooterPage = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white  py-8 mt-8">
        <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-lg font-semibold mb-4 border-b-2"> About Us</span>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              id minima nam consectetur vitae debitis, porro placeat enim.
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 border-b-2">Quick Links</span>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                 <Link to={'/'}>Home</Link> 
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                <Link to={'/cartpage'}>cartPage</Link>   
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 border-b-2">Contact Us</span>
            <p className="text-sm">
              123, Main Street,
              <br />
              City, State, 456789
            </p>
            <p className="text-sm mt-2">Email: contact@yourwebsite.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} YourWebsite. Developed by{" "}
            <span className="font-semibold">Sainath</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default FooterPage
