import React from 'react'
import back5  from '../../assets/back5.jpg'

function Home() {
    return(
        <div className='home-container'>
            <div className='gradientBg rounded-xl rounded-br-[80px] md:p-0 px-4 py-9'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10'>
                <div>
                    <img src={back5} alt="Background"/>
                </div>
            </div>

            </div>
        </div>
    )
}

export default Home;