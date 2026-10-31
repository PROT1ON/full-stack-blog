import React, { useState } from 'react'
import Image from './Image'
import { MessageCircle, Heart } from 'lucide-react'
import { Link } from 'react-router-dom';
type CardTypes = {
  image: string;
  title: string;
  excerpt: string;
  publisher: string;
  date: Date;
  Publisheduration: Date;
  Liked: number;
  comments: number;
  category: string;
  description: string;
  slug: string
};





export const items: CardTypes[] = [
  {
    image: "/Blog%20/b1.jpg",
    title: "The Art of Creating Worlds That Feel Alive",
    slug: "art-of-creating-worlds",
    excerpt: "Why the most memorable fictional worlds feel like places we've actually lived in.",
    publisher: "Studio Ghibli Fan",
    date: new Date("2026-10-20"),
    Publisheduration: new Date("2026-10-20"),
    Liked: 342,
    comments: 45,
    category: "Anime & Manga",
    description: `
A beautiful fictional world is more than impressive landscapes and powerful characters. It's the little details that make it feel real.

## Beyond the main story

Think about a quiet street in an anime, the sound of a train passing, or the small shops that line a familiar neighborhood. These details make a fictional world feel like it exists even when the main characters aren't around.

> The best fictional worlds are the ones we wish we could visit.

## What makes a world believable?

- A consistent culture and history
- Everyday locations with personality
- Characters with ordinary routines
- Small environmental storytelling details

Sometimes, the best world-building happens in the background.
`
  },
  {
    image: "/Blog/b2.jpg",
    title: "Why Traditional Art Still Matters in a Digital World",
    slug: "traditional-art-in-digital-world",
    excerpt: "Exploring the unique beauty of traditional mediums in an increasingly digital creative industry.",
    publisher: "ArtisanVibes",
    date: new Date("2026-10-21"),
    Publisheduration: new Date("2026-10-21"),
    Liked: 189,
    comments: 12,
    category: "Art & Creativity",
    description: `
Digital art has transformed the creative industry. Artists can experiment endlessly, undo mistakes and explore techniques that were once difficult to achieve.

But traditional art still holds a special place.

## The beauty of imperfection

A watercolor bleeding beyond its intended boundary or a pencil sketch with visible construction lines can give artwork a personality that feels difficult to reproduce.

## Why artists should explore both

- Traditional art develops hand control.
- Digital art encourages experimentation.
- Both improve visual observation.
- Different mediums inspire different creative approaches.

The goal isn't to choose a side. It's to discover what each medium can teach you.
`
  },
  {
    image: "/Blog/b3.jpg",
    title: "The Quiet Struggle Behind Every Creative Journey",
    slug: "quiet-struggle-creative-journey",
    excerpt: "A reflection on creative blocks, self-doubt and finding the courage to keep making things.",
    publisher: "ScribbleNotes",
    date: new Date("2026-10-22"),
    Publisheduration: new Date("2026-10-22"),
    Liked: 512,
    comments: 88,
    category: "Personal Stories",
    description: `
Creating something from nothing sounds exciting until you actually sit down and begin.

You open your software, stare at an empty canvas and suddenly every idea feels ordinary.

## When inspiration disappears

Creative blocks are not always signs that you've lost your ability. Sometimes, you're simply tired of expecting every attempt to be extraordinary.

## Getting back into the rhythm

- Create something without planning to publish it.
- Study artists whose work inspires you.
- Break large projects into smaller tasks.
- Allow yourself to make imperfect work.

You don't need to create something amazing every day. You just need to keep creating.
`
  },
  {
    image: "/Blog/b4.jpg",
    title: "Building Immersive Worlds in Video Games",
    slug: "building-immersive-game-worlds",
    excerpt: "How lighting, architecture and environmental storytelling transform game levels.",
    publisher: "PixelPulse",
    date: new Date("2026-10-23"),
    Publisheduration: new Date("2026-10-23"),
    Liked: 1204,
    comments: 230,
    category: "Gaming",
    description: `
Have you ever entered an abandoned building in a game and immediately wondered what happened there?

A broken chair, scattered papers and an open window can communicate more than an entire paragraph of dialogue.

## Environmental storytelling

Game environments can reveal history through architecture, objects, lighting and atmosphere.

A deserted village might tell the story of a forgotten community without a single character explaining its past.

## Elements that make environments memorable

- Lighting that establishes atmosphere
- Architecture that reflects local culture
- Objects that suggest previous events
- Sound design that creates emotional depth

A great environment gives players reasons to explore beyond the main objective.
`
  },
  {
    image: "/Blog/b5.jpg",
    title: "Finding Comfort in the Little Things",
    slug: "finding-comfort-in-little-things",
    excerpt: "Discovering the beauty of everyday routines and learning to appreciate life's quieter moments.",
    publisher: "ZenChronicles",
    date: new Date("2026-10-24"),
    Publisheduration: new Date("2026-10-24"),
    Liked: 89,
    comments: 7,
    category: "Culture & Lifestyle",
    description: `
A warm drink on a rainy afternoon. Your favorite song playing unexpectedly. The familiar sound of someone coming home.

These moments rarely make headlines, but they can make an ordinary day memorable.

## Learning to slow down

Modern life encourages us to constantly move towards the next achievement. Sometimes, we forget to appreciate what is already happening.

## Small things worth appreciating

- A peaceful morning without rushing
- Conversations with old friends
- Watching the sunset after a long day
- Having time for something you genuinely enjoy

Not every day needs to be productive to be meaningful.
`
  }
];


const Card = ({ item }: { item: CardTypes }) => { 
    //solution for reaaact Faallback ?
    const handleCardClick = () => {
        <Link to={  `/blogs/${item.slug}  ` } >

            </Link>
        console.log('CLijkced')
    }
  return (
    <Link to={  `/blogs/${item.slug}  ` } >

     <div
     
     className='rounded-2xl flex flex-col relative '
     >
                <div className='absolute top-3 left-3 rounded-full bg-white/55 text-purple-500 px-4 py-2' >
                    {item.category}
                    </div>
        <Image
        
        src= 
        {item.image } className='w-full h-60 object-cover rounded-t-2xl ' />
        <div className='bg-white flex flex-col gap-2 px-6 py- rounded-2xl '>
            <h2 className='font-mono font-semibold text-xl tracking-tighter'>
                {item.title}
            </h2>
            <p className=''>
                {item.excerpt}
            </p>
            <div className='flex flex-row items-center gap-2 text-xs  py-6'>
                <div className='p-1.5 rounded-full border-violet-600 border'>
                    {item.publisher.split(' ').map(w => w[0]).join('').toUpperCase()}
                </div>
          
                <h2 className="font-bold">
                    {item.publisher}
                </h2>
                <span>
                    {item.date.toLocaleDateString()}
                </span>
                <Heart className='text-red-400' />
                {
                    item.Liked
                }

                <MessageCircle className='text-lime-400' />
                {
                    item.comments
                }
            
            </div>
        </div>


</div>
                </Link>
 
  )
}


export default Card