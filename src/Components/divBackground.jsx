import React from 'react'

const DivBackground = ({ children }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative h-[80vh] w-[80vw] rounded-lg overflow-hidden shadow-2xl shadow-gray-700/60">
                {/* Background layer */}
                <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]" />

                {/* Foreground content */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DivBackground
