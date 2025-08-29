import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from "../actions/watchlistActions";
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const Modal = ({ closeModal, isModalOpen }) => {
    const dispatch = useDispatch();
    const { coins, loading, error, selectedCoins } = useSelector(state => state.coins);
    const watchlist = useSelector(state => state.portfolio.watchlist);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (isModalOpen && coins.length === 0) {
            dispatch(actions.fetchCoins());
        }
    }, [isModalOpen, coins.length, dispatch]);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToWatchlist = () => {
        const newCoins = selectedCoins.filter(
            coin => !watchlist.some(w => w.id === coin.id)
        );
        if (newCoins.length > 0) {
            dispatch(actions.addToWatchlist(newCoins));
            closeModal();
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div
                className="fixed inset-0 bg-(--bg-secondary) opacity-75 z-40"
                onClick={closeModal}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div
                    className="bg-(--bg-primary) border border-(--border) rounded-xl shadow-lg w-[640px] h-[480px] transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn pointer-events-auto flex flex-col"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal
                >
                    {/*Search Input */}
                    <div className="flex-shrink-0">
                        <input
                            type="text"
                            placeholder="Search tokens (e.g., ETH, SOL)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border-b border-(--border) placeholder:text-sm outline-none bg-transparent"
                        />
                    </div>

                    {/* Trending List */}
                    <div className="flex-1 px-4 py-3 overflow-hidden flex flex-col">
                        <p className="text-(--text-secondary) text-sm mb-3 flex-shrink-0">Trending</p>
                        <div className="flex-1 overflow-y-auto">
                            {loading && (
                                <div className="flex justify-center items-center h-40">
                                    <ImSpinner2 className="w-8 h-8 animate-spin text-(--neon-green)" />
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center justify-center h-40 text-red-500">
                                    <MdErrorOutline className="w-5 h-5 mr-2" />
                                    {error}
                                </div>
                            )}

                            {!loading && !error && filteredCoins.map((coin) => {
                                const isSelected = selectedCoins.some(c => c.id === coin.id);
                                const isInWatchlist = watchlist.some(w => w.id === coin.id);

                                return (
                                    <div
                                        key={coin.id}
                                        className={`flex items-center p-3  ${isSelected ? 'bg-[#A9E8510F] backdrop-blur-2xl hover:bg-none' : 'hover:bg-(--bg-secondary)'} cursor-pointer rounded-lg mb-2 ${isInWatchlist ? 'opacity-50' : ''
                                            }`}
                                        onClick={() => !isInWatchlist && dispatch(actions.toggleCoinSelection(coin))}
                                    >

                                        <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3" />
                                        <div className="flex items-center gap-2 flex-1">
                                            <div className="font-medium">{coin.name}</div>
                                            <div className="text-sm text-gray-500 uppercase">({coin.symbol})</div>
                                        </div>
                                        {isInWatchlist && (
                                            <span className="mr-3 text-xs border border-(--border) px-2 py-1 rounded">In Watchlist</span>
                                        )}
                                        <div className="text-right flex items-center gap-3">
                                            {isSelected && <FaStar className="text-(--neon-green) h-[15px] w-15px]" />}
                                            <input
                                                type="radio"
                                                checked={isSelected}
                                                onChange={() => { }}
                                                disabled={isInWatchlist}
                                                className="mr-3 h-[15px] w-[15px] appearance-none rounded-full border-2 border-gray-400 checked:border-none checked:bg-(--neon-green) relative"
                                            />
                                        </div>
                                        
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer - Button Area */}
                    <div className="flex-shrink-0 bg-(--bg-secondary) rounded-b-xl px-4 py-3 flex justify-end border-t border-(--border)">
                        <Button
                            text={"Add to Wishlist"}
                            borderRadius={'rounded-lg border'}
                            textColor={''}
                            disable={selectedCoins.length === 0 ? true : false}
                            bgColor={selectedCoins.length === 0
                                ? 'text-(--border) cursor-not-allowed border-(--border)'
                                : 'bg-(--neon-green) text-(--text-neon-button) border-[#1F6619]'}
                            handleClick={handleAddToWatchlist}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Modal
