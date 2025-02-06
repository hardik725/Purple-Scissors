import React, { useEffect,useState } from 'react'

const ServiceSection = () => {
  const [hairService, setHairService] = useState([]);
  const [makeupService, setMakeUpService] = useState([]);
  const [faceService, setFaceService] = useState([]);
  const [essentialService, setEssentialService] = useState([]);
  
  const apiCategories = [
    { key: "Hair", setter: setHairService },
    { key: "MakeUp", setter: setMakeUpService },
    { key: "Face", setter: setFaceService },
    { key: "Essentials", setter: setEssentialService }
  ];

  const fetchData = async (category, setter) => {
    try {
      const response = await fetch("https://purple-scissors.onrender.com/service/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Category: category }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} services`);
      }

      const data = await response.json();
      setter(data.services);
    } catch (error) {
      console.error(`Error fetching ${category} services:`, error);
    }
  };

  useEffect(() => {
    apiCategories.forEach(({ key, setter }) => fetchData(key, setter));
  }, []);


  return (
    <div className='h-[55rem] w-full font-kugile text-xl flex items-center justify-center text-white text-center bg-gradient-radial from-[#B369D8] via-black to-black'>This is Service Section under build</div>
  )
}

export default ServiceSection