import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../actions/watchlistActions';
import Sparkline from './Sparkline';
import Button from './Button';
import edit from "../images/edit-pencil.svg"
import { LuTrash2 } from "react-icons/lu";

const Table = () => {
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.portfolio.watchlist);
    const [editingHoldings, setEditingHoldings] = useState({});
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const interval = setInterval(() => {
            if (watchlist.length > 0) {
                dispatch(actions.updateWatchlistData());
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [watchlist.length, dispatch]);

    const handleHoldingsChange = (coinId, value) => {
        setEditingHoldings({ ...editingHoldings, [coinId]: value });
    };

    const handleHoldingsUpdate = (coinId) => {
        const holdings = parseFloat(editingHoldings[coinId] || 0);
        if (!isNaN(holdings) && holdings >= 0) {
            dispatch(actions.updateHoldings(coinId, holdings));
            setEditingHoldings({ ...editingHoldings, [coinId]: undefined });
        }
    };

    const handleMenu = (id) => {
        setOpenMenu(prev => (prev === id ? null : id))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const totalItems = watchlist.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentData = watchlist.slice(startIndex, endIndex);

    console.log("Open Menu: ", openMenu)
    console.log("Watchlist table data: ", watchlist)

    return (
        <div className='overflow-x-auto overflow-y-auto border border-(--border) mt-4 rounded-xl'>
            <table className='min-w-[1200px] w-full border-collapse'>
                <thead className='w-full text-(--text-secondary) bg-(--bg-secondary) text-sm'>
                    <tr>
                        <th className='py-4 px-8 text-nowrap font-normal text-left'>Token</th>
                        <th className='py-4 px-8 text-nowrap font-normal text-left'>Price</th>
                        <th className='py-4 px-8 text-nowrap font-normal text-left'>24h %</th>
                        <th className='py-4 px-8 text-nowrap font-normal text-left'>Sparkline (7d)</th>
                        <th className='py-4 px-8 text-nowrap font-normal text-left'>Holdings</th>
                        <th className='py-4 px-8 text-nowrap font-normal text-left'>Value</th>
                        <th className='py-4 px-8 text-nowrap font-normal text-left'></th>
                    </tr>
                </thead>

                {totalItems === 0 ? (
                    <tbody>
                        <tr>
                            <td className='px-8 py-4 text-(--text-secondary)' colSpan={7}>No Tokens Added </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        {currentData.map((coin) => (
                            <tr key={coin.id} className='hover:bg-(--bg-secondary)'>
                                <td className='px-8 py-4 max-w-[206px]'>
                                    <div className="flex items-center">
                                        <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3" />
                                        <div className='flex items-center gap-2'>
                                            <div className="font-medium">{coin.name}</div>
                                            <div className="text-sm text-gray-500 uppercase">({coin.symbol})</div>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-8 py-4 text-(--text-secondary) max-w-[206px]'>
                                    ${coin.current_price?.toLocaleString()}
                                </td>
                                <td className='px-8 py-4 text-(--text-secondary) max-w-[206px]'>
                                    <div className={`inline-flex items-center `}>
                                        {coin.price_change_percentage_24h >= 0 ? (
                                            <span>+</span>
                                        ) : (
                                            <span>-</span>
                                        )}
                                        {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                                    </div>
                                </td>
                                <td className='px-8 py-4 max-w-[206px]'>
                                    <div className="flex justify-left">
                                        <Sparkline
                                            data={coin.sparkline_in_7d?.price || []}
                                            isPositive={coin.price_change_percentage_24h >= 0}
                                        />
                                    </div>
                                </td>
                                <td className='px-8 py-4 max-w-[206px]'>
                                    {editingHoldings[coin.id] !== undefined ? (
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="number"
                                                placeholder='Select'
                                                value={editingHoldings[coin.id]}
                                                onChange={(e) => handleHoldingsChange(coin.id, e.target.value)}
                                                onBlur={() => handleHoldingsUpdate(coin.id)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleHoldingsUpdate(coin.id)}
                                                className="w-24 px-2 py-1 border rounded border-(--neon-green) focus:outline-none backdrop-blur-3xl placeholder:text-sm ring-2 ring-(--neon-shadow) ring-offset-transparent"
                                                step="0.01"
                                                min="0"
                                                autoFocus
                                            />
                                            <Button text={"Save"} borderRadius={'rounded-lg border border-[#1F6619]'} bgColor={"bg-(--neon-green)"} textColor={"text-(--text-neon-button)"} />
                                        </div>

                                    ) : (
                                        <p>{coin.holdings || 0}</p>
                                    )}
                                </td>
                                <td className='px-8 py-4 max-w-[206px]'>
                                    ${(coin.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className='px-8 py-4 max-w-[206px] relative'>
                                    <BsThreeDots onClick={() => handleMenu(coin.id)} className='flex justify-end items-end hover:cursor-pointer' />

                                    {openMenu === coin.id && (
                                        <div ref={menuRef} className='absolute right-15 top-11 bg-(--bg-secondary) rounded-lg border border-(--bg-primary) shadow text-sm text-(--text-secondary) font-medium z-50 min-w-[144px] flex flex-col'>
                                            <button
                                                onClick={() => setEditingHoldings({ ...editingHoldings, [coin.id]: coin.holdings || 0 }, setOpenMenu(null))}
                                                className="hover:cursor-pointer text-nowrap flex items-center justify-center gap-2 py-3 border-b border(--border)"
                                            >
                                                <img loading='lazy' src={edit} alt="edit" />Edit Holdings
                                            </button>
                                            <button
                                                onClick={() => dispatch(actions.removeFromWatchlist(coin.id))}
                                                className="flex items-center gap-2 py-3 pl-4 hover:cursor-pointer text-red-400"
                                            >
                                                <LuTrash2 /> Remove
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                )}

            </table>
            {totalItems > 0 ? (
                <div className='min-w-[1200px] flex justify-between w-full py-4 px-8 text-nowrap border-t border-(--border) font-medium text-sm text-(--text-secondary)'>
                    <p>{`${startIndex + 1} - ${endIndex} of ${totalItems} results`}</p>
                    <div className='flex items-center gap-4'>
                        <p>{`${currentPage} of ${totalPages} pages`}</p>
                        <div className='flex items-center gap-4'>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-2 py-1 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-(--bg-secondary)'}`}
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-2 py-1 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-(--bg-secondary)'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='min-w-[1200px] flex justify-between w-full py-4 px-8 text-nowrap border-t border-(--border) font-medium text-sm text-(--text-secondary)'>
                    <p>0 - 0 of 0 results</p>
                    <div className='flex items-center gap-4'>
                        <p>0 of 0 pages</p>
                        <div className='flex items-center gap-4'>
                            <button type="button" className='cursor-not-allowed'>Prev</button>
                            <button type="button" className='cursor-not-allowed'>Next</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Table
