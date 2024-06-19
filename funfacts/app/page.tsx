/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import axios from "axios";
import { useState } from 'react'
import { Copy } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface Fact {
  fact: string
}
export default function Home() {
  const [error, setError] = useState(false)
  const [data, setData] = useState<Fact[] | null>(null)
  const { toast } = useToast()

  const fetchData = async() => {
    await axios.get('https://api.api-ninjas.com/v1/facts', {
      headers: {
        'X-Api-Key': 'i1aGse/wqTzMwJ9gX9Nk7A==0MClIDpEGbE5Dd41'
      }
    })
    .then(response => {
      setData(response.data)
    })
    .catch(error => {
      setError(true)
    });
  }


  return (
    <main className="bg-background w-screen h-screen flex items-center justify-center flex-col dark">
         { !error ? (<><h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white mb-4">
      Fun Facts Generator.
    </h1>

    { !data && (<Card className="w-[400px] flex items-center flex-col">
  <CardHeader className="w-full">
    <CardTitle className="w-full text-center">Generate Fun Facts in one click.</CardTitle>
  </CardHeader>
  <CardContent className="h-full">
    <Button className="text-lg" onClick={fetchData}>Generate.</Button>
  </CardContent>
  <CardFooter>
    <Link href="https://github.com/travyyx" target="_blank" className="hover:text-blue-500 transition-colors duration-200 font-semibold text-lg text-secondary">Made with love by Ayomide.</Link>
  </CardFooter>
</Card>)}
{ data && (
  <Card className="w-[400px] flex items-center flex-col">
  <CardHeader className="w-full">
    <CardTitle className="w-full text-center">Fun Fact.</CardTitle>
  </CardHeader>
  <CardContent className="h-full w-full flex flex-col items-center justify-center">
  <p className="leading-7 [&:not(:first-child)]:mt-4 mb-4 text-center w-full">{data && data[0].fact}</p>
  <div className="w-full flex items-center justify-center gap-3">
    <Button className="text-lg" onClick={() => setData(null)}>Re-Generate.</Button>
    <Copy className="hover:text-green-500 transition-colors duration-200 cursor-pointer" onClick={() => {
      navigator.clipboard.writeText(data[0].fact)
      toast({
        description: "Fact Copied."
      })
    }}/>
  </div>
  </CardContent>
</Card>
)}
</>) : (
  <><h1>An error occured.</h1></>
)}

    </main>
  );
}
