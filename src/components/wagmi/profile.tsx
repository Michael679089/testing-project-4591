import { useConnect, useAccount } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useEnsName } from 'wagmi' // Keep this if you plan to use it later

export function Profile() {
    // 1. Get connection status and functions from useConnect
    const { connectors, connect, status, error } = useConnect()

    // 2. Get the connected account's address and status
    const { address, isConnected } = useAccount()

    // Find the injected connector (usually MetaMask)
    const metamaskConnector = connectors.find(
        (connector) => connector.id === 'injected' // 'injected' is the default ID for MetaMask/injected wallets
    )

    // Optional: Get ENS name for display if connected
    // const { data: ensName } = useEnsName({ address: address, query: { enabled: isConnected } })
    
    // --- Render Logic ---

    if (isConnected) {
        // Render view for a connected user
        return (
            <div>
                <h2>🥳 Wallet Connected!</h2>
                <p>Address: **{address}**</p>
                {/* <p>ENS Name: {ensName ?? 'N/A'}</p> */}
                {/* You would typically use a disconnect function here */}
            </div>
        )
    }

    // Render view for a disconnected user
    return (
        <div>
            <h2>Wallet Connection</h2>
            
            {/* 2. Check if the MetaMask connector was found and is ready.
                This button will trigger the connection process. 
            */}
            {metamaskConnector && (
                <button
                    onClick={() => connect({ connector: metamaskConnector })}
                    disabled={status === 'pending'}
                    className="bg-orange-500 hover:bg-orange-200"
                >
                    Connect Wallet (MetaMask)
                </button>
            )}

            {/* If no injected connector is found, you can add a fallback */}
            {!metamaskConnector && (
                <p>No injected wallet (like MetaMask) detected. Please install one.</p>
            )}

            {/* Display status messages */}
            {status === 'pending' && <p>Connecting...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

        </div>
    )
}