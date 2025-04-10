// app/api/get-form/route.ts
import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const form = await payload.findByID({
      collection: 'forms',
      id: '1',
    })

    return NextResponse.json(form)
  } catch (error) {
    console.error('Failed to fetch form', error)
    return NextResponse.json({ error: 'Failed to fetch form' }, { status: 500 })
  }
}
