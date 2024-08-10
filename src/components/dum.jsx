// import React from 'react'

// const dum = () => {
//   return (
//     <>
//     <nav className="flex justify-between px-8 items-center py-6 ">
//       <section className="flex items-center gap-4">
//         <AlignJustify className="md:hidden" onClick={() => setsidemenu(true)} />
//         <p className="text-xl "> Logo</p>
//       </section>

//       {/* mobile screen */}

//       <section
//         className={clsx(
//           "fixed top-0 right-0 h-full w-screen backdrop-blur-sm -translate-x-full transition-all ",
//           isSidemenuopen && "translate-x-0 duration-700 ease-in-out	"
//         )}
//       >
//         <div className="text-black bg-gray-500 flex flex-col absolute left-0 top-0 h-screen px-8 gap-8 z-50 w-[15rem]">
//           <ChevronRight
//             onClick={() => setsidemenu(false)}
//             size={32}
//             className="mt-6 text-lg  border-2 cursor-pointer "
//           />
//           <Link>collection</Link>
//           <Link>collection</Link>
//           <Link>collection</Link>
//           <Link>collection</Link>
//         </div>
//       </section>
//       {/* ------------ */}
//       <section className="flex items-center text-lg gap-4 ">
//         <p className="border-2 border-gray-300 px-2">Cart</p>
//         <p className="border-2 border-gray-300 px-2">Logout</p>
//       </section>
//     </nav>
//   </>


//   )
// }

// export default dum



// <div
//       className=" h-[10vh] fixed top-0 right-0 w-full z-10 "
//       style={{
//         boxShadow:
//           "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
//         backgroundColor: "rgba(255, 255, 255, 0.7)", // White with 70% opacity
//         backdropFilter: "blur(10px)", // 10px blur effect
//         WebkitBackdropFilter: "blur(10px)", // Safari support
//         // padding: "20px",
//       }}
//     >
//       <section className="flex justify-between h-full items-center  border-2">
//         {/* mobile code */}
//           <p className="cursor-pointer">
//             <ChevronRight />
//           </p>

       
//         <p style={poppins} className="text-xl cursor-pointer">
//           {" "}
//           <Link to={"/"}>Foodie.com</Link>
//         </p>
//         <div className=" w-[500px] h-[40px]">
//           <input
//             type="text"
//             placeholder="Search resturant"
//             className="hidden md:block  border-2 border-gray-200 w-full h-full pl-4 rounded-full text-xl"
//             style={{
//               fontFamily: "Poppins, sans-serif",
//               fontWeight: 400,
//               fontStyle: "normal",
//             }}
//           />
//         </div>
//         <div className="flex gap-2 text-base">
//           <span
//             style={filterstyling}
//             className=" px-2 flex justify-center items-center"
//           >
//             Login
//           </span>
//           <span
//             className="px-2 flex justify-center items-center"
//             style={filterstyling}
//           >
//             Signup
//           </span>
//         </div>
//       </section>
//     </div>
