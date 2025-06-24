import React, { useEffect, useState } from "react";
import IconButton from "../../../common/IconButton.jsx";
import { IoAddCircle } from "react-icons/io5";
import { deleteClient, getAllClient } from "../../../../services/operations/photographerAPI.js";
import { useDispatch, useSelector } from "react-redux";
import CustomerModal from "./CustomerModal.jsx";
import { RxUpdate } from "react-icons/rx";
import { TiUserDeleteOutline } from "react-icons/ti";
import { setClient, setEditClient } from "../../../../slices/clientSlice.js";

const MyClients = () => {
  console.log("Reached my client");
  const { token } = useSelector((state) => state.auth);
  const { clients, editClient } = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [customerModal, setCustomerModal] = useState(false);

  useEffect(() => {
    function getClient() {
      dispatch(getAllClient(token));
    }
    getClient();
  }, []);

  useEffect(()=>{
    console.log("Clients length is", clients.length)
  },[clients])

  const editClientDetails = (clientProperties) => {
    console.log("Edit Client Details is true")
    dispatch(setEditClient(true))
    console.log("Client properties are", clientProperties)
    dispatch(setClient(clientProperties))
    setCustomerModal(true)
  }

  const deleteCustomer = async(clientId) => {
    console.log("Client Id is", clientId)
    await deleteClient(clientId, token)
    dispatch(getAllClient(token))
  }

  return (
    <section className="w-full min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-131px)] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]">
      <div className="flex justify-between pt-[50px] px-[30px] sm:px-[120px]">
        {/* No of customers */}
        <div className="flex flex-col ">
          <p className="font-sunflower text-[18px] sm:text-[36px] font-bold tracking-[1.3px] sm:tracking-[1.8px]">
            Customers
          </p>
          <p className="font-tw font-normal tracking-[2px] sm:tracking-[3px] text-[14px] sm:text-[30px] text-[#A19999] mt-[-5px]">
            {clients.length} Client
          </p>
        </div>

        {/* Add Customer Button */}
        <IconButton
          text={"Add Customer"}
          onclick={() => setCustomerModal(true)}
        />
      </div>

      {/* Customer List */}
      <ul className="flex flex-col mt-[40px] sm:mt-[90px] gap-6 pb-10 px-[30px] sm:px-[120px]">
        {clients?.map((client) => (
          <li
            key={client._id}
            className="w-full sm:mx-[170px] border bg-[rgba(255,255,255,0.1)] border-[rgba(0,0,0,0.2)] rounded-[10px]  flex font-syne text-sm sm:text-3xl items-center justify-between px-[8px] sm:px-[30px] py-[6px] sm:py-[18px]"
          >
            <p className="w-[80px] sm:w-[250px]">{client.clientName}</p>
            <p className="w-[80px] sm:w-[150px]">{client.clientNumber}</p>
            <div className="flex gap-2 items-center w-[40px] sm:w-[125px] cursor-pointer">
              <RxUpdate />
              <p onClick={() => editClientDetails(client)}>Update</p>
            </div>
            <div
              className="flex gap-2 items-center w-[40px] sm:w-[120px] cursor-pointer"
              onClick={() => deleteCustomer(client._id)}
            >
              <TiUserDeleteOutline />
              <p>Delete</p>
            </div>
          </li>
        ))}
      </ul>

      {customerModal && (
        <CustomerModal
          setCustomerModal={setCustomerModal}
          token={token}
          editClient={editClient}
        />
      )}
    </section>
  );
};

export default MyClients;
