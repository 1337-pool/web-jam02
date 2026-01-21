"use client"

const MatrixRain = () => {
  const columns = 40

  return (
    <div className="matrix-container">
      {[...Array(5)].map((_, patternIndex) => (
        <div key={patternIndex} className="matrix-pattern">
          {[...Array(columns)].map((_, colIndex) => (
            <div key={colIndex} className="matrix-column" />
          ))}
        </div>
      ))}
    </div>
  )
}

export default MatrixRain
