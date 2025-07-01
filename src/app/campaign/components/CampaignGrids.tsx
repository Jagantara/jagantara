import React from "react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";

export default function CampaignGrid() {
  return (
    <BentoGrid className="mt-3">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          // Optional: Make some items span full width
          //   className={i === 3 || i === 6 ? "md:col-span-3" : ""}
        />
      ))}
    </BentoGrid>
  );
}

function Skeleton() {
  return (
    <div className="h-32 w-max-7xl rounded-xl bg-neutral-200 dark:bg-neutral-800" />
  );
}

const items = [
  {
    title: "Binance Labs",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: (
      <Image
        src={"/campaign_logos/bnb_launchpad.png"}
        width={600}
        height={250}
        className="bg-neutral-200 dark:bg-neutral-800 h-32 rounded-xl object-cover"
        alt="BNB Logo"
      />
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: (
      <Image
        src={"/campaign_logos/coinbase_logo.png"}
        width={600}
        height={250}
        className="bg-neutral-200 dark:bg-neutral-800 h-32 rounded-xl object-cover"
        alt="Coinbase Logo"
      />
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: (
      <Image
        src={"/campaign_logos/BI_logo.jpg"}
        width={600}
        height={250}
        className="bg-neutral-200 dark:bg-neutral-800 h-32 rounded-xl object-cover"
        alt="BI Logo"
      />
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: (
      <Image
        src={"/campaign_logos/seedify_logo.png"}
        width={600}
        height={250}
        className="bg-neutral-200 dark:bg-neutral-800 h-32 rounded-xl "
        alt="Seedify Logo"
      />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: (
      <Image
        src={"/campaign_logos/daomaker_logo.webp"}
        width={600}
        height={250}
        className="bg-neutral-200 dark:bg-neutral-800 h-32 rounded-xl object-cover"
        alt="DAO Maker Logo"
      />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: (
      <Image
        src={"/campaign_logos/opensea_logo.png"}
        width={600}
        height={250}
        className="bg-neutral-200 dark:bg-neutral-800 h-32 rounded-xl object-cover"
        alt="DAO Maker Logo"
      />
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: (
      <Image
        src={"/campaign_logos/uniswap_logo.jpg"}
        width={600}
        height={250}
        className="bg-neutral-200 dark:bg-neutral-800 h-32 rounded-xl "
        alt="Seedify Logo"
      />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: (
      <Image
        src={"/campaign_logos/monad_logo.png"}
        width={600}
        height={250}
        className="bg-neutral-200 dark:bg-neutral-800 h-32 rounded-xl "
        alt="Seedify Logo"
      />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
