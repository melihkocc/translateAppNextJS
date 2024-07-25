import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='absolute w-screen flex flex-col justify-center items-center mb-2' style={{bottom : "0px"}}>
      <Link className='underline text-blue-500' href='https://my-portfolio-eta-ashy.vercel.app/'>Portfolyo Sitesi</Link>
      <div className='mt-1'>© 2024 Melih Koç. Tüm hakları saklıdır.</div>
    </footer>
  )
}

export default Footer
