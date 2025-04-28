"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "../../lib/utils";

// interface ImageZoomViewModalProps {
//   imgURI: string;
//   isEager?: boolean;
//   className?: string;
// }

const ImageZoomViewModal = ({ imgURI, isEager, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full border-none outline-none">
          <Image
            src={imgURI}
            alt="Product Image"
            height={500}
            width={500}
            className={cn(className)}
            loading={isEager ? "eager" : "lazy"}
            quality={100}
          />
        </DialogTrigger>
        <DialogContent
          style={{
            backgroundImage: "linear-gradient(to right, #fffff1 , #f3ece0 )",
          }}
          className="p-0 w-[90%] md:w-[60%] lg:w-[70%] rounded-[10px] border border-[--secondary-bg] overflow-auto  max-h-[80vh]"
        >
          <DialogHeader className="p-5">
            <DialogTitle className="flex justify-end">
              {/* close button */}
              <button
                onClick={() => setOpen(false)}
                className="text-black h-6 w-6 flex justify-center items-center border-2 border-[--secondary-bg] rounded-md"
              >
                <X size={16} />
              </button>
            </DialogTitle>
            <div className="w-full lg:w-[100%] overflow-y-hidden ">
              {/* show the image  */}
              <Image
                src={imgURI}
                alt="Product Image"
                height={500}
                width={500}
                // className="w-full lg:w-[90%] object-contain   rounded-[15px]  mx-auto h-[360px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px] overflow-hidden "
                className=" object-contain mx-auto "
                loading="lazy"
                quality={100}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageZoomViewModal;
