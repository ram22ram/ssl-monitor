import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { Button, Container, Typography, Box, Paper, Grid, Chip } from '@mui/material';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, Sparkles, 
  Clock, Bell, CheckCircle 
} from 'lucide-react';
import { styled, keyframes } from '@mui/material/styles';

// --- Animations (Component ke BAHAAR define karein) ---

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 'theme' prop yahaan 'styled' function ke andar automatically mil jaayega
const HoverPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  height: '100%', // Taaki dono card barabar height ke rahein
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[12],
  },
}));

const StyledCtaButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 4),
  borderRadius: '12px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: theme.shadows[6],
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[10],
  }
}));

// --- HomePage Component ---

const HomePage = () => {
  
  const handleLogin = () => {
    netlifyIdentity.open('login');
  };

  const handleSignup = () => {
    netlifyIdentity.open('signup');
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(270deg, #4f46e5, #7c3aed, #ec4899, #f97316)',
        backgroundSize: '400% 400%',
        animation: 'gradientPan 15s ease infinite', // Yeh animation 'index.css' se aayega
        py: { xs: 4, md: 8 }, 
        overflow: 'hidden', 
      }}
    >
      <Container maxWidth="lg">
        
        {/* --- Hero Section --- */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 10,
          animation: `${fadeInUp} 0.5s ease-out` 
        }}>
          
          <Chip 
            icon={<Sparkles size={18} color="white" />}
            label="100% Free Forever • No Credit Card Required"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              fontWeight: 'medium',
              mb: 4,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              animation: `${fadeInUp} 0.5s ease-out 0.2s`, 
              animationFillMode: 'both',
            }}
          />

          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'white', 
              mb: 3, 
              textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
              animation: `${fadeInUp} 0.5s ease-out 0.4s`,
              animationFillMode: 'both',
            }}
          >
            Never Let Your Website
            <br />
            <Box 
              component="span" 
              sx={{ 
                background: 'linear-gradient(to right, #fde047, #f97316, #ef4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Expire Again
            </Box>
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.95)', 
              mb: 4, 
              maxWidth: '700px', 
              mx: 'auto',
              animation: `${fadeInUp} 0.5s ease-out 0.6s`,
              animationFillMode: 'both',
            }}
          >
            We monitor your SSL certificates and domain names 24/7, sending you timely alerts before expiration — completely free.
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'center', 
            gap: 2, 
            mb: 4,
            animation: `${fadeInUp} 0.5s ease-out 0.8s`,
            animationFillMode: 'both',
          }}>
            <StyledCtaButton 
              variant="contained" 
              size="large"
              onClick={handleSignup}
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f4f4f4' } }}
              endIcon={<ArrowRight />}
            >
              Get Started for Free
            </StyledCtaButton>
            <StyledCtaButton 
              variant="outlined" 
              size="large"
              onClick={handleLogin}
              sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              Log In
            </StyledCtaButton>
          </Box>
        </Box>

        {/* --- Features Section --- */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          
          <Grid item xs={12} md={6}>
            <HoverPaper>
              <Box sx={{ bgcolor: '#fee2e2', width: 64, height: 64, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <AlertTriangle color="#dc2626" size={32} />
              </Box>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                The Problem
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                When your SSL certificate expires, every visitor sees a "Not Secure" warning. This destroys trust, damages your brand reputation, and causes immediate customer loss.
              </Typography>
            </HoverPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <HoverPaper>
              <Box sx={{ bgcolor: '#dcfce7', width: 64, height: 64, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <ShieldCheck color="#16a34a" size={32} />
              </Box>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Our Solution
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                Our intelligent monitoring system checks your website daily. We send you timely email alerts 30 days before expiration, giving you plenty of time to renew.
              </Typography>
            </HoverPaper>
          </Grid>
        </Grid>

        {/* --- How It Works --- */}
        <Paper 
          elevation={8} 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: '24px', 
            bgcolor: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.3)', 
            mb: 8 
          }}
        >
          <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 5 }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {[
              { num: 1, title: 'Sign Up Free', desc: 'Create your account in seconds. No credit card needed.', color: '#e0e7ff' },
              { num: 2, title: 'Add Your Domains', desc: "Enter your website URLs and we'll start monitoring immediately.", color: '#f3e8ff' },
              { num: 3, title: 'Relax & Get Alerts', desc: "We'll email you 30 days before any expiration. That's it!", color: '#fce7f3' }
            ].map(item => (
              <Grid item xs={12} md={4} key={item.num} sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 64, height: 64, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mx: 'auto', mb: 2,
                  bgcolor: item.color,
                  color: 'primary.dark',
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{item.num}</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{item.title}</Typography>
                <Typography color="text.secondary">{item.desc}</Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* --- Final CTA --- */}
        <Box sx={{ textAlign: 'center' }}>
          <StyledCtaButton 
            variant="contained" 
            size="large"
            onClick={handleSignup}
            sx={{
              background: 'linear-gradient(to right, #16a34a, #15803d)',
              fontSize: '1.2rem',
              px: 6, py: 2,
              '&:hover': { 
                background: 'linear-gradient(to right, #15803d, #16a34a)',
              }
            }}
            endIcon={<ArrowRight />}
          >
            Start Monitoring for Free
          </StyledCtaButton>
        </Box>

      </Container>
    </Box>
  );
};

export default HomePage;