import { ImageResponse } from 'next/og';
import { getInfluencerByCode, getInfluencerByAccessKey } from '@/lib/influencers/service';

export const alt = 'Espace Partenaire Al Muxtaar Doc — Bac S2 Sénégal';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface Props {
  params: {
    code: string;
  };
}

export default async function Image({ params }: Props) {
  const p = await Promise.resolve(params);
  const rawCode = p?.code ? decodeURIComponent(p.code).trim() : '';

  const influencer = rawCode
    ? (await getInfluencerByCode(rawCode)) || (await getInfluencerByAccessKey(rawCode))
    : null;

  const partnerName = influencer?.full_name || 'Partenaire Officiel';
  const promoCode = influencer?.promo_code || rawCode.toUpperCase() || 'MAJOR_S2';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #071424 0%, #0D2644 50%, #05101D 100%)',
          padding: '50px 65px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow ambient background effects */}
        <div
          style={{
            position: 'absolute',
            top: '-70px',
            right: '-70px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'rgba(0, 210, 180, 0.22)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-70px',
            left: '-70px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'rgba(247, 183, 49, 0.20)',
            filter: 'blur(80px)',
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #00D2B4 0%, #009E91 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 210, 180, 0.35)',
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 22h20L12 2zm0 6l5.5 11h-11L12 8z"
                  fill="#071424"
                />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.5px',
                }}
              >
                Al Muxtaar Doc
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#00D2B4',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Plateforme Officielle Bac S2 Sénégal
              </span>
            </div>
          </div>

          {/* Verification Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'rgba(0, 210, 180, 0.15)',
              border: '1px solid rgba(0, 210, 180, 0.35)',
              color: '#00D2B4',
              fontSize: '14px',
              fontWeight: 800,
            }}
          >
            <span>✓ Ambassadeur Certifié</span>
          </div>
        </div>

        {/* Center Section: Partner & Code Highlight */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
          }}
        >
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <span
              style={{
                fontSize: '14px',
                color: '#F7B731',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Offre Spéciale Recommandée Par
            </span>

            <h1
              style={{
                fontSize: '46px',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: '-1px',
              }}
            >
              {partnerName}
            </h1>

            <p
              style={{
                fontSize: '19px',
                color: 'rgba(244, 248, 251, 0.85)',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              Accédez à tous les chapitres de Maths et Physique-Chimie Terminale S2, fiches réflexes, quiz et annales corrigées !
            </p>
          </div>

          {/* Right: Big Promo Voucher Ticket */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px 36px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(247, 183, 49, 0.15) 0%, rgba(247, 183, 49, 0.05) 100%)',
              border: '2px dashed rgba(247, 183, 49, 0.7)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
              minWidth: '340px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: '#F7B731',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '6px',
              }}
            >
              Code Promo Officiel
            </span>

            <span
              style={{
                fontSize: '44px',
                fontWeight: 900,
                color: '#FFFFFF',
                fontFamily: 'monospace',
                letterSpacing: '3px',
              }}
            >
              {promoCode}
            </span>

            <span
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 700,
                marginTop: '8px',
              }}
            >
              Dès 700 F (mois) • 2 000 F (trimestre)
            </span>
          </div>
        </div>

        {/* Bottom Bar: Trust & Wave Payment */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 26px',
            borderRadius: '18px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ color: '#00D2B4', fontSize: '15px', fontWeight: 800 }}>
              🇸🇳 Programme Bac S2 Sénégal
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>•</span>
            <span style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700 }}>
              Paiement Wave Direct
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>•</span>
            <span style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700 }}>
              Activation Immédiate
            </span>
          </div>

          <div
            style={{
              color: '#00D2B4',
              fontSize: '16px',
              fontWeight: 900,
              letterSpacing: '0.5px',
            }}
          >
            al-muxtaar.sn
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

