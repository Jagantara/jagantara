// components/InfiniteLogoLoop.tsx
import Image from "next/image"; // Make sure to import Image from next/image

export default function InfiniteLogoLoop() {
  const logos = [
    {
      src: "/backing_img/ojk_logo.png",
      alt: "OJK Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/BI_Logo.png",
      alt: "BI Logo",
      width: 250,
      height: 150,
    },
    {
      src: "/backing_img/bappebti-logo-png.png",
      alt: "Bappebti Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/indodax_logo.png",
      alt: "Indodax Logo",
      width: 250,
      height: 150,
      className: "pb-3",
    },

    {
      src: "/backing_img/Logo-xellar.png",
      alt: "Xellar Logo",
      width: 150,
      height: 150,
    },

    {
      src: "/backing_img/Web3auth-Logo.png",
      alt: "Web3Auth Logo",
      width: 150,
      height: 150,
    },
    {
      src: "/backing_img/transak-logo.png",
      alt: "Transak Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/metamask-logo.png",
      alt: "MetaMask Logo",
      width: 150,
      height: 150,
    },
    {
      src: "/backing_img/blockdev-logo.png",
      alt: "BlockDev Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/logo-binance-indonesia.png",
      alt: "Binance Indonesia Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/etherscan-logo.svg",
      alt: "EtherScan Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/etherscan-logo.svg",
      alt: "EtherScan Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/coinbase-logo.png",
      alt: "Coinbase Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/coinmarketcap-logo.png",
      alt: "CoinMarketCap Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/cointelegraph-logo.png",
      alt: "CoinTelegraph Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/kucoin-logo.png",
      alt: "KuCoin Logo",
      width: 200,
      height: 150,
    },
    {
      src: "/backing_img/hotbit-logo.png",
      alt: "Hotbit Logo",
      width: 200,
      height: 150,
    },
  ];

  return (
    <section className="w-full md:mx-6 py-20 flex flex-col justify-center items-center gap-15 overflow-hidden">
      <h1 className="text-4xl font-normal text-center mb-10 pt-32">
        Backed by trusted names in finance
      </h1>
      <div className="relative w-full flex items-center justify-center">
        <div className="flex animate-loop-scroll space-x-10 py-4">
          {/* Duplicate logos to create a seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className={`flex-shrink-0 flex items-center ${logo.className || ""}`}
            >
              <Image
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes loop-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(
              -50%
            ); /* Move half the total width of duplicated logos */
          }
        }
        .animate-loop-scroll {
          animation: loop-scroll 30s linear infinite; /* Adjust duration as needed */
        }
      `}</style>
    </section>
  );
}
