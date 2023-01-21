import { DASHBOARD } from 'lib/routes'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(DASHBOARD)
  })
}
