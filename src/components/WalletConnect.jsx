import { ConnectButton } from '@rainbow-me/rainbowkit';
import Button from './Button';
import { MdOutlineWallet } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

const WalletConnect = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    const formatAddress = (addr) => {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

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

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button icon={<MdOutlineWallet />} handleClick={openConnectModal} text={"Connect Wallet"} borderRadius={"rounded-3xl border border-[#1F6619]"} bgColor={"bg-(--neon-green)"} textColor={"text-(--text-neon-button)"} />
                                );
                            }

                            return (
                                <div className="relative">
                                    <div>
                                        <Button handleClick={() => setOpenMenu(!openMenu)} icon={<MdOutlineWallet />} text={"Connected"} borderRadius={"rounded-3xl border border-[#1F6619]"} bgColor={"bg-(--neon-green)"} textColor={"text-(--text-neon-button)"} />
                                    </div>
                                    {openMenu && (
                                        <div className='absolute animate-fadeIn -bottom-28 right-0 bg-(--bg-secondary) rounded-lg border border-(--bg-primary) shadow text-sm text-(--text-secondary) font-medium z-50 min-w-[144px] flex flex-col gap-4 py-4 px-8 '>
                                            <p className='font-semibold text-sm'>{formatAddress(account.address)}</p>
                                            <Button icon={<MdOutlineWallet />} handleClick={openAccountModal} text={"Disconnect"} borderRadius={"rounded-3xl border border-red-800"} bgColor={"bg-red-500"} textColor={"text-white"} />
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default WalletConnect;