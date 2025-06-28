// Events.js
import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaTag, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Dummy event data for Periplus (8 events)
  const events = [
    {
      id: '1',
      title: 'Meet & Greet with Bestselling Author',
      location: 'Periplus Grand Indonesia',
      date: 'Sab, 27 Jul 2024',
      category: 'Author Event',
      image: 'https://asset-2.tstatic.net/jakarta/foto/bank/images/diskusi-mengenai-buku-dan-film-crazy-rich-asians_20180923_161721.jpg', // Book signing
      description: 'Join us for an exclusive meet and greet session with the renowned author of "The Whispering Pages." Get your book signed and participate in a Q&A.',
      videoUrl: 'https://www.youtube.com/embed/Pj15e98w-uA'
    },
    {
      id: '2',
      title: 'Children Storytelling Adventure',
      location: 'Periplus Pondok Indah Mall',
      date: 'Min, 28 Jul 2024',
      category: 'Kids Event',
      image: 'https://www.balairungpress.com/wp-content/uploads/2018/09/image1-768x576.jpeg', // Kids reading
      description: 'Bring your little ones for a magical storytelling adventure. Our expert storyteller will bring beloved characters to life.',
      videoUrl: 'https://www.youtube.com/embed/Pj15e98w-uA'
    },
    {
      id: '3',
      title: 'Book Club Discussion: Sci-Fi Genre',
      location: 'Periplus Lotte Shopping Avenue',
      date: 'Rab, 31 Jul 2024',
      category: 'Book Club',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&h=250&q=80', // Book club
      description: 'Dive deep into the world of science fiction with our monthly book club. This month, we discuss a classic dystopian novel.',
      videoUrl: 'https://www.youtube.com/embed/Pj15e98w-uA'
    },
    {
      id: '4',
      title: 'Creative Writing Workshop',
      location: 'Periplus Pacific Place',
      date: 'Sab, 03 Agu 2024',
      category: 'Workshop',
      image: 'https://asset-2.tstatic.net/batam/foto/bank/images/Kegiatan-Nusa-Membaca-di-Gramedia-BCS-Mall-Batam.jpg', // Writing tools
      description: 'Unleash your inner writer! Learn essential techniques for storytelling, character development, and plot construction in this interactive workshop.',
      videoUrl: 'https://www.youtube.com/embed/Pj15e98w-uA'
    },
    {
      id: '5',
      title: 'Graphic Novel & Comic Book Fair',
      location: 'Periplus Gandaria City',
      date: 'Min, 04 Agu 2024',
      category: 'Fair',
      image: 'https://jurnalposmedia.com/wp-content/uploads/2024/02/1-1.jpg', // Comic books
      description: 'Explore the vibrant world of graphic novels and comic books. Discover new artists, classic tales, and exclusive editions.',
      videoUrl: 'https://www.youtube.com/embed/Pj15e98w-uA'
    },
    {
      id: '6',
      title: 'Japanese Manga & Anime Culture Day',
      location: 'Periplus Plaza Indonesia',
      date: 'Sab, 10 Agu 2024',
      category: 'Culture Event',
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=400&h=250&q=80', // Anime/Manga
      description: 'Immerse yourself in Japanese pop culture with discussions, cosplay, and special manga releases.',
      videoUrl: 'https://www.youtube.com/embed/Pj15e98w-uA'
    },
    {
      id: '7',
      title: 'Poetry Reading & Open Mic Night',
      location: 'Periplus Central Park',
      date: 'Jum, 16 Agu 2024',
      category: 'Performance',
      image: 'https://akcdn.detik.net.id/community/pasma/2024/12/02/17331506911021659594.jpg?w=350', // Poetry reading
      description: 'Share your voice or simply enjoy an evening of powerful poetry. All poets and enthusiasts welcome!',
      videoUrl: 'https://www.youtube.com/embed/Pj15e98w-uA'
    },
    {
      id: '8',
      title: 'Local Author Showcase',
      location: 'Periplus Kota Kasablanka',
      date: 'Sab, 24 Agu 2024',
      category: 'Author Event',
      image: 'https://media.suara.com/pictures/653x366/2023/12/20/36711-book-gedebook-di-periplus-tirtodipuran-istimewapeta-digital.jpg', // Local author
      description: 'Discover emerging talents from our local literary scene. Meet authors, discuss their works, and support local writing.',
      videoUrl: 'https://www.youtube.com/embed/Pj15e98w-uA'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === '' || event.location === selectedLocation;
    const matchesCategory = selectedCategory === '' || event.category === selectedCategory;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const uniqueLocations = [...new Set(events.map(event => event.location))];
  const uniqueCategories = [...new Set(events.map(event => event.category))];

  return (
    <div className="min-h-screen bg-gray-100 font-sans"> {/* Slightly lighter gray background */}
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-800 to-red-950 text-white py-24 px-6 sm:px-10 lg:px-20 overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto z-10 relative">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight">
            Find Your Next Experience
          </h1>
          <p className="text-xl sm:text-2xl font-semibold mb-10 opacity-90">
            Discover & Promote Upcoming Event
          </p>

          {/* Search and Filter Bar - Adjusted to be more prominent */}
          <div className="bg-white rounded-xl p-6 shadow-2xl flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 w-full max-w-5xl mx-auto">
            <div className="flex items-center flex-grow w-full">
              <FaSearch className="text-gray-500 ml-4 text-lg" />
              <input
                type="text"
                placeholder="Search event"
                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full lg:w-auto">
              <FaMapMarkerAlt className="text-gray-500 ml-4 text-lg" />
              <select
                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none bg-white focus:ring-2 focus:ring-red-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Any Location</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center w-full lg:w-auto">
              <FaTag className="text-gray-500 ml-4 text-lg" />
              <select
                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none bg-white focus:ring-2 focus:ring-red-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Any Category</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button className="bg-red-700 text-white p-4 rounded-lg hover:bg-red-800 transition duration-300 w-full lg:w-auto flex-shrink-0">
              <FaSearch />
            </button>
          </div>
        </div>
        {/* Background blobs/shapes (for visual appeal) */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob top-10 left-0"></div>
          <div className="absolute w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 top-40 right-20"></div>
          <div className="absolute w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000 bottom-10 left-40"></div>
        </div>
        {/* Image placeholders similar to the hero section in the example */}
        <div className="absolute top-12 right-12 z-0">
          <img
            src="https://images.unsplash.com/photo-1533668875569-8e6d231920b6?auto=format&fit=crop&w=400&q=80"
            alt="Event participant"
            className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-white transform translate-x-16 -translate-y-8"
          />
        </div>
        <div className="absolute bottom-12 right-40 z-0">
          <img
            src="https://images.unsplash.com/photo-1517409226871-3810d7a040b1?auto=format&fit=crop&w=400&q=80"
            alt="Speaker"
            className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-white transform -translate-x-12 translate-y-12"
          />
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-10 lg:px-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Upcoming Events</h2>
        <h3 className="text-2xl font-semibold text-gray-600 mb-12 text-center">Featured Events</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"> {/* Changed to 2 columns for larger screens */}
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-200"> {/* Flex layout for horizontal card */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                <img src={event.image} alt={event.title} className="w-full h-48 md:h-full object-cover" /> {/* Image takes full height in md */}
              </div>
              <div className="p-6 flex flex-col justify-between w-full md:w-3/5"> {/* Content on the right */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-gray-700 flex items-center mb-1 text-sm">
                    <FaMapMarkerAlt className="mr-2 text-red-600" /> {event.location}
                  </p>
                  <p className="text-gray-700 flex items-center mb-4 text-sm">
                    <FaCalendarAlt className="mr-2 text-red-600" /> {event.date}
                  </p>
                </div>
                <Link
                  to={`/events/${event.id}`}
                  className="block w-full text-center bg-red-700 text-white py-3 rounded-lg font-bold hover:bg-red-800 transition duration-300 text-md shadow-md mt-4" // Adjusted button size
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-600 mt-10 text-lg">No events found matching your criteria.</p>
        )}

        <div className="text-center mt-16">
          <button className="bg-red-700 text-white px-10 py-5 rounded-full font-semibold text-xl hover:bg-red-800 transition duration-300 shadow-xl">
            See More Event
          </button>
        </div>
      </div>
    </div>
  );
}