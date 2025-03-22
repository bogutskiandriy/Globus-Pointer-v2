import { component$, useSignal } from '@builder.io/qwik';

export const Footer = component$(() => {
  const year = useSignal(new Date().getFullYear());

  return (
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4">About Us</h3>
            <p class="text-gray-400">
              This project, Globus Pointer v2, is designed to provide an intuitive and seamless user experience. 
              It leverages modern web technologies to deliver high performance and scalability, 
              empowering developers and users alike.
            </p>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="/" class="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/docs" class="text-gray-400 hover:text-white">Docs</a></li>
              <li><a href="/tutorial" class="text-gray-400 hover:text-white">Tutorial</a></li>
              <li><a href="/blog" class="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4">Contact Info</h3>
            <ul class="space-y-2 text-gray-400">
              <li>123 Street Name</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@example.com</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4">Follow Us</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {year.value} Andriy Bogutski. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});