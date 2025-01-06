import React, { useEffect, useState } from "react";
import { domainPrefix, getPantryDetails } from "../../../api";
import { useParams } from "react-router-dom";

const PantryDetails = () => {
    const { id } = useParams();
    const [pantryData, setPantryData] = useState("");
    useEffect(() => {
        const fetchPantry = async () => {
            try {
                const invResp = await getPantryDetails(id);


                setPantryData(invResp.data)
                console.log(invResp);
            } catch (error) {
                console.log(error)
            }
        };
        fetchPantry();
    }, []);
    return (
        <div className="flex items-center">
            <div className="flex flex-col border-2 rounded-md border-gray-400 w-full mx-10 my-5 p-4">
                <div className="flex justify-end  my-2">
                    <button className="bg-green-400 p-1 px-4 rounded-md text-white font-medium">Order</button>
                </div>

                <div className="grid md:grid-cols-3 gap-2 my-2">
                    <div className="grid gap-1">
                        <p className="font-semibold">Name :</p>
                        <p>{pantryData.item_name}</p>
                    </div>
                    <div className="grid gap-1">
                        <p className="font-semibold">Available Stock :</p>
                        <p>{pantryData.stock}</p>
                    </div>
                </div>
                <div className="grid gap-1">
                    <p className="font-semibold">Description :</p>
                    <p className="bg-gray-300 p-1 rounded-md">
                        {pantryData.description}
                    </p>
                </div>
                <span className="font-medium text-black">
                    Attachments :
                </span>
                <div className="flex gap-4 flex-wrap my-4 items-center text-center">
                    {pantryData.pantries_attachments?.length > 0 ? (
                        pantryData.pantries_attachments.map(
                            (attachment, i) => (
                                <img
                                    key={i}
                                    src={domainPrefix + attachment.document}
                                    alt={`Attachment ${i + 1}`}
                                    className="w-40 h-28 object-cover rounded-md"
                                    onClick={() =>
                                        window.open(
                                            domainPrefix + attachment.document,
                                            "_blank"
                                        )
                                    }
                                />
                            )
                        )
                    ) : (
                        <p>No Attachments</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PantryDetails;
