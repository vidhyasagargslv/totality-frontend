// app/page.tsx

import Link from 'next/link';


export default async function HeroPage() {
  

  return (
    <div className="hero bg-cover bg-center h-screen" style={{ backgroundImage: "url('./herobg.jpg')" }}>
      
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="logo mb-96">
      <img src="./logo_nobg.png" alt="logo" className='w-52 h-52 max-md:h-36 max-md:w-36' />
    </div>
    <div className="hero-content text-center max-md:mt-16">
      <div className="w-10/12 max-md:w-[83%]">
        <h1 className="herotitle mb-5 text-7xl font-bold capitalize max-md:text-[2rem] ">Find Your Perfect Home Away from Home</h1>
        <p className="mb-5 max-md:text-sm">Discover a wide range of rental properties across India. From cozy apartments to luxurious villas, we have something for everyone.</p>
        
          <Link href="/Dashboard">
            <button className="btn btn-primary">Explore Listings</button>
          </Link>
          
        
      </div>
    </div>
  </div>
  );
}


