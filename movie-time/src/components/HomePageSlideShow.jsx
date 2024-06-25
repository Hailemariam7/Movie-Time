import React, { useState, useEffect } from "react"
const images = [
  "./img1.JPG",
  "./img2.JPG",
  "./img3.JPG",
  "./img4.JPG",
  "./img5.JPG",
  "./img6.JPG",
  "./img7.JPG",
  "./img8.JPG",
  "./img9.JPG",
  "./img10.JPG",
  "./img11.JPG",
  "./img12.JPG",
  "./img13.JPG",
  "./img14.JPG",
  "./img15.JPG",
]

const SlideshowBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='slideshow-background'>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      />
      <div className='content'>
        <h1>Search your next film!</h1>
      </div>
    </div>
  )
}

export default SlideshowBackground
