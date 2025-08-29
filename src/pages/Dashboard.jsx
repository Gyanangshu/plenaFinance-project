import React, { useState } from 'react'
import icon from "../icon.svg"
import { MdOutlineWallet } from "react-icons/md";
import Button from '../components/Button';
import { FaStar, FaPlus } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import Table from '../components/Table';
import DoughnutChart from '../components/DoughnutChart';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const watchlist = useSelector(state => state.portfolio.watchlist);
    const portfolioTotal = watchlist.reduce((sum, coin) => sum + (coin.value || 0), 0);

    return (
        <div className='md:p-(--large-page-padding) p-(--small-page-padding)'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img loading='lazy' src={icon} alt="icon" />
                    <h1 className='text-xl font-semibold'>Token Portfolio</h1>
                </div>

                <Button icon={<MdOutlineWallet />} text={"Connect Wallet"} borderRadius={"rounded-3xl border border-[#1F6619]"} bgColor={"bg-(--neon-green)"} textColor={"text-(--text-neon-button)"} />
            </div>

            <main className='py-7 flex flex-col gap-12'>
                {/* hero banner */}
                <div className='bg-(--bg-secondary) rounded-xl p-6 flex gap-12 md:flex-row flex-col md:gap-0'>
                    <div className='flex flex-col justify-between gap-5 h-full w-full'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-(--text-secondary) font-medium'>Portfolio Total</p>
                            <p className='text-[56px] font-medium'>${portfolioTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className='text-(--text-secondary) text-xs '>Last updated: 3:42:12 PM</div>
                    </div>

                    <div className='h-full w-full'>
                        <div>
                            <p className='text-(--text-secondary) font-medium'>Portfolio Total</p>
                        </div>
                        <div className='mt-4 w-full flex gap-5 xl:flex-row flex-col items-center xl:items-start'>
                            <DoughnutChart />
                            <div className='flex justify-between w-full gap-5 mt-2'>
                                <p className='font-medium'>Bitcoin (BTC)</p>
                                <p className='text-(--text-secondary) font-medium'>21%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* watchlist table */}
                <div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <FaStar className="text-(--neon-green) text-xl" />
                            <p className='text-2xl font-medium'>Watchlist</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='hidden md:block'>
                                <Button icon={<LuRefreshCw className='text-(--text-secondary) text-sm' />} text={"Refresh Prices"} borderRadius={'rounded-lg border border-[#0000001F]'} bgColor={"bg-(--bg-secondary)"}
                                />
                            </div>
                            <button className='md:hidden bg-(--bg-secondary) rounded-lg border border-[#0000001F] p-3'>
                                <LuRefreshCw className='text-(--text-secondary) text-sm' />
                            </button>

                            <Button
                                icon={<FaPlus className='text-sm' />}
                                text={"Add Token"}
                                handleClick={openModal}
                                borderRadius={'rounded-lg border border-[#1F6619]'}
                                bgColor={"bg-(--neon-green)"}
                                textColor={"text-(--text-neon-button)"}
                            />
                        </div>
                    </div>
                    {isModalOpen && <Modal closeModal={closeModal} isModalOpen={isModalOpen} />}

                    <Table />
                </div>
            </main>
        </div>
    )
}

export default Dashboard
