export function Waveform() {
  return (
    <span className="waveform" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => <i key={index} />)}
    </span>
  )
}

