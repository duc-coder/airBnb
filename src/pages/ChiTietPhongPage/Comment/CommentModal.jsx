import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";
import Modal from "../../../components/Modal/Modal";
export default function CommentModal({ isModalOpen, toggleModal }) {
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);

    return (
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
            <Dialog.Panel className="w-full md:max-w-[45rem] max-w-[25rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center p-5 border-b"
                >
                    Toàn bộ đánh giá
                </Dialog.Title>
                <div className="mt-2 h-[75vh] overflow-y-scroll">
                    <div className="px-5 grid md:grid-cols-1 mt-10  lg:grid-cols-2 gap-10">
                        {danhSachDanhGia.length > 1 &&
                            danhSachDanhGia.map((danhGia, index) => {
                                // console.log(danhGia);
                                return (
                                    <CommentItem
                                        key={index}
                                        data={danhGia}
                                        needTruncate={false}
                                    ></CommentItem>
                                );
                            })}
                    </div>
                </div>

                <div className="py-4 px-5 border-t">
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out"
                            onClick={toggleModal}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </Dialog.Panel>
        </Modal>
        // <>
        //   <Transition appear show={isModalOpen} as={Fragment}>
        //     <Dialog as="div" className="relative z-10" onClose={toggleModal}>
        //       <Transition.Child
        //         as={Fragment}
        //         enter="ease-out duration-300"
        //         enterFrom="opacity-0"
        //         enterTo="opacity-100"
        //         leave="ease-in duration-200"
        //         leaveFrom="opacity-100"
        //         leaveTo="opacity-0"
        //       >
        //         <div className="fixed inset-0 bg-black bg-opacity-25" />
        //       </Transition.Child>

        //       <div className="fixed inset-0 overflow-y-auto">
        //         <div className="flex min-h-full items-center justify-center p-4 text-center">
        //           <Transition.Child
        //             as={Fragment}
        //             enter="ease-out duration-300"
        //             enterFrom="opacity-0 scale-95"
        //             enterTo="opacity-100 scale-100"
        //             leave="ease-in duration-200"
        //             leaveFrom="opacity-100 scale-100"
        //             leaveTo="opacity-0 scale-95"
        //           >
        //             <Dialog.Panel className="w-full max-w-4xl max-h-[500px]   overflow-y-scroll transform  rounded-2xl bg-white p-10 pr-5 text-left align-middle shadow-xl transition-all relative">
        //               <Dialog.Title
        //                 as="h3"
        //                 className="text-2xl font-medium leading-6 text-gray-900"
        //               >
        //                 <h2>Toàn bộ đánh giá</h2>
        //               </Dialog.Title>

        //               <div className="mt-10 grid grid-cols-2 gap-10">
        //                 {danhSachDanhGia.length > 1 &&
        //                   danhSachDanhGia.map((danhGia, index) => {
        //                     // console.log(danhGia);
        //                     return (
        //                       <CommentItem
        //                         key={index}
        //                         data={danhGia}
        //                         needTruncate={false}
        //                       ></CommentItem>
        //                     );
        //                   })}
        //               </div>

        //               <div className="mt-5 pt-5 border-t border-slate-300">
        //                 <button
        //                   type="button"
        //                   className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out"
        //                   onClick={toggleModal}
        //                 >
        //                   Đóng
        //                 </button>
        //               </div>
        //             </Dialog.Panel>
        //           </Transition.Child>
        //         </div>
        //       </div>
        //     </Dialog>
        //   </Transition>
        // </>
    );
}
