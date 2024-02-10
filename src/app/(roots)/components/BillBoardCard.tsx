import React from 'react'
import { BillBoard } from '../../../../types'
interface BillBoardProps{
    billBoard:BillBoard
}

const BillBoardCard:React.FC<BillBoardProps> = ({billBoard}) => {
    // console.log(billBoard)
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div style={{ backgroundImage: `url(${billBoard?.BillboardImage})` }} className="rounded-xl relative lg:aspect-[2.6/0.6] aspect-[2.4/0.9] md:aspect-[2.4/0.8]  overflow-hidden bg-cover">
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-xl z-100 md:text-2xl lg:text-4xl sm:max-w-xl max-w-xs">
            {billBoard?.BillboardTag}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillBoardCard
