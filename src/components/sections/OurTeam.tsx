'use client';

import { Box, Typography } from '@mui/material';

import { textWithGradient } from '@/lib';

import type { OurTeamContent } from '../../lib/data';
import ChromaGrid from '../common/ChromaGrid';
import type { ChromaItem } from '../common/ChromaGrid';
import Section from '../common/Section';

interface OurTeamProps {
  content: OurTeamContent;
}

const OurTeam: React.FC<OurTeamProps> = ({ content }) => {

  // Convert team members to ChromaItem format
  const teamMembers: ChromaItem[] = content.teamMembers.map(member => ({
    image: member.image,
    title: member.title,
    subtitle: member.subtitle,
    handle: member.handle,
    borderColor: member.borderColor,
    gradient: member.gradient,
    url: member.url,
  }));

  return (
    <Section
      id="our-team"
      animation="fadeInUp"
      animationDelay={0.2}
      sx={{
        backgroundColor: '#050505',
        color: '#fff',
        px: { xs: 1, sm: 2, md: 3, lg: 0 },
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 4, sm: 5, md: 6 },
          px: { xs: 1, sm: 2 },
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem', lg: '3rem' },
            fontWeight: 'bold',
            mb: { xs: 1.5, sm: 2 },
            lineHeight: { xs: 1.2, sm: 1.3 },
          }}
        >
          {textWithGradient(content.title)}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: 'var(--muted-foreground)',
            maxWidth: { xs: '100%', sm: '500px', md: '600px' },
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            px: { xs: 1, sm: 0 },
          }}
        >
          {content.subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <ChromaGrid
          items={teamMembers}
          radius={300}
          columns={3}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </Box>
    </Section>
  );
};

export default OurTeam;
