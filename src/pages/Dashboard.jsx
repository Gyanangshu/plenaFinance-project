import { lazy, Suspense, useMemo, useState } from 'react'
import icon from "../icon.svg"
import Button from '../components/Button';
import { FaStar, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuRefreshCw, LuMenu } from "react-icons/lu";
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../actions/watchlistActions';
import { ImSpinner2 } from 'react-icons/im';

const Table = lazy(() => import("../components/Table"))
const DoughnutChart = lazy(() => import("../components/DoughnutChart"))
const WalletConnect = lazy(() => import("../components/WalletConnect"))

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.portfolio.watchlist);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const portfolioTotal = watchlist.reduce((sum, coin) => sum + (coin.value || 0), 0);

    const lastUpdated = useSelector((state) => state.portfolio.lastUpdated);

    const handleManualRefresh = () => {
        setIsRefreshing(true)

        if (watchlist.length > 0) {
            dispatch(actions.updateWatchlistData());
        }

        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    const values = watchlist?.map((coin) => coin.value);

    const generateColors = (numColors) => {
        return Array.from({ length: numColors }, () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return `rgba(${r}, ${g}, ${b}, 0.6)`;
        });
    };

    const colors = useMemo(() => generateColors(values?.length || 0), [values?.length]);

    const showDoughnut = watchlist?.map((item) => item.holdings)

    return (
        <div className='md:p-(--large-page-padding) p-(--small-page-padding)'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img loading='lazy' src={icon} alt="icon" />
                    <h1 className='text-xl font-semibold text-nowrap'>Token Portfolio</h1>
                </div>

                <Suspense fallback={<ImSpinner2 className="w-8 h-8 animate-spin text-(--neon-green)" />}>
                    <div className='largeNav'>
                        <WalletConnect />
                    </div>
                    <div className='hamburger relative'>
                        {mobileMenu ?
                            <button type='button' onClick={() => setMobileMenu(!mobileMenu)}><IoMdClose className='text-2xl' /></button>
                            :
                            <button type='button' onClick={() => setMobileMenu(!mobileMenu)}><LuMenu className='text-2xl' /></button>
                        }

                        {mobileMenu && (
                            <div className='absolute top-10 right-0 animate-fadeIn'>
                                <span><WalletConnect /></span>
                            </div>
                        )}
                    </div>
                </Suspense>
            </div>

            <main className='py-7 flex flex-col gap-12'>
                {/* hero banner */}
                <div className='bg-(--bg-secondary) rounded-xl p-6 flex gap-12 md:flex-row flex-col md:gap-0'>
                    <div className='flex flex-col justify-between gap-5 h-auto  w-full'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-(--text-secondary) font-medium'>Portfolio Total</p>
                            <p className='portfoliotext text-[56px] text-wrap font-medium'>${portfolioTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className='text-(--text-secondary) text-xs '>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '-'}</div>
                    </div>

                    <div className='h-full w-full'>
                        <div>
                            <p className='text-(--text-secondary) font-medium'>Portfolio Total</p>
                        </div>
                        <div className='mt-4 w-full flex gap-5 xl:flex-row flex-col items-center xl:items-start h-full'>
                            <Suspense fallback={<div className='w-full h-full my-8 flex items-center justify-center'><ImSpinner2 className="w-8 h-8 animate-spin text-(--neon-green)" /></div>}>
                                {showDoughnut.some((item) => item > 0) ?
                                    <>
                                        <DoughnutChart portfolioData={watchlist} colors={colors} />
                                        <div className='flex flex-col justify-between gap-2 h-auto w-full'>
                                            {watchlist.map((coin, i, arr) => {
                                                const total = arr.reduce((acc, c) => acc + c.value, 0);
                                                const percentage = ((coin.value / total) * 100).toFixed(2);
                                                return (
                                                    <div key={i} className='flex justify-between flex-1 w-full gap-5 mt-2' style={{ color: colors[i].replace("0.6", "1") }}>
                                                        <p className='font-medium'>{coin.name} ({(coin.symbol).toUpperCase()})</p>
                                                        <p className='text-(--text-secondary) font-medium'>{percentage}%</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                    :
                                    <div className='w-full flex flex-col gap-1 mt-2'>
                                        <h3 className='text-(--text-secondary)'>No Data Available</h3>
                                        <p className='text-(--text-secondary) text-sm'>Start by updating your holdings for a token</p>
                                    </div>
                                }
                                {/* <DoughnutChart portfolioData={watchlist} colors={colors} /> */}


                            </Suspense>
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
                                <Button handleClick={handleManualRefresh} 
                                icon={<LuRefreshCw className={`text-(--text-secondary) text-sm ${isRefreshing ? 'animate-spin' : ''}`} />} text={"Refresh Prices"} borderRadius={'rounded-lg border border-[#0000001F]'} bgColor={"bg-(--bg-secondary)"}
                                />
                            </div>
                            <button onClick={handleManualRefresh} className='md:hidden bg-(--bg-secondary) rounded-lg border border-[#0000001F] p-3'>
                                <LuRefreshCw className={`text-(--text-secondary) text-sm ${isRefreshing ? 'animate-spin' : ''}`} />
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

                    <Suspense fallback={<div className='w-full h-full my-8 flex items-center justify-center'><ImSpinner2 className="w-8 h-8 animate-spin text-(--neon-green)" /></div>}>
                        <Table />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
