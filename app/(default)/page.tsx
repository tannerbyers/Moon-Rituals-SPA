import 'server-only'

import fsPromises from 'fs/promises';
import path from 'path'

export const metadata = {
  title: 'Moon Rituals',
  description: 'Learn moon rituals that change as the moon does.',
}

import Hero from '@/components/hero'
import Features from '@/components/features'

const getMoonPhase = (async () => {
  const res = await fetch('https://peb00t1115.execute-api.us-east-1.amazonaws.com/prod/')
  return res.json()
})

const getMoonPhaseData = (async (currentMoonPhase: string) => {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), 'content/moonPhases.json');
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  const objectData = JSON.parse(jsonData.toString());

  // todo
  // we'll filter it here but it really I should just get it by the object key and not store as array. 
  const filteredMoonPhase = objectData.moonPhases.filter((moonPhase: { name: string }) => moonPhase.name == currentMoonPhase)
  return filteredMoonPhase[0]
})
export default async function Home() {
  const currentMoonPhase = await getMoonPhase()
  const moonRitualData = await getMoonPhaseData(currentMoonPhase)

  return (
    <>
      <>
        <Hero moonPhase={moonRitualData} />
        <Features moonPhase={moonRitualData} />
      </>

    </>
  )
}
