import React from 'react'
import ValuationContainer from '../components/ValuationContainer'

const ValuationView = ({ vehicleType }: { vehicleType: string }) => {
  return (
    <ValuationContainer vehicleType={vehicleType} />
  )
}

export default ValuationView
