import React, { useEffect, useState } from "react";
import InwardsTable from "./InwardTable";
import OutwardsTable from "./OurwardTable";
import Navbar from "../../components/Navbar";
import Passes from "../Passes";
import { getGoods } from "../../api";

const GoodsInOut = () => {
  const [page, setPage] = useState("Inwards");
  const [goodsIn, setGoodsIn] = useState([]);
  const [goodsOut, setGoodsOut] = useState([]);
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const goodsRes = await getGoods();
        const filterGoodsIn = goodsRes.data.filter(
          good => good.ward_type === "in"
        );
        const filterGoodsOut = goodsRes.data.filter(
          (good) => good.ward_type === "out"
        );
        setGoodsIn(filterGoodsIn);
        setGoodsOut(filterGoodsOut);
        console.log(goodsRes.data)
        console.log(filterGoodsIn)
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoods()
  }, []);
  return (
    <div className="visitors-page">
      <section className="flex">
        <Navbar />
        <div className=" w-full flex mx-3 flex-col overflow-hidden">
          <Passes />
          <div className="flex w-full  m-2">
            <div className="md:flex md:flex-row flex-col gap-5 text-lg font-semibold  w-full border-b">
              <div className="flex w-full space-x-4  ">
                <h2
                  className={`p-2 ${
                    page === "Inwards"
                      ? "text-blue-500 shadow-custom-all-sides rounded-t-md"
                      : "text-black"
                  }   px-4 cursor-pointer text-center text-sm`}
                  onClick={() => setPage("Inwards")}
                >
                  Inwards
                </h2>
                <h2
                  className={`p-2 ${
                    page === "Outwards"
                      ? "text-blue-500 shadow-custom-all-sides rounded-t-md"
                      : "text-black"
                  }  px-4 cursor-pointer text-center text-sm`}
                  onClick={() => setPage("Outwards")}
                >
                  Outwards
                </h2>
              </div>
            </div>
          </div>

          {page === "Inwards" && <InwardsTable goodsIn={goodsIn} />}

          {page === "Outwards" && (
            <div>
              <OutwardsTable goodsOut={goodsOut} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GoodsInOut;
