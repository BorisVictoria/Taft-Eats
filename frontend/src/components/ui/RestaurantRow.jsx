import React from 'react'
import { TableCell, TableRow } from '@/components/ui/shadcn/table'
import { Link } from 'react-router-dom'
import StarIcon from '@/components/ui/icons/staricon'
import { Button } from '@/components/ui/shadcn/button'

const RestaurantRow = ({ restaurant }) => {
    return (
        <TableRow className='transition duration-150'>
            <TableCell>
                <Link to='#' className='font-medium hover:text-blue-800 transition duration-200' prefetch={false}>
                    {restaurant.name}
                </Link>
            </TableCell>
            <TableCell>{restaurant.cuisine}</TableCell>
            <TableCell>
                <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, index) => (
                        <StarIcon
                            key={index}
                            className={`w-4 h-4 ${index < Math.floor(restaurant.rating) ? 'fill-primary stroke-none' : 'fill-[#a1a1a1] stroke-none'}`}
                        />
                    ))}
                    <span className={`text-sm opacity-30`}>({restaurant.rating})</span>
                </div>
            </TableCell>
            <TableCell>${restaurant.avgPrice.toFixed(2)}</TableCell>
            <TableCell>
                <Button variant='outline' size='sm'>
                    View Review
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default RestaurantRow
