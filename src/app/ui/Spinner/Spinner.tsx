export const Spinner = () => {
  return (
    <div
      style={{
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '100%',
        zIndex: '100',
      }}
    >
      <span style={{ color: 'green', fontSize: '100px', fontWeight: 'bold' }}> ...Loading </span>
    </div>
  )
}
