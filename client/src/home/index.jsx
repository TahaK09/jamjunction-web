import React from "react";
import Header from "../components/custom/header.jsx";
import bgVideo from "../assets/bg-video.mp4";

function Home() {
  const categories = [
    {
      name: "Music",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#a259ff"
        >
          <path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z" />
        </svg>
      ),
    },
    {
      name: "Festival",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fed400"
        >
          <path d="m80-80 200-560 360 360L80-80Zm132-132 282-100-182-182-100 282Zm370-246-42-42 224-224q32-32 77-32t77 32l24 24-42 42-24-24q-14-14-35-14t-35 14L582-458ZM422-618l-42-42 24-24q14-14 14-34t-14-34l-26-26 42-42 26 26q32 32 32 76t-32 76l-24 24Zm80 80-42-42 144-144q14-14 14-35t-14-35l-64-64 42-42 64 64q32 32 32 77t-32 77L502-538Zm160 160-42-42 64-64q32-32 77-32t77 32l64 64-42 42-64-64q-14-14-35-14t-35 14l-64 64ZM212-212Z" />
        </svg>
      ),
    },
    {
      name: "Parties",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#4ec6ff"
        >
          <path d="M240-120v-80h200v-200L120-760v-80h720v80L520-400v200h200v80H240Zm58-560h364l72-80H226l72 80Zm182 204 111-124H369l111 124Zm0 0Z" />
        </svg>
      ),
    },
    {
      name: "Sports",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fd6c4b"
        >
          <path d="M480-480ZM362-202 202-362q-3 38-1.5 79t7.5 73q23 7 69.5 9t84.5-1Zm96-16q59-13 106-37t82-59q34-34 58-80.5T742-500L500-742q-57 14-103 38.5T316-644q-35 35-59.5 81.5T218-458l240 240Zm-62-122-56-56 224-224 56 56-224 224Zm362-256q4-39 2.5-81t-8.5-73q-23-8-69.5-10t-84.5 2l160 162ZM310-120q-57 0-104-8.5T148-148q-11-12-19.5-60T120-314q0-119 36-220.5T258-702q66-66 169-102t223-36q58 0 104.5 8.5T812-812q11 12 19.5 60t8.5 108q0 117-36 218.5T702-258q-65 65-168 101.5T310-120Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="home-container flex flex-col w-screen h-screen items-center justify-center">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          src={bgVideo}
        ></video>
        <div className="overlay"></div>
        <div className="content w-full pb-10 bg-gradient-to-b from-transparent via-black/50 to-black text-white text-3xl asimovian-regular flex flex-col items-center justify-center">
          JamJunction
          <div className="text-sm font-light mt-2 figtree w-60 text-center">
            Register for Shaan-e-Shukoon happening on 22th Sept!
          </div>
          <button className="mt-10 w-auto px-3 py-2 rounded-full text-sm figtree bg-violet-700">
            Book the latest Event!
          </button>
        </div>
      </div>

      <div className="px-4 py-6 bg-gray-900 w-full h-auto">
        <h2 className="text-lg font-bold mb-4 text-white">Categories</h2>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <>
              <div className="flex flex-col items-center" key={cat.name}>
                <div className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition rounded-full w-16 h-16 cursor-pointer">
                  <div className="text-white">{cat.icon}</div>
                </div>
                <div className="mt-1 text-sm text-white">{cat.name}</div>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Most Loved Event in the year - https://www.behance.net/gallery/228337387/Quirra-Event-booking?tracking_source=search_projects|event+booking&l=12 */}
    </>
  );
}

export default Home;
