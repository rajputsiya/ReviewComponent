import React, { useState } from 'react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import TypingEffect from './TypingEffect';
import {data} from "./data.js";

export default function App() {
  
  const [active , setActive ] = useState(0);
  const handleNext = () => {
    setActive(next => (next + 1) % data.length);
  }
  const handlePrev = () => {
    setActive(prev => (prev - 1 + data.length) % data.length);
  }
  const randomRotate = () => Math.floor(Math.random() * 21) - 10;
  return (
    <div className='flex justify-center items-center h-screen bg-neutral-900'>
      <div className='w-[70%] grid grid-cols-2 gap-12 text-4xl '>
        <div className='col-span-1 relative h-80 w-full'>
          <AnimatePresence>
          {
            data.map((el, ind) => (
              <motion.div
              key={ind}
              initial={{
                opacity : 0,
                scale : 0.9,
                rotate : randomRotate(),
                zIndex : -100,
                y : 0
              }}
              animate={{
                opacity : active == ind ? 1 : 0.7,
                scale : active == ind ? 1 : 0.9,
                rotate : active == ind ? 0 : randomRotate(),
                zIndex : active == ind ? 9999 : ind,
                y : active == ind ? [0, -80 , 0] : 0
              }}
              exit={{
                opacity : 0,
                rotate : randomRotate(),
                scale : 0.9,
                y : 0
              }}
              transition={{
                duration : 0.4,
                ease : "easeInOut"
              }}
              className='absolute inset-0 origin-bottom '
              >
                <img src={el.img} className='rounded-xl h-72' />
              </motion.div>
            ))
          }
          </AnimatePresence>
        </div>
        <div className='col-span-1 flex flex-col'>
          <motion.div
            key={active}
            initial={{
              opacity : 0,
              y : -10
            }}
            animate={{
              opacity : 1,
              y : 0
            }}
            transition={{
              delay : 0.4,
              ease : "easeInOut"
            }}
          >
            <h2 className='text-bolder text-gray-300'>
              {data[active].title}
            </h2>
            <div className=''>
              <TypingEffect text={data[active].description}/>
            </div>
            <div className='flex justify-center gap-16 w-full mt-10'>
              <IconArrowLeft onClick={handlePrev} color='white' className="bg-gray-400 h-8 hover:scale-110 duration-150 rotate-[20deg] w-8 p-1 rounded-full cursor-pointer" />
              <IconArrowRight onClick={handleNext} color='white' className="bg-gray-400 h-8 hover:scale-110 duration-150 rotate-[-20deg] w-8 p-1 rounded-full cursor-pointer" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
