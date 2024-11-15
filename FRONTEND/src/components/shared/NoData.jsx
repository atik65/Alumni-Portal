import noDataImg from "/public/assets/no-data.png";
import Image from "next/image";

const NoData = () => {
  return (
    <div className="text-black text-center">
      <Image
        className="w-32 md:w-40 mx-auto"
        src={noDataImg}
        alt="No data found"
      />
      <div className="text-center text-xl sm:text-2xl font-bold">
        No Data Found
      </div>
    </div>
  );
};

export default NoData;
