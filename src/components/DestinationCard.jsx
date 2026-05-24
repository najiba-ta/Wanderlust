import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BsCalendar2Date } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";

const DestinationCard = ({dest}) => {
    const {_id, imageUrl, price, country, destinationName, duration, category, description } = dest;
    return (
        <div className="border border-gray-300 shadow-2xl rounded-2xl p-2">
           <Image
           className="h-60 rounded-xl"
           src={imageUrl}
           alt={destinationName}
           height={400}
           width={400}           
           />     
           <div>
<div className="flex items-center gap-1">
               <IoLocation /><span>{country}</span>

</div>
     <div className="flex justify-between">
         <div>
        <div>
        <h2 className="font-bold text-xl">{destinationName}</h2>
      </div>
      <div className="flex items-center gap-1">
        <BsCalendar2Date />{duration}
      </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold">${price}</h3>
      </div>
     </div>
    <Link href={`/destination/${_id}`}> <Button variant="ghost" className={'mt-1 text-cyan-400'}>Book Now <MdOutlineArrowOutward/>
</Button>
</Link>
           </div>
        </div>
    );
};

export default DestinationCard;