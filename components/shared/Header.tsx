import { transformationTypes } from '@/constants'
import React from 'react'

type Props = {
  title: string
  description: string   
}

const Header = ({title, description}: Props) => {

  return (
    <>
    <h2 className='h2-bold text-slate-800'>{title}</h2>
    <p className='text-slate-600'>{description}</p>
    </>
  )
}

export default Header