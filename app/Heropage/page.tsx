import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function HeroPage() {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/herobg.jpg"
          as="image"
        />
      </Head>
      <div className="hero bg-cover bg-center h-screen relative">
        <Image
          src="/herobg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
        />
        <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
        <div className="logo mb-96 relative z-10">
          <Image
            src="/logo_nobg.png"
            alt="logo"
            width={208}
            height={208}
            className="max-md:h-36 max-md:w-36"
          />
        </div>
        <div className="hero-content text-center max-md:mt-16 relative z-10">
          <div className="w-10/12 max-md:w-[83%]">
            <h1 className="herotitle mb-5 text-7xl font-bold capitalize max-md:text-[2rem]">
              Find Your Perfect Home Away from Home
            </h1>
            <p className="mb-5 max-md:text-sm">
              Discover a wide range of rental properties across India. From cozy apartments to luxurious villas, we have something for everyone.
            </p>
            <Link href="/Dashboard">
              <button className="btn btn-primary">Explore Listings</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}