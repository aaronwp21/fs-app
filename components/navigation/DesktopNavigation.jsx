import React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  IconButton,
  MenuIcon,
  Toolbar,
  Typography,
  Button,
} from '@/components/mui';
import { useTheme } from '@mui/material/styles';
import { useUser } from '@auth0/nextjs-auth0/client';
import ShoppingCartDisplay from '../BasketDisplay';

function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log('no handleDrawerToggle function provided'),
}) {
  const theme = useTheme();
  const { user } = useUser();
  const lightTextColor = theme.palette.common.white;
  return (
    <>
      <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            href={`/`}
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              textDecoration: 'none',
              color: lightTextColor,
            }}
          >
            Food Site
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user && <ShoppingCartDisplay user={user} />}
            <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/blog"
            >
              Blog
            </Button>
            <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/contact"
            >
              Contact
            </Button>
            {user ? (
              <>
                <Button
                  href="/profile"
                  component={Link}
                  sx={{ color: lightTextColor }}
                >
                  Profile
                </Button>
                <Button
                  sx={{ color: lightTextColor }}
                  component={Link}
                  href="/api/auth/logout"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button
                sx={{ color: lightTextColor }}
                component={Link}
                href="/api/auth/login"
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default DesktopNavigation;
