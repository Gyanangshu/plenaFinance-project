import { ConnectButton } from '@rainbow-me/rainbowkit';
import Button from './Button';
import { MdOutlineWallet } from 'react-icons/md';

const WalletConnect = () => {

    const formatAddress = (addr) => {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

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
                                <div className="wallet-connected" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div>
                                        <div style={{ fontFamily: 'monospace', fontWeight: '600' }}>
                                            {formatAddress(account.address)}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#22c55e' }}>
                                            Connected
                                        </div>
                                    </div>
                                    <button
                                        onClick={openAccountModal}
                                        style={{ 
                                            padding: '4px 8px', 
                                            background: '#ef4444', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '4px', 
                                            cursor: 'pointer' 
                                        }}
                                    >
                                        Disconnect
                                    </button>
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