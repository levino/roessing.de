interface Props {
  eventName: string
  dateStr: string
  timeStr?: string | undefined
  locationName?: string | undefined
  organizerName?: string | undefined
}

export function EventOgImage({
  eventName,
  dateStr,
  timeStr,
  locationName,
  organizerName,
}: Props) {
  const titleFontSize =
    eventName.length > 60 ? 52 : eventName.length > 35 ? 64 : 76

  const detailParts = [locationName, organizerName]
    .filter(Boolean)
    .join('  ·  ')

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 56px',
        background:
          'linear-gradient(160deg, #ffffff 0%, #f0f7f4 50%, #e8f4ec 100%)',
        fontFamily: 'Inter',
        color: '#1a2e1a',
      }}
    >
      {/* Farbiger Akzentbalken oben */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          background:
            'linear-gradient(90deg, #4a9e6e 0%, #7bc47f 50%, #b8daa0 100%)',
        }}
      />

      {/* Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '10px',
            height: '38px',
            backgroundColor: '#4a9e6e',
            borderRadius: '5px',
          }}
        />
        <div
          style={{
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '3px',
            color: '#4a9e6e',
          }}
        >
          RÖSSING
        </div>
      </div>

      {/* Event-Name */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: titleFontSize,
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#1a2e1a',
          }}
        >
          {eventName}
        </div>
      </div>

      {/* Details: Datum, Ort, Veranstalter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: '#d0e8d4',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '36px',
            color: '#2d7a4a',
            fontWeight: 700,
          }}
        >
          {`${dateStr}${timeStr ? `  ·  ${timeStr} Uhr` : ''}`}
        </div>
        {detailParts && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '28px',
              color: '#5a8a6a',
            }}
          >
            {detailParts}
          </div>
        )}
      </div>
    </div>
  )
}
