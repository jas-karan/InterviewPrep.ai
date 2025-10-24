import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
import { int } from 'zod'

const page = () => {
  return (
   <>
    <section className="card-cta">
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Get Interview Ready with AI powered practice and feedback</h2>
        
        <p className='text-lg'>
          Practice on real interview questions, get instant feedback, and improve your skills with our AI-powered platform. Whether you're a beginner or an experienced professional, our tool is designed to help you succeed in your job interviews.
        </p>

        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href='/interviews'>Start an Interview</Link>
        </Button>
      </div>
      <Image src='/robot.png' alt='robo-dude' width={400} height={400} className='mx-sm:hidden'/>
    </section>

    <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interviews</h2>

      <div className="interviews-section">
        {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}
      </div>
    </section>

    <section className="flex flex-col gap-6 mt-8">
      <h2>Take an Interview</h2>

      <div className="interviews-section">
        {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}
      </div>
    </section>
   </>
  )
}

export default page