import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const bgPattern = 'url("data:image/svg+xml,' +
  '%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E' +
  '%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E' +
  '%3Cg fill=\'%23334155\' fill-opacity=\'0.1\'%3E' +
  '%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);


    const rawTitle = searchParams.get('title') || 'Aguat Solutions';
    const title = rawTitle
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .slice(0, 100);

    const rawDesc = searchParams.get('description') || 'Custom Software Development';
    const description = rawDesc
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .slice(0, 120);

    const _lang = searchParams.get('lang') || 'en';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: bgPattern,
            }}
          />

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '80px',
              zIndex: 1,
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '12px',
                  marginRight: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    color: 'white',
                    fontSize: '32px',
                    fontWeight: 'bold',
                  }}
                >
                  AD
                </div>
              </div>
              Aguat Solutions
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '24px',
                maxWidth: '900px',
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '32px',
                color: '#94a3b8',
                lineHeight: 1.4,
                maxWidth: '800px',
              }}
            >
              {description}
            </div>

            {/* Bottom accent */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '80px',
                right: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
