'use client'
import dynamic from 'next/dynamic'

const Chessboard = dynamic(
    () => import('react-chessboard').then(mod => mod.Chessboard),
    { ssr: false }
)

export default Chessboard