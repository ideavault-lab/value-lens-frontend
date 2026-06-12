import React from 'react'
import ResultDashboard from '../components/ResultDashboard'

const ResultView = ({ draftId }: { draftId: string }) => {
  return (
    <ResultDashboard draftId={draftId} />
  )
}

export default ResultView